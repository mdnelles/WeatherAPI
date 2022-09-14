import { isJSDocNameReference } from "typescript";

export const build_forcast_obj = (data: any) => {
   let highArr: number[] = [];
   let lowArr: number[] = [];
   let dayArr: string[] = [];
   let iconArr: string[] = [];

   try {
      let last_day: string = "na",
         ct: number = -1,
         high: number = -200,
         low: number = 200;
      data.list.forEach((e: any, i: any) => {
         const this_day = get_day(e.dt_txt);
         if (e.main.temp_min < low) low = e.main.temp_min;
         if (e.main.temp_max > high) high = e.main.temp_max;

         if (this_day !== last_day) {
            last_day = this_day;
            highArr.push(high);
            lowArr.push(low);
            dayArr.push(this_day);
            iconArr.push(e.weather[0].icon);

            low = 200;
            high = -200;
            ct++;
         }
      });
      console.log("finished:" + data.city.name);
      return {
         highArr,
         lowArr,
         dayArr,
         iconArr,
      };
   } catch (error) {
      console.log(error);
      return undefined;
   }
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
   return `${month} ${tmp[2].substring(0, 2)}`;
};
