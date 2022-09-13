import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SessionState } from "../../features/session/sessionSlice";
import Forecast from "../Forecast";
import Ticker from "../Ticker";
import { build_forcast_obj, get_day } from "./functions";
import { ForecastArr } from "./types";

const foreStyle = {
   flex: 1,
   minWidth: 75,
   paddingTop: 40,
};

export default function Data() {
   //const dispatch = useAppDispatch();

   const data: any = useAppSelector((state) => state.forecast.value);
   const session: SessionState = useAppSelector((state) => state.session);
   const obj = useRef<any | ForecastArr | undefined>(undefined);
   const [city, setCity] = useState<string>("");

   const temp: number = parseInt(data.list[0].main.temp);
   const icon: string = data.list[0].weather[0].icon;
   const front: string = data.list[0].weather[0].description;
   const back: string = `Wind speed: ${data.list[0].wind.speed} mph`;
   const top: string = `Humidity ${data.list[0].main.humidity}%`;
   const bottom: string = `Pressure ${data.list[0].main.pressure / 10}kPa`;

   if (city !== session.city) {
      obj.current = build_forcast_obj(data);
      console.log(obj.current);
      setCity(session.city);
   }

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
                     {obj === undefined ? null : (
                        <>
                           <div style={foreStyle}>
                              <Forecast
                                 icon={obj.current.iconArr[1]}
                                 date={obj.current.dayArr[1]}
                                 high={obj.current.highArr[1]}
                                 low={obj.current.lowArr[1]}
                              />
                           </div>
                           <div style={foreStyle}>
                              <Forecast
                                 icon={obj.current.iconArr[2]}
                                 date={obj.current.dayArr[2]}
                                 high={obj.current.highArr[2]}
                                 low={obj.current.lowArr[2]}
                              />
                           </div>
                           <div style={foreStyle}>
                              <Forecast
                                 icon={obj.current.iconArr[3]}
                                 date={obj.current.dayArr[3]}
                                 high={obj.current.highArr[3]}
                                 low={obj.current.lowArr[3]}
                              />
                           </div>
                           <div style={foreStyle}>
                              <Forecast
                                 icon={obj.current.iconArr[4]}
                                 date={obj.current.dayArr[4]}
                                 high={obj.current.highArr[4]}
                                 low={obj.current.lowArr[4]}
                              />
                           </div>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
