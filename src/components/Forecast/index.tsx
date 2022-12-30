import Obj from "anim-3d-obj/dist/cjs/components/Obj";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

interface ForecastProps {
   icon: string;
   date: string;
   high: number | any;
   low: number | any;
   unit: string;
   duration: number;
}

export default function Forecast(props: ForecastProps) {
   const {
      icon = "04n",
      date = "Feb 30",
      high = 85,
      low = 85,
      unit = "Celcius",
      duration = 1,
   } = props;
   const [direction, setDirection] = useState<string>("forward");
   const session: any = useAppSelector((state) => state.session);

   const Loaded = ({ unit }: { unit: string }) => {
      return (
         <>
            <div
               style={{
                  fontSize: "1.1em",
                  color: "#222",
                  letterSpacing: "-1.5px",
               }}
            >
               {date}
            </div>
            <div className='row'>
               <img
                  src={`http://openweathermap.org/img/wn/${icon}.png`}
                  alt='weatherIcon'
               />
            </div>
            <div style={{ textAlign: "center" }}>
               <div style={{ fontSize: ".7em", color: "#555" }}>high</div>
               {parseInt(
                  unit !== "Fahrenheit"
                     ? Math.trunc(((high - 32) * 5) / 9)
                     : high
               )}{" "}
               {unit !== "Fahrenheit" ? "F" : "C"}
            </div>
            <div style={{ padding: 5 }}></div>
            <div style={{ textAlign: "center" }}>
               <div style={{ fontSize: ".7em", color: "#555" }}>low</div>
               {parseInt(
                  unit === "Celsius" ? Math.trunc(((low - 32) * 5) / 9) : low
               )}{" "}
               {unit === "Celsius" ? "C" : "F"}
            </div>
         </>
      );
   };

   const global = {
      css: `
         border-radius:10px;
         padding-top:25px;
         padding-left:5px;
         color:#333;
         backface-visibility: hidden;
         font-family: Arial, Helvetica, sans-serif;
         background: rgba(255, 255, 255, .2);
         `,
      body: " ",
   };

   const anim1 = {
      border: "",
      degreesHi: 0,
      degreesLow: 0,
      delay: 0,
      direction,
      duration,
      fillMode: "forwards",
      iterationCount: 1,
      name: "fwdy018",
      timing: "ease-in-out",
   };

   const anim2 = {};

   const faces = [
      {
         name: "front",
         css: ``,
         body: <img src='loading.svg' width='50px' height='50px' />,
      },
      { name: "back", css: ``, body: <Loaded unit={unit} /> },
   ];

   useEffect(() => {
      if (direction === "forwards")
         setTimeout(() => {
            setDirection("reverse");
         }, duration * 1000 + 100);
   }, []);

   useEffect(() => {
      //session
   }, [session]);

   const objProps = {
      width: 60,
      height: 165,
      depth: 33,
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
