import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Forecast from "../Forecast";
import Ticker from "../Ticker";
import { build_forcast_obj, get_day } from "./functions";

const foreStyle = {
   flex: 1,
   minWidth: 75,
   paddingTop: 40,
};

export default function Data() {
   //const dispatch = useAppDispatch();
   const data: any = useAppSelector((state) => state.forecast.value);
   const temp: number = parseInt(data.list[0].main.temp);
   const icon: string = data.list[0].weather[0].icon;
   const front: string = data.list[0].weather[0].description;
   const back: string = `Wind speed: ${data.list[0].wind.speed} mph`;
   const top: string = `Humidity ${data.list[0].main.humidity}%`;
   const bottom: string = `Pressure ${data.list[0].main.pressure / 10}kPa`;

   let fco = build_forcast_obj(data);

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <div className='window'>
               <div className='city fonts_big'>{data.city.name}</div>
               <div className='row'>
                  <div className='col temp'>
                     {temp}
                     <span>&deg;</span> F
                  </div>
                  <div className='col'>
                     <img
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt='weatherIcon'
                     />
                  </div>
               </div>
               <div className='row'>
                  <Ticker front={front} back={back} top={top} bottom={bottom} />
               </div>
               <div className='row'>
                  <div
                     style={{
                        display: "flex",
                        flexWrap: "wrap",
                     }}
                  >
                     <div style={foreStyle}>
                        <Forecast icon={"04n"} date={"SEP 11"} temp={85} />
                     </div>
                     <div style={foreStyle}>
                        <Forecast icon={"04n"} date={"SEP 12"} temp={85} />
                     </div>
                     <div style={foreStyle}>
                        <Forecast icon={"04n"} date={"SEP 13"} temp={85} />
                     </div>
                     <div style={foreStyle}>
                        <Forecast icon={"04n"} date={"SEP 14"} temp={85} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
