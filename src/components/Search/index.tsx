import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateSession } from "../../features/session/sessionSlice";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Button, { ButtonProps } from "@mui/material/Button";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
   "color": theme.palette.getContrastText("#fff"),
   "backgroundColor": "#90cc70",
   "&:hover": {
      backgroundColor: "#90cc70",
   },
}));

export default function Search(): JSX.Element {
   const session: any = useAppSelector((state) => state.session);
   const dispatch = useAppDispatch();
   const [city, setCity] = useState<string>("");
   const get_city = () => {
      dispatch(updateSession({ ...session, city }));
   };
   return (
      <Grid container spacing={2}>
         <Grid item xs={9}>
            <TextField
               id='outlined-basic'
               label='City'
               size='small'
               defaultValue={" "}
               variant='outlined'
               fullWidth={true}
               placeholder='Type City Here...'
               onChange={(event: any) => setCity(event.target.value)}
            />
         </Grid>
         <Grid item xs={3}>
            <ColorButton
               variant='contained'
               sx={{ height: 40 }}
               onClick={() => get_city()}
            >
               <SearchIcon />
            </ColorButton>
         </Grid>
      </Grid>
   );
}
