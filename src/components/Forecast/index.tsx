import { Cuboid } from "anim-3d-obj";

interface ForecastProps {
   icon: string;
   date: string;
   high: number | any;
   low: number | any;
}

export default function Forecast(props: ForecastProps) {
   const { icon = "04n", date = "sept 11", high = 85, low = 85 } = props;
   const Front = () => {
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
               {parseInt(high)}F
            </div>
            <div style={{ padding: 5 }}></div>
            <div style={{ textAlign: "center" }}>
               <div style={{ fontSize: ".7em", color: "#555" }}>low</div>
               {parseInt(low)}F
            </div>
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
         color:#333;
         backface-visibility: hidden;
         font-family: Arial, Helvetica, sans-serif;
         background: rgba(255, 255, 255, .2);
         `,
      body: " ",
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
         height={165}
         depth={33}
         perspectiveOrigin='50% 50%'
         zIndex={10}
         custom={custom}
         faces={faceprops}
         global={global}
      />
   );
}
