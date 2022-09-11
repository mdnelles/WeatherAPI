import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function Data(): JSX.Element {
   //const dispatch = useAppDispatch();
   const data: any = useAppSelector((state) => state.forecast.value);
   const temp = parseInt(data.list[0].main.temp);
   const icon = data.list[0].weather[0].icon;
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
                  <div className='col med_font'></div>
                  <div className='col med_font'></div>
               </div>
            </div>
         </div>
      </div>
   );
}
