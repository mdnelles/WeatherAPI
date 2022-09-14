import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
   SessionState,
   updateSession,
} from "../../features/session/sessionSlice";

export default function CelcToggle(): JSX.Element {
   const dispatch = useAppDispatch();
   const session: SessionState = useAppSelector((state) => state.session);
   const [choice, setChoice] = useState<string>(session.unit);
   const handleChoice = (val: string) => {
      setChoice(val);
      dispatch(updateSession({ ...session, unit: val }));
   };
   return (
      <>
         <select
            className='cf_tog'
            value={choice}
            defaultValue={"default"}
            onChange={(e) => handleChoice(e.target.value)}
         >
            <option value='Fahrenheit'>Fahrenheit</option>
            <option value='Celsius'>Celcius</option>
         </select>
      </>
   );
}
