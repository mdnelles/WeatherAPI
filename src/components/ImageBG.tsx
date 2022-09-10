import React from "react";
import imgBG from "../assets/imgBG.jpg";

interface imgStyleType {
   backgroundImage: string;
   backgroundPosition: string;
   backgroundSize: string;
   backgroundRepeat: string;
   width: string;
   height: string;
}

const imgStyle: imgStyleType = {
   backgroundImage: `url(${imgBG})`,
   backgroundPosition: "center",
   backgroundSize: "cover",
   backgroundRepeat: "no-repeat",
   width: "100vw",
   height: "100vh",
};

export default function ImgBG() {
   return (
      <>
         <div style={imgStyle} />
      </>
   );
}
