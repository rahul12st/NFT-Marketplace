import React, { useState, useEffect,useContext} from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionpage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";
import { NFTMarketplaceContext } from "@/Context/NFTMarketplaceContext";






const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
      seller: "fddfkdsfdf343sds3243fgrv45df",
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
      seller: "ygujty6u6fdgfdff343sds3243fgrv45df",
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
      seller: "54365gfrdsfdf343sds3243fgrv45df",
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
      seller: "rdftrsdtgfdgfsfdf343sds3243fgrv45df",
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
      seller: "fdyugyutyuys3243fgrv45df",
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
      seller: "fddfkdsfdf34yuiui3fgrv45df",
    },
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);


  //import smartconmtract data
const{ fetchMyNFTsOrListedNFTs, currentAccount} = useContext(NFTMarketplaceContext);

const[nfts, setNfts] = useState([]);
const [myNFTs,setMyNFTs] = useState([])
  useEffect(() => {
    fetchMyNFTsOrListedNFTs("FetchItemsListed").then((items) => {
      setNfts(items);
    });
  }, []);
  
  useEffect(() => {
    fetchMyNFTsOrListedNFTs("FetchMyNFTs").then((items) => {
      setMyNFTs(items);
    });
  }, []);
  
  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard currentAccount={currentAccount} />
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNFTs={myNFTs}
      />
      <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} />
        ))}
      </div>

      <Brand />
    </div>
  );
};

export default author;