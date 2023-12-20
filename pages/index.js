import React, { useEffect,useState,useContext } from "react";
const cors = require("cors");

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
app.use(
  cors({
    origin: "https://nftbazaar.vercel.app",
  })
);
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";

import { getTopCreators } from "../TopCreators/TopCreators";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const {checkIfWalletConnected,currentAccount} = useContext(NFTMarketplaceContext);
useEffect(()=>{
  checkIfWalletConnected();
},[]);

const {fetchNFTs}= useContext(NFTMarketplaceContext);
const[nfts, setNfts]= useState([]);
const[nftsCopy, setNftsCopy]= useState([]);

//creators list
const creators= getTopCreators(nfts);
useEffect(()=>{
 // if(currentAccount){
     fetchNFTs().then((items)=>{
    setNfts(items);
    setNftsCopy(items)
    console.log(nfts);
  });
//}
},[]);
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      {creators.length == 0 ? (<Loader /> ) : ( <FollowerTab TopCreator={creators}  />
      )}

      <FollowerTab TopCreators={creators}/>
      {/* <Title
        heading="Explore NFTs Video"
        paragraph="Discover the most beautiful videos."
      /> */}
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
<NFTCard NFTData={nfts} />
          {nfts?.length ==0 ? <Loader /> : <NFTCard NFTData={nfts}/>}
      
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
