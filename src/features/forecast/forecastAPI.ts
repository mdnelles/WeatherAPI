import { API_KEY, API_URL } from "../../utils/config";

export function fetchForecast(city: any) {
   return new Promise<any>((resolve) => {
      console.log("fetchLive step 3");
      const response = fetch(
         `${API_URL}?q=${city}&units=imperial&APPID=${API_KEY}`
      );
      try {
         //resolve(await response.json());
         resolve(response);
      } catch (error) {
         console.log(error);
         resolve({ data: "error" });
      }
   });
}
