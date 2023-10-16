import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import { HeroSection,Service,BigNFTSlider,Subscribe,Title,Category,Filter } from "../components/componentsindex";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Subscribe />
      <Title
         heading="Browse by category"
         paragraph="Explore the NFTs in the most featured categories."
         />
         <Category />
         <Filter />
    </div>
  );
};

export default Home;