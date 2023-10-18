import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection,Service,BigNFTSlider,Subscribe,Title,Category,Filter, NFTCard,DaysComponents,Collection,FollowerTab} from "../components/componentsindex";



const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
         heading="New Collection"
         paragraph="Discover all the NFTs in world"
         />
         <FollowerTab />
         <Collection />
      <Title
         heading="Featured NFTs"
         paragraph="Discover the most outstanding NFTs in all topics of life."
         />
      <Filter />
      <Title
         heading="Browse by category"
         paragraph="Explore the NFTs in the most featured categories."
         />
         
         <Category />
         <Subscribe />
         <NFTCard />
        

    </div>
  );
};

export default Home;