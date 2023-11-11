import React,{useState,useContext,useEffect} from "react";
import Image from "next/image";
import Style from './Error.module.css'
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import images from '../../img';
import {NFT} from '../../Context/NFTMarketplaceContext';

const Error= ()=>{
    const {error, setOpenError} = useContext(NFTMarketplaceContext);
    return(
     <div className={Style.Error} onClick={()=> setOpenError(false)}>
        <div className={Style.Error_box}>
            <div className={Style.Error_box_info}>
<Image
  src={images.errorgif}
  alt="Error 404!"
  width={1000}
  height={650}
  objectFit="cover"
  className={Style.Error_box_info_img}
  priority
/>
 <p>{error}</p> 

             </div>
          </div>
       </div>
);
};
export default Error;