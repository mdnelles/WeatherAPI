import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
   SessionState,
   updateSession,
} from "../../features/session/sessionSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function CelcToggle(): JSX.Element {
   const dispatch = useAppDispatch();
   const session: SessionState = useAppSelector((state) => state.session);
   const [choice, setChoice] = useState<string>(session.unit);
   const handleChoice = (val: string) => {
      setChoice(val);
      dispatch(updateSession({ ...session, unit: val }));
   };
   return (
      <div
         style={{
            width: "100%",
            padding: 10,
            background: "rgba(222, 222, 222, 0.3)",
            borderRadius: 10,
         }}
      >
         <FormControl fullWidth>
            <InputLabel id='unit'>Unit</InputLabel>
            <Select
               labelId='unit-id'
               id='unit'
               value={choice}
               label='Unit'
               onChange={(e) => handleChoice(e.target.value)}
            >
               <MenuItem value={"Celcius"}>Celcius</MenuItem>
               <MenuItem value={"Fahrenheit"}>Fahrenheit</MenuItem>
            </Select>
         </FormControl>
      </div>
   );
}
