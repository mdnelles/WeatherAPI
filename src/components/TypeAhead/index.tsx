import React from "react";
import Select from "react-select";
import { useAppSelector } from "../../app/hooks";
import { SessionState } from "../../features/session/sessionSlice";

export default function TypeAhead(): JSX.Element {
   const session: SessionState = useAppSelector((state) => state.session);
   const options = session.cityList;
   console.log(options);
   return (
      <>
         <div style={{ padding: 20, maxWidth: 500 }}>
            <Select options={options} />
         </div>
      </>
   );
}
