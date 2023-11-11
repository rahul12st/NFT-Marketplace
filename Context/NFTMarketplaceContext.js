import React, { useState, useEffect, useContext} from "react";
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import Router from "next/router";
import axios from "axios";
import {useRouter} from "next/router";
import {create as ipfsHttpClient} from "ipfs-http-client";
import { NFTMarketplaceAddress,NFTMarketplaceABI } from "./constants";


const projectId = "2XfGWfBKHPBW1uVGHs6SOWjYfI1";
const projectSecretKey = "1fd4d182bfbccc9b0decbfcda377184e";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64"
)}`;
const subdomain= "https://rahul-nft-marketplace.infura-ipfs.io/ipfs";
const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization:auth,
  },
});

//-fetch smartcontract
const fetchContract = (signerOrProvider)=>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );

    //connecting with smartcontract
 const connectingWithSmartContract = async()=>{
        try{
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider= new ethers.providers.Web3Provider(connection);
            const signer= provider.getSigner();
            const contract = fetchContract(signer);
            return contract;
        }
        catch(error){
            console.log("Something went wrong while connecting with contract");
        }
        };
       


export const NFTMarketplaceContext= React.createContext();

export const NFTMarketplaceProvider=({ children}) =>{
     
    const titleData="Discover, collect and sell NFTs";
//---USESTATE
    const[currentAccount, setCurrentAccount]= useState("");
    const router= useRouter();
    const [error,setError] = useState("");
    const[openError, setOpenError]=useState(false);
  //--CHECK IF WALLET IS CONNECTED
  const checkIfWalletConnected=async()=>{
  try{
          if(!window.ethereum) return setOpenError(true), setError("Install MetaMask");
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if(accounts.length){
            setCurrentAccount(accounts[0]);
          } else{
            setError("No Account Found");
            setOpenError(true);
          }
          console.log(currentAccount);
    } 
    catch(error){
        setError("Something wrong while connecting to wallet");
        setOpenError(true);
    }
};
 
const connectWallet=async()=>{
    try {
        if(!window.ethereum) return (setOpenError(true),setError("Install Metamask"));
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[0]);
       // window.location.reload();
       connectingWithSmartContract();
    } catch (error) {
        setError("Error while connecting to wallet");
        setOpenError(true);
    }
};

useEffect(()=>{
   checkIfWalletConnected();
  },[]
 );
 
//ipfs part
  const uploadToIPFS = async (file) => {
   try {
    const added = await client.add({ content:file });
    const url=`${subdomain}/${added.path}`;
    return url;
   } catch(error){
    setError("Error Uploading to IPFS,error");
    setOpenError(true);
   }
  };


const createNFT = async(name, price, image,description,router) => {
 
 if (!name|| !price || !image || !description)
      return console.log("Data is Missing");

  const data = JSON.stringify({ name, description, image});
    try{
      const added = await client.add(data);
      const url = `https://infura-ipfs.io/ipfs/${added.path}`;
      await createSale(url, price);
      router.push('/searchPage');
  } catch (error) {
      setError("Error", error);
      setOpenError(true);
  }
};


//--createSale Function
const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();
  
      const listingPrice = await contract.getListingPrice();
      const transaction= !isReselling ? await  contract.createToken(url, price,{
        value: listingPrice.toString(),
     })
     :await  contract.resellToken(url, price,{
        value: listingPrice.toString(),
     });

      await transaction.wait();
         console.log(transaction);
        
        } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      console.log(error);
    }
  };
  
  //--FETCHNFTS FUNCTION
  const fetchNFTs = async () => {
    try {
       const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/gOENwjG53S_odY-c51ru6Nmpv978SJ1l`);
      // const web3Modal = new 
      // Web3Modal();
      // const connection = await web3Modal.connect();
      // const provider= new ethers.providers.Web3Provider(connection);
       const contract = fetchContract(provider);
  
      const data = await contract.fetchMarketItems();
  
       
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
      
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
        } catch(error){
          console.error("An error occurred while fetching NFTs:", error);
            setError("Error while fetching NFTs");
            setOpenError(true);
        }
  };
   useEffect(()=>{
  // if(currentAccount)
  // {
   fetchNFTs();
    // }
  },[]);

  //--Fetching my nft or listed nft
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
     // if(currentAccount) {
      const contract = await connectingWithSmartContract();
  
      const data = 
        type === "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();
  
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const{
                data: {image, name, description},
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),"ether");

                return{
                    price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
                };
            }
        )
      );
      return items;
   //} 
  } catch(error){
        setError("Error while fetching listed NFTS");
        setOpenError(true);
    }
  };
  
  useEffect(()=>{
    //if(currentAccount) {
    fetchMyNFTsOrListedNFTs();
 // }
}, []);

  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };
  
  
    return(
        <NFTMarketplaceContext.Provider value={{checkIfWalletConnected,connectWallet,uploadToIPFS,createNFT,fetchNFTs,fetchMyNFTsOrListedNFTs,buyNFT,createSale,currentAccount,titleData,setOpenError,openError,error,}}>
            {children}
        </NFTMarketplaceContext.Provider>
        );
    };