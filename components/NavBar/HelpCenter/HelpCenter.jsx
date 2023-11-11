import React from 'react'
import Link from 'next/link';
import Style from "./HelpCenter.module.css";
const HelpCenter = () => {
    const helpCenter=[
      {
        name: "About Us",
        link:"aboutus"
      },
      {
        name: "Contact us",
        link:"contactus"
      },
      {
        name: "Sign-up",
        link:"signUp"
      },
      {
        name: "Subscription",
        link:"subscription"
      }
    ];
  return (
    <div className={Style.box}>
      {helpCenter.map((el, i)=>(
        <div key={i + 1} className={Style.helpCenter}>
           <Link href={{pathname :`${el.link}`}}>{el.name}</Link>
        </div>
        ))
    }
  </div>
  )
};

export default HelpCenter;