import Obj from "anim-3d-obj/dist/cjs/components/Obj";
import React from "react";
import Logo from "./Logo";

export default function Github(): JSX.Element {
   const faces = [
      {
         name: "front",
      },
      {
         name: "back",
      },
      {
         name: "left",
      },
      {
         name: "right",
      },
   ];

   const global = {
      css: `background rgb(90,90,90,.7);`,
      body: <Logo />,
   };

   const anim1 = {
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
   const anim2 = {};

   const objProps = {
      width: 50,
      height: 50,
      depth: 50,
      perspectiveOrigin: "50% -500%",
      perspective: 900,
      faces,
      anim1,
      anim2,
      global,
      showCenterDiv: false,
   };

   return (
      <div style={{ position: "absolute", bottom: 30, right: 30, zIndex: 100 }}>
         <Obj {...objProps} />
      </div>
   );
}
