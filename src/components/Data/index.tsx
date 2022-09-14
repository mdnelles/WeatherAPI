import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
   ForecastState,
   updateForecast,
} from "../../features/forecast/forecastSlice";
import { SessionState } from "../../features/session/sessionSlice";
import { API_URL, API_KEY } from "../../utils/config";
import CelcToggle from "../CelcToggle";
import Forecast from "../Forecast";
import Search from "../Search";
import Ticker from "../Ticker";
import { build_forcast_obj, get_day } from "./functions";
import { ForecastArr } from "./types";

const foreStyle = {
   flex: 1,
   minWidth: 75,
   paddingTop: 40,
};

export default function Data() {
   const dis = useAppDispatch();

   const data: any = useAppSelector((state) => state.forecast.value);
   const session: SessionState = useAppSelector((state) => state.session);
   const forecast: ForecastState = useAppSelector((state) => state.forecast);
   //const obj = useRef<any | ForecastArr | undefined>(undefined);
   const [obj, setObj] = useState<any | ForecastArr>(undefined);
   const [city, setCity] = useState<string>("");

   const temp: number = parseInt(data.list[0].main.temp);
   const icon: string = data.list[0].weather[0].icon;
   const front: string = data.list[0].weather[0].description;
   const back: string = `Wind speed: ${data.list[0].wind.speed} mph`;
   const top: string = `Humidity ${data.list[0].main.humidity}%`;
   const bottom: string = `Pressure ${data.list[0].main.pressure / 10}kPa`;

   if (city !== session.city) {
      setObj(build_forcast_obj(data));
      setCity(session.city);
      setTimeout(() => setCity(session.city), 300);
   }

   useEffect(() => {
      if (session.city !== forecast.value.city.name) {
         (async () => {
            try {
               const response = await fetch(
                  `${API_URL}?q=${city}&units=imperial&APPID=${API_KEY}`
               );
               if (response.status === 200) {
                  const data = await response.json();
                  dis(updateForecast(data));
               } else {
                  alert(`Could not find city: ` + city);
               }
            } catch (error) {
               console.log(error);
            }
         })();
      }
   }, [session.city]);
   useEffect(() => {
      console.log("UE forecast: " + session.city);
   }, [forecast]);
   useEffect(() => {
      console.log("UE session.unit: " + session.city);
   }, [session.unit]);

   return (
      <div className='vertical-center center-outer'>
         <div className='center-inner'>
            <div className='window'>
               <Search />
               <div className='city fonts_big'>{data.city.name}</div>
               <div className='row'>
                  <div className='col temp'>
                     {session.unit === "Celsius"
                        ? Math.trunc(((temp - 32) * 5) / 9)
                        : temp}
                     <span>&deg;</span> {session.unit === "Celsius" ? "C" : "F"}
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
                        height: 260,
                     }}
                  >
                     {obj === undefined ? null : (
                        <>
                           <div style={foreStyle}>
                              <Forecast
                                 icon={obj.iconArr[0]}
                                 date={obj.dayArr[0]}
                                 high={obj.highArr[0]}
                                 low={obj.lowArr[0]}
                              />
                           </div>
                           <div style={foreStyle}>
                              <Forecast
                                 icon={obj.iconArr[1]}
                                 date={obj.dayArr[1]}
                                 high={obj.highArr[1]}
                                 low={obj.lowArr[1]}
                              />
                           </div>
                           <div style={foreStyle}>
                              <Forecast
                                 icon={obj.iconArr[2]}
                                 date={obj.dayArr[2]}
                                 high={obj.highArr[2]}
                                 low={obj.lowArr[2]}
                              />
                           </div>
                           <div style={foreStyle}>
                              <Forecast
                                 icon={obj.iconArr[3]}
                                 date={obj.dayArr[3]}
                                 high={obj.highArr[3]}
                                 low={obj.lowArr[3]}
                              />
                           </div>
                        </>
                     )}
                  </div>
               </div>
               <div className='row'>
                  <CelcToggle />
               </div>
            </div>
         </div>
      </div>
   );
}
