import React from 'react'
import Link from 'next/link';
import Style from "./Discover.module.css";
const Discover = () => {
//demo data , we take array name of the page and the router
const discover = [
  {
    name: "Collection",
    link:"Collection"
  },
  {
    name: "Search",
    link:"search"
  },
  {
    name: "Author-profile",
    link:"author-profile"
  },
  {
    name: "NFT-Details",
    link:"NFT-Details"
  },
  {
    name: "Account Setting",
    link:"account setting"
  },
  {
    name: "Connect wallet",
    link:"connect wallet"
  },
  {
    name: "blog",
    link:"blog"
  }
];

  return (
    <div>
      {discover.map((el, i)=> (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: '${el.link}'}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
};

export default Discover;