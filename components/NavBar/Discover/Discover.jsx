import React from 'react'
import Link from 'next/link';
import Style from "./Discover.module.css";
const Discover = () => {
//demo data , we take array name of the page and the router
const discover = [
  {
    name: "Collection",
    link:"collection"
  },
  {
    name: "Search",
    link:"searchPage"
  },
  {
    name: "Author",
    link:"author"
  },
  {
    name: "Account Setting",
    link:"account"
  },
  {
    name: "Connect wallet",
    link:"connectWallet"
  },

];

  return (
    <div>
      {discover.map((el, i)=> 
        (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname:`${el.link}`}}>{el.name}</Link>
        </div>
      ))}
    </div>
  )
};

export default Discover;