import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateSession } from "../../features/session/sessionSlice";

export default function Search(): JSX.Element {
   const session: any = useAppSelector((state) => state.session);
   const dispatch = useAppDispatch();
   const [city, setCity] = useState<string>("");
   const get_city = () => {
      dispatch(updateSession({ ...session, city }));
   };
   return (
      <div className='search_wrapper'>
         <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 30 }}>
               <input
                  type='text'
                  className='search_box'
                  placeholder='Type City Here...'
                  onChange={(event) => setCity(event.target.value)}
               />
            </div>
            <div style={{ flex: 1, minWidth: 3 }}>
               <div className='go_wrapper'>
                  <button className='go_button' onClick={get_city}>
                     GO
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
