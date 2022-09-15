import { Cuboid } from "anim-3d-obj";
import React from "react";
import Logo from "./Logo";

export default function Github(): JSX.Element {
   const faceprops = {
      front: true,
      back: true,
      left: true,
      right: true,
      top: false,
      bottom: false,
   };

   const global: object = {
      // // face individual styles (over rides global)
      css: `
      background rgb(90,90,90,.7);
      `,
      body: <Logo />,
   };
   const anim1Specs: object = {
      border: "",
      degreesHi: 0,
      degreesLow: 0,
      delay: 0,
      direction: "normal", //normal altenating reverse
      duration: 8,
      fillMode: "forward", // node forward backward both
      iterationCount: "infinite",
      name: "Y360",
      timing: "ease-in-out", // linear ease ease-in-out
   };

   const custom = {
      top: {
         css: `background rgb(0,0,0,1);`,
         body: "<>",
      },
   };

   return (
      <div style={{ position: "absolute", bottom: 30, right: 30, zIndex: 100 }}>
         <Cuboid
            width={50}
            height={50}
            depth={50}
            perspectiveOrigin='50% -500%'
            zIndex={10}
            anim1Specs={anim1Specs}
            faces={faceprops}
            custom={custom}
            global={global}
         />
      </div>
   );
}
