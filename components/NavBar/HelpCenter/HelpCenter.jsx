import React from 'react'
import Link from 'next/link';
import Style from "./HelpCenter.module.css";
const HelpCenter = () => {
    const helpCenter=[
      {
        name: "About",
        link:"About"
      },
      {
        name: "Contact us",
        link:"Contact us"
      },
      {
        name: "Sign-up",
        link:"Sign-up"
      },
      {
        name: "Sign in",
        link:"Sign-in"
      },
      {
        name: "Subscription",
        link:"Subscription"
      }
    ];
  return (
    <div className={Style.box}>
      {
        helpCenter.map((el, i)=>(
        <div className={Style.helpCenter}>
           <Link href={{pathname :`{el.link}`}}>{el.name}</Link>
        </div>
        ))
    };
  </div>
  )
}

export default HelpCenter;