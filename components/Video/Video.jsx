import React from "react";
import Image from "next/image";

//INTERNALIMPORT
import Style from "./Video.module.css";
import images from "../../img";

const Video = () => {
  return (
    <div className={Style.Video}>
      <div className={Style.Video_box}>
        <h1>
          <span>🎬</span> The Videos
        </h1>
        <p>
          Check out our hottest videos. View more and share more new
          perspectives on just about any topic. Everyones welcome.
        </p>

        <div className={Style.Video_box_frame}>
          <div className={Style.Video_box_frame_left}>
            <Image
              src={images.NFTVideo}
              alt="Video image"
              width={250}
              height={250}
              objectFit="cover"
              className={Style.Video_box_frame_left_img}
            />
             <Image
              src={images.NFTVideo2}
              alt="Video image"
              width={250}
              height={250}
              objectFit="cover"
              className={Style.Video_box_frame_left_img}
            />
             <Image
              src={images.NFTVideo3}
              alt="Video image"
              width={250}
              height={250}
              objectFit="cover"
              className={Style.Video_box_frame_left_img}
            />

          </div>

          <div className={Style.Video_box_frame_right}></div>
        </div>
      </div>
    </div>
  );
};

export default Video;
