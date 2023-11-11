import React, {useContext,useEffect,useState} from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { Slider, Brand,Loader } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";
import { NFTCardTwo, Banner } from "../collectionpage/collectionIndex";
import images from "../img";
//import smartcontract
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";


const searchPage = () => { 
  const {fetchNFTs ,setError,currentAccount}= useContext(NFTMarketplaceContext);
  const[nfts, setNfts]= useState([]);
  const[nftsCopy, setNftsCopy]= useState([]);
  useEffect(() => {
    const loadNFTs = async () => {
      try {
        if (currentAccount) {
          const items = await fetchNFTs();
          setNfts(items);
          setNftsCopy(items);
        }
      } catch (error) {
        setError("Please reload the browser");
        console.error(error); // For debugging purposes
      }
    };
  
    loadNFTs();
  }, [currentAccount]); // Added dependency to re-fetch if currentAccount changes
  

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];
  
  const onHandleSearch = (value) => {
    const filteredNFTs = nfts?.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredNFTs?.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTs);
    }
  
  };

  const onClearSearch= ()=>{
    if(nfts?.length && nftsCopy?.length){
      setNfts(nftsCopy);
    }
  }

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar onHandleSearch={onHandleSearch}
                onClearSearch={onClearSearch}/>
      <Filter />
      {nfts?.length==0 ? <Loader /> : <NFTCardTwo NFTData={nfts} />}
      <Slider />
      <Brand />
    </div>
  );
};

export default searchPage;
