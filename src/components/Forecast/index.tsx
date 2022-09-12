import { Cuboid } from "anim-3d-obj";

interface ForecastProps {
   icon: string;
   date: string;
   temp: number;
}

export default function Forecast(props: ForecastProps) {
   const { icon = "04n", date = "sept 11", temp = 85 } = props;
   const Front = () => {
      return (
         <>
            <div className='date row'>{date}</div>
            <div className='row'>
               <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt='weatherIcon'
               />
            </div>
            <div className='row'>{temp}F</div>
         </>
      );
   };
   const back = "back";

   const faceprops = {
      front: true,
      back: true,
      left: false,
      right: false,
      top: false,
      bottom: false,
   };

   const global: object = {
      css: `
         border-radius:10px;
         padding-top:25px;
         padding-left:5px;
         color:white;
         backface-visibility: hidden;
         font-family: Arial, Helvetica, sans-serif;
         background: rgba(5, 5, 5, 0.3);
         `,
      body: " ",
   };

   const anim1Specs: object = {
      border: "",
      degreesHi: 5, // degrees if spin
      degreesLow: 25, // degrees if spin
      delay: 0,
      direction: "normal", //normal altenating reverse
      duration: 11,
      fillMode: "forward", // node forward backward both
      iterationCount: "infinite",
      name: "wobY",
      timing: "ease-in-out", // linear ease ease-in-out
   };

   const custom: object = {
      front: {
         css: ``,
         body: <Front />,
      },
      back: {
         css: ``,
         body: <Front />,
      },
   };

   return (
      <Cuboid
         width={60}
         height={110}
         depth={33}
         perspectiveOrigin='50% 50%'
         zIndex={10}
         anim1Specs={anim1Specs}
         custom={custom}
         faces={faceprops}
         global={global}
      />
   );
}
