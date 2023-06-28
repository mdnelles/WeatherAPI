import React from "react";
import Obj from "anim-3d-obj/dist/cjs/components/Obj";

interface TickerProps {
   front: any;
   top: any;
   back: any;
   bottom: any;
}

export default function Ticker(props: TickerProps) {
   const {
      front = "front",
      back = "back",
      top = "top",
      bottom = "bottom",
   } = props;

   const global = {
      css: `color:#333;
                text-align:center;
                font-size:25px;
                letter-spacing:-2px;
                backface-visibility: hidden;
                font-family: Arial, Helvetica, sans-serif;
                `,
      body: "|||||||||||||||",
   };
   const anim1 = {
      border: "",
      degreesHi: -45,
      degreesLow: 45,
      delay: 0,
      direction: "normal",
      duration: 6,
      fillMode: "forward",
      iterationCount: "infinite",
      name: "X360",
      timing: "linear",
   };
   const anim2 = {};

   const faces = [
      { name: "front", css: ``, body: front },
      { name: "bottom", css: ``, body: bottom },
      { name: "top", css: ``, body: top },
      {
         name: "back",
         css: ``,
         body: <div style={{ transform: "rotate(180deg)" }}>{back}</div>,
      },
   ];

   const objProps = {
      width: 300,
      height: 30,
      depth: 30,
      perspectiveOrigin: "50% 50%",
      perspective: 900,
      faces,
      anim1,
      anim2,
      global,
      showCenterDiv: false,
   };

   return <Obj {...objProps} />;
}
