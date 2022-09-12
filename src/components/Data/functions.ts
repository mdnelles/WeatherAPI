import { forcastArr } from "./types";

export const build_forcast_obj = (data: any) => {
   let forecast: forcastArr;
   let last_day: string = "na",
      ct: number = -1,
      high: number = 0,
      low: number = 0;
   data.list.forEach((e: any, i: any) => {
      const this_day = get_day(e.dt_txt);
      if (this_day !== last_day) {
         if (ct > 0) {
            forecast[ct].high = high;
            forecast[ct].low = low;
            forecast[ct].day = this_day;
         }
         ct++;
      }
   });
};

export const get_day = (val: string) => {
   let tmp = val.split("-");
   let month = "";
   if (tmp[1] === "01") month = "JAN";
   else if (tmp[1] === "02") month = "FEB";
   else if (tmp[1] === "03") month = "MAR";
   else if (tmp[1] === "04") month = "APR";
   else if (tmp[1] === "05") month = "MAY";
   else if (tmp[1] === "06") month = "JUN";
   else if (tmp[1] === "07") month = "JUL";
   else if (tmp[1] === "08") month = "AUG";
   else if (tmp[1] === "09") month = "SEP";
   else if (tmp[1] === "10") month = "OCT";
   else if (tmp[1] === "11") month = "NOV";
   else if (tmp[1] === "12") month = "DEC";
   return `${month} ${tmp[2]}`;
};
