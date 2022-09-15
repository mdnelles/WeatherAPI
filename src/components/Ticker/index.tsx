import { Cuboid } from "anim-3d-obj";

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
   const faceprops = {
      front: true,
      back: true,
      left: false,
      right: false,
      top: true,
      bottom: true,
   };

   const global: object = {
      css: `color:#333;
                text-align:center;
                font-size:25px;
                letter-spacing:-2px;
                backface-visibility: hidden;
                font-family: Arial, Helvetica, sans-serif;
                `,
      body: "|||||||||||||||",
   };
   const anim1Specs: object = {
      border: "",
      degreesHi: -45, // degrees if spin
      degreesLow: 45, // degrees if spin
      delay: 0,
      direction: "normal", //normal altenating reverse
      duration: 6,
      fillMode: "forward", // node forward backward both
      iterationCount: "infinite",
      name: "X360",
      timing: "linear", // linear ease ease-in-out
   };

   const custom: object = {
      // // face individual styles (over rides global)
      front: {
         css: ``,
         body: front,
      },
      bottom: {
         css: ``,
         body: bottom,
      },
      top: {
         css: ``,
         body: top,
      },
      back: {
         css: ``,
         body: <div style={{ transform: "rotate(180deg)" }}>{back}</div>,
      },
   };

   return (
      <Cuboid
         width={300}
         height={30}
         depth={30}
         perspectiveOrigin='50% 50%'
         zIndex={10}
         anim1Specs={anim1Specs}
         custom={custom}
         faces={faceprops}
         global={global}
      />
   );
}
