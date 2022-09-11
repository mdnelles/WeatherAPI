import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchForecast } from "./forecastAPI";

export interface ForecastState {
   value: any;
   status: "idle" | "loading" | "failed";
}

const initialState: ForecastState = {
   value: {
      cod: "200",
      message: 0,
      cnt: 40,
      list: [
         {
            dt: 1662800400,
            main: {
               temp: 82.63,
               feels_like: 90.66,
               temp_min: 82.63,
               temp_max: 85.12,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1013,
               humidity: 81,
               temp_kf: -1.38,
            },
            weather: [
               {
                  id: 803,
                  main: "Clouds",
                  description: "broken clouds",
                  icon: "04n",
               },
            ],
            clouds: {
               all: 75,
            },
            wind: {
               speed: 9.01,
               deg: 158,
               gust: 10.96,
            },
            visibility: 10000,
            pop: 0,
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-10 09:00:00",
         },
         {
            dt: 1662811200,
            main: {
               temp: 83.66,
               feels_like: 91.67,
               temp_min: 83.66,
               temp_max: 85.71,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1015,
               humidity: 76,
               temp_kf: -1.14,
            },
            weather: [
               {
                  id: 803,
                  main: "Clouds",
                  description: "broken clouds",
                  icon: "04d",
               },
            ],
            clouds: {
               all: 83,
            },
            wind: {
               speed: 11.14,
               deg: 151,
               gust: 13.22,
            },
            visibility: 10000,
            pop: 0,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-10 12:00:00",
         },
         {
            dt: 1662822000,
            main: {
               temp: 86.25,
               feels_like: 94.8,
               temp_min: 86.25,
               temp_max: 88.05,
               pressure: 1016,
               sea_level: 1016,
               grnd_level: 1017,
               humidity: 68,
               temp_kf: -1,
            },
            weather: [
               {
                  id: 804,
                  main: "Clouds",
                  description: "overcast clouds",
                  icon: "04d",
               },
            ],
            clouds: {
               all: 92,
            },
            wind: {
               speed: 10.11,
               deg: 157,
               gust: 11.07,
            },
            visibility: 10000,
            pop: 0.1,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-10 15:00:00",
         },
         {
            dt: 1662832800,
            main: {
               temp: 88.9,
               feels_like: 97.12,
               temp_min: 88.9,
               temp_max: 88.9,
               pressure: 1016,
               sea_level: 1016,
               grnd_level: 1016,
               humidity: 60,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 804,
                  main: "Clouds",
                  description: "overcast clouds",
                  icon: "04d",
               },
            ],
            clouds: {
               all: 100,
            },
            wind: {
               speed: 11.83,
               deg: 139,
               gust: 10.45,
            },
            visibility: 10000,
            pop: 0.06,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-10 18:00:00",
         },
         {
            dt: 1662843600,
            main: {
               temp: 88.25,
               feels_like: 96.66,
               temp_min: 88.25,
               temp_max: 88.25,
               pressure: 1015,
               sea_level: 1015,
               grnd_level: 1015,
               humidity: 62,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 804,
                  main: "Clouds",
                  description: "overcast clouds",
                  icon: "04d",
               },
            ],
            clouds: {
               all: 87,
            },
            wind: {
               speed: 11.59,
               deg: 141,
               gust: 10.22,
            },
            visibility: 10000,
            pop: 0,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-10 21:00:00",
         },
         {
            dt: 1662854400,
            main: {
               temp: 86.86,
               feels_like: 95.81,
               temp_min: 86.86,
               temp_max: 86.86,
               pressure: 1016,
               sea_level: 1016,
               grnd_level: 1016,
               humidity: 67,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 803,
                  main: "Clouds",
                  description: "broken clouds",
                  icon: "04n",
               },
            ],
            clouds: {
               all: 63,
            },
            wind: {
               speed: 9.37,
               deg: 141,
               gust: 9.86,
            },
            visibility: 10000,
            pop: 0.08,
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-11 00:00:00",
         },
         {
            dt: 1662865200,
            main: {
               temp: 86.22,
               feels_like: 94.71,
               temp_min: 86.22,
               temp_max: 86.22,
               pressure: 1018,
               sea_level: 1018,
               grnd_level: 1018,
               humidity: 68,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 88,
            },
            wind: {
               speed: 9.22,
               deg: 122,
               gust: 9.75,
            },
            visibility: 10000,
            pop: 0.28,
            rain: {
               "3h": 0.1,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-11 03:00:00",
         },
         {
            dt: 1662876000,
            main: {
               temp: 85.33,
               feels_like: 93.88,
               temp_min: 85.33,
               temp_max: 85.33,
               pressure: 1017,
               sea_level: 1017,
               grnd_level: 1017,
               humidity: 71,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 803,
                  main: "Clouds",
                  description: "broken clouds",
                  icon: "04n",
               },
            ],
            clouds: {
               all: 62,
            },
            wind: {
               speed: 9.26,
               deg: 112,
               gust: 9.64,
            },
            visibility: 10000,
            pop: 0.28,
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-11 06:00:00",
         },
         {
            dt: 1662886800,
            main: {
               temp: 84.96,
               feels_like: 92.98,
               temp_min: 84.96,
               temp_max: 84.96,
               pressure: 1017,
               sea_level: 1017,
               grnd_level: 1017,
               humidity: 71,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 20,
            },
            wind: {
               speed: 9.17,
               deg: 102,
               gust: 9.64,
            },
            visibility: 10000,
            pop: 0.29,
            rain: {
               "3h": 0.39,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-11 09:00:00",
         },
         {
            dt: 1662897600,
            main: {
               temp: 84.96,
               feels_like: 92.23,
               temp_min: 84.96,
               temp_max: 84.96,
               pressure: 1018,
               sea_level: 1018,
               grnd_level: 1018,
               humidity: 69,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 802,
                  main: "Clouds",
                  description: "scattered clouds",
                  icon: "03d",
               },
            ],
            clouds: {
               all: 26,
            },
            wind: {
               speed: 9.98,
               deg: 100,
               gust: 10.54,
            },
            visibility: 10000,
            pop: 0.25,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-11 12:00:00",
         },
         {
            dt: 1662908400,
            main: {
               temp: 87.03,
               feels_like: 94.39,
               temp_min: 87.03,
               temp_max: 87.03,
               pressure: 1019,
               sea_level: 1019,
               grnd_level: 1019,
               humidity: 63,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
               },
            ],
            clouds: {
               all: 4,
            },
            wind: {
               speed: 10.51,
               deg: 104,
               gust: 11.16,
            },
            visibility: 10000,
            pop: 0.06,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-11 15:00:00",
         },
         {
            dt: 1662919200,
            main: {
               temp: 88.23,
               feels_like: 96.6,
               temp_min: 88.23,
               temp_max: 88.23,
               pressure: 1018,
               sea_level: 1018,
               grnd_level: 1018,
               humidity: 62,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
               },
            ],
            clouds: {
               all: 2,
            },
            wind: {
               speed: 10.65,
               deg: 110,
               gust: 9.95,
            },
            visibility: 10000,
            pop: 0.06,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-11 18:00:00",
         },
         {
            dt: 1662930000,
            main: {
               temp: 87.82,
               feels_like: 95.22,
               temp_min: 87.82,
               temp_max: 87.82,
               pressure: 1016,
               sea_level: 1016,
               grnd_level: 1016,
               humidity: 61,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
               },
            ],
            clouds: {
               all: 1,
            },
            wind: {
               speed: 8.93,
               deg: 108,
               gust: 7.45,
            },
            visibility: 10000,
            pop: 0,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-11 21:00:00",
         },
         {
            dt: 1662940800,
            main: {
               temp: 85.8,
               feels_like: 93.76,
               temp_min: 85.8,
               temp_max: 85.8,
               pressure: 1016,
               sea_level: 1016,
               grnd_level: 1016,
               humidity: 68,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n",
               },
            ],
            clouds: {
               all: 1,
            },
            wind: {
               speed: 8.88,
               deg: 99,
               gust: 8.68,
            },
            visibility: 10000,
            pop: 0.1,
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-12 00:00:00",
         },
         {
            dt: 1662951600,
            main: {
               temp: 85.06,
               feels_like: 92.86,
               temp_min: 85.06,
               temp_max: 85.06,
               pressure: 1017,
               sea_level: 1017,
               grnd_level: 1017,
               humidity: 70,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 0,
            },
            wind: {
               speed: 7.61,
               deg: 100,
               gust: 7.47,
            },
            visibility: 10000,
            pop: 0.36,
            rain: {
               "3h": 0.26,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-12 03:00:00",
         },
         {
            dt: 1662962400,
            main: {
               temp: 84.15,
               feels_like: 91.13,
               temp_min: 84.15,
               temp_max: 84.15,
               pressure: 1016,
               sea_level: 1016,
               grnd_level: 1016,
               humidity: 71,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 0,
            },
            wind: {
               speed: 4.99,
               deg: 96,
               gust: 4.68,
            },
            visibility: 10000,
            pop: 0.83,
            rain: {
               "3h": 0.91,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-12 06:00:00",
         },
         {
            dt: 1662973200,
            main: {
               temp: 83.8,
               feels_like: 90.37,
               temp_min: 83.8,
               temp_max: 83.8,
               pressure: 1015,
               sea_level: 1015,
               grnd_level: 1014,
               humidity: 71,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n",
               },
            ],
            clouds: {
               all: 0,
            },
            wind: {
               speed: 6.42,
               deg: 90,
               gust: 6.44,
            },
            visibility: 10000,
            pop: 0.1,
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-12 09:00:00",
         },
         {
            dt: 1662984000,
            main: {
               temp: 83.97,
               feels_like: 90.73,
               temp_min: 83.97,
               temp_max: 83.97,
               pressure: 1015,
               sea_level: 1015,
               grnd_level: 1015,
               humidity: 71,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
               },
            ],
            clouds: {
               all: 0,
            },
            wind: {
               speed: 6.29,
               deg: 97,
               gust: 6.53,
            },
            visibility: 10000,
            pop: 0.09,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-12 12:00:00",
         },
         {
            dt: 1662994800,
            main: {
               temp: 86.45,
               feels_like: 93.15,
               temp_min: 86.45,
               temp_max: 86.45,
               pressure: 1016,
               sea_level: 1016,
               grnd_level: 1015,
               humidity: 63,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
               },
            ],
            clouds: {
               all: 6,
            },
            wind: {
               speed: 8.72,
               deg: 111,
               gust: 8.41,
            },
            visibility: 10000,
            pop: 0,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-12 15:00:00",
         },
         {
            dt: 1663005600,
            main: {
               temp: 87.62,
               feels_like: 93.9,
               temp_min: 87.62,
               temp_max: 87.62,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1014,
               humidity: 59,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
               },
            ],
            clouds: {
               all: 4,
            },
            wind: {
               speed: 9.28,
               deg: 118,
               gust: 6.8,
            },
            visibility: 10000,
            pop: 0,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-12 18:00:00",
         },
         {
            dt: 1663016400,
            main: {
               temp: 87.12,
               feels_like: 93.31,
               temp_min: 87.12,
               temp_max: 87.12,
               pressure: 1013,
               sea_level: 1013,
               grnd_level: 1013,
               humidity: 60,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01d",
               },
            ],
            clouds: {
               all: 9,
            },
            wind: {
               speed: 9.6,
               deg: 118,
               gust: 7.47,
            },
            visibility: 10000,
            pop: 0.04,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-12 21:00:00",
         },
         {
            dt: 1663027200,
            main: {
               temp: 85.39,
               feels_like: 92.44,
               temp_min: 85.39,
               temp_max: 85.39,
               pressure: 1012,
               sea_level: 1012,
               grnd_level: 1012,
               humidity: 67,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 802,
                  main: "Clouds",
                  description: "scattered clouds",
                  icon: "03n",
               },
            ],
            clouds: {
               all: 31,
            },
            wind: {
               speed: 11.9,
               deg: 114,
               gust: 12.53,
            },
            visibility: 10000,
            pop: 0.13,
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-13 00:00:00",
         },
         {
            dt: 1663038000,
            main: {
               temp: 84.36,
               feels_like: 90.93,
               temp_min: 84.36,
               temp_max: 84.36,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1014,
               humidity: 69,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 84,
            },
            wind: {
               speed: 5.41,
               deg: 137,
               gust: 5.68,
            },
            visibility: 10000,
            pop: 0.79,
            rain: {
               "3h": 1.57,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-13 03:00:00",
         },
         {
            dt: 1663048800,
            main: {
               temp: 84.27,
               feels_like: 90.73,
               temp_min: 84.27,
               temp_max: 84.27,
               pressure: 1013,
               sea_level: 1013,
               grnd_level: 1013,
               humidity: 69,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 92,
            },
            wind: {
               speed: 5.5,
               deg: 121,
               gust: 5.57,
            },
            visibility: 10000,
            pop: 0.97,
            rain: {
               "3h": 0.28,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-13 06:00:00",
         },
         {
            dt: 1663059600,
            main: {
               temp: 83.8,
               feels_like: 89.74,
               temp_min: 83.8,
               temp_max: 83.8,
               pressure: 1012,
               sea_level: 1012,
               grnd_level: 1012,
               humidity: 69,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 804,
                  main: "Clouds",
                  description: "overcast clouds",
                  icon: "04n",
               },
            ],
            clouds: {
               all: 100,
            },
            wind: {
               speed: 5.79,
               deg: 99,
               gust: 5.99,
            },
            visibility: 10000,
            pop: 0.05,
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-13 09:00:00",
         },
         {
            dt: 1663070400,
            main: {
               temp: 84.02,
               feels_like: 90.52,
               temp_min: 84.02,
               temp_max: 84.02,
               pressure: 1013,
               sea_level: 1013,
               grnd_level: 1013,
               humidity: 70,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 804,
                  main: "Clouds",
                  description: "overcast clouds",
                  icon: "04d",
               },
            ],
            clouds: {
               all: 95,
            },
            wind: {
               speed: 6.62,
               deg: 111,
               gust: 7.36,
            },
            visibility: 10000,
            pop: 0.05,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-13 12:00:00",
         },
         {
            dt: 1663081200,
            main: {
               temp: 86.52,
               feels_like: 93.7,
               temp_min: 86.52,
               temp_max: 86.52,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1014,
               humidity: 64,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10d",
               },
            ],
            clouds: {
               all: 62,
            },
            wind: {
               speed: 8.68,
               deg: 115,
               gust: 7.96,
            },
            visibility: 10000,
            pop: 0.27,
            rain: {
               "3h": 0.11,
            },
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-13 15:00:00",
         },
         {
            dt: 1663092000,
            main: {
               temp: 87.4,
               feels_like: 94.32,
               temp_min: 87.4,
               temp_max: 87.4,
               pressure: 1013,
               sea_level: 1013,
               grnd_level: 1013,
               humidity: 61,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10d",
               },
            ],
            clouds: {
               all: 52,
            },
            wind: {
               speed: 10.85,
               deg: 120,
               gust: 8.79,
            },
            visibility: 10000,
            pop: 0.57,
            rain: {
               "3h": 1.52,
            },
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-13 18:00:00",
         },
         {
            dt: 1663102800,
            main: {
               temp: 86.81,
               feels_like: 93.92,
               temp_min: 86.81,
               temp_max: 86.81,
               pressure: 1012,
               sea_level: 1012,
               grnd_level: 1012,
               humidity: 63,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 803,
                  main: "Clouds",
                  description: "broken clouds",
                  icon: "04d",
               },
            ],
            clouds: {
               all: 79,
            },
            wind: {
               speed: 10.54,
               deg: 125,
               gust: 10.04,
            },
            visibility: 10000,
            pop: 0.17,
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-13 21:00:00",
         },
         {
            dt: 1663113600,
            main: {
               temp: 85.53,
               feels_like: 92.37,
               temp_min: 85.53,
               temp_max: 85.53,
               pressure: 1012,
               sea_level: 1012,
               grnd_level: 1012,
               humidity: 66,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 803,
                  main: "Clouds",
                  description: "broken clouds",
                  icon: "04n",
               },
            ],
            clouds: {
               all: 72,
            },
            wind: {
               speed: 11.95,
               deg: 111,
               gust: 12.95,
            },
            visibility: 10000,
            pop: 0.24,
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-14 00:00:00",
         },
         {
            dt: 1663124400,
            main: {
               temp: 84.36,
               feels_like: 90.59,
               temp_min: 84.36,
               temp_max: 84.36,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1014,
               humidity: 68,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 99,
            },
            wind: {
               speed: 6.24,
               deg: 103,
               gust: 6.42,
            },
            visibility: 10000,
            pop: 0.92,
            rain: {
               "3h": 1.1,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-14 03:00:00",
         },
         {
            dt: 1663135200,
            main: {
               temp: 83.35,
               feels_like: 88.83,
               temp_min: 83.35,
               temp_max: 83.35,
               pressure: 1013,
               sea_level: 1013,
               grnd_level: 1013,
               humidity: 69,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 501,
                  main: "Rain",
                  description: "moderate rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 99,
            },
            wind: {
               speed: 10.2,
               deg: 116,
               gust: 10.63,
            },
            visibility: 10000,
            pop: 1,
            rain: {
               "3h": 3.83,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-14 06:00:00",
         },
         {
            dt: 1663146000,
            main: {
               temp: 79.27,
               feels_like: 79.27,
               temp_min: 79.27,
               temp_max: 79.27,
               pressure: 1013,
               sea_level: 1013,
               grnd_level: 1013,
               humidity: 77,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 100,
            },
            wind: {
               speed: 2.93,
               deg: 161,
               gust: 3.76,
            },
            visibility: 10000,
            pop: 0.86,
            rain: {
               "3h": 1.94,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-14 09:00:00",
         },
         {
            dt: 1663156800,
            main: {
               temp: 82.02,
               feels_like: 86.05,
               temp_min: 82.02,
               temp_max: 82.02,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1014,
               humidity: 68,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10d",
               },
            ],
            clouds: {
               all: 100,
            },
            wind: {
               speed: 4.76,
               deg: 81,
               gust: 5.97,
            },
            visibility: 10000,
            pop: 0.82,
            rain: {
               "3h": 0.2,
            },
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-14 12:00:00",
         },
         {
            dt: 1663167600,
            main: {
               temp: 85.3,
               feels_like: 92.25,
               temp_min: 85.3,
               temp_max: 85.3,
               pressure: 1015,
               sea_level: 1015,
               grnd_level: 1015,
               humidity: 67,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10d",
               },
            ],
            clouds: {
               all: 99,
            },
            wind: {
               speed: 7.99,
               deg: 105,
               gust: 9.15,
            },
            visibility: 10000,
            pop: 0.29,
            rain: {
               "3h": 0.11,
            },
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-14 15:00:00",
         },
         {
            dt: 1663178400,
            main: {
               temp: 86.81,
               feels_like: 93.92,
               temp_min: 86.81,
               temp_max: 86.81,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1014,
               humidity: 63,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10d",
               },
            ],
            clouds: {
               all: 97,
            },
            wind: {
               speed: 10.96,
               deg: 116,
               gust: 10.18,
            },
            visibility: 10000,
            pop: 0.7,
            rain: {
               "3h": 0.89,
            },
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-14 18:00:00",
         },
         {
            dt: 1663189200,
            main: {
               temp: 86.86,
               feels_like: 93.61,
               temp_min: 86.86,
               temp_max: 86.86,
               pressure: 1013,
               sea_level: 1013,
               grnd_level: 1013,
               humidity: 62,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10d",
               },
            ],
            clouds: {
               all: 21,
            },
            wind: {
               speed: 8.75,
               deg: 114,
               gust: 8.68,
            },
            visibility: 10000,
            pop: 0.68,
            rain: {
               "3h": 0.76,
            },
            sys: {
               pod: "d",
            },
            dt_txt: "2022-09-14 21:00:00",
         },
         {
            dt: 1663200000,
            main: {
               temp: 85.62,
               feels_like: 92.57,
               temp_min: 85.62,
               temp_max: 85.62,
               pressure: 1014,
               sea_level: 1014,
               grnd_level: 1014,
               humidity: 66,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 500,
                  main: "Rain",
                  description: "light rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 17,
            },
            wind: {
               speed: 11.39,
               deg: 93,
               gust: 12.3,
            },
            visibility: 10000,
            pop: 0.82,
            rain: {
               "3h": 0.16,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-15 00:00:00",
         },
         {
            dt: 1663210800,
            main: {
               temp: 84.34,
               feels_like: 89.91,
               temp_min: 84.34,
               temp_max: 84.34,
               pressure: 1016,
               sea_level: 1016,
               grnd_level: 1015,
               humidity: 66,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 501,
                  main: "Rain",
                  description: "moderate rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 71,
            },
            wind: {
               speed: 11.3,
               deg: 100,
               gust: 12.37,
            },
            visibility: 10000,
            pop: 1,
            rain: {
               "3h": 3.67,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-15 03:00:00",
         },
         {
            dt: 1663221600,
            main: {
               temp: 79.43,
               feels_like: 79.43,
               temp_min: 79.43,
               temp_max: 79.43,
               pressure: 1015,
               sea_level: 1015,
               grnd_level: 1015,
               humidity: 72,
               temp_kf: 0,
            },
            weather: [
               {
                  id: 501,
                  main: "Rain",
                  description: "moderate rain",
                  icon: "10n",
               },
            ],
            clouds: {
               all: 86,
            },
            wind: {
               speed: 11.99,
               deg: 96,
               gust: 14.47,
            },
            visibility: 10000,
            pop: 1,
            rain: {
               "3h": 4.23,
            },
            sys: {
               pod: "n",
            },
            dt_txt: "2022-09-15 06:00:00",
         },
      ],
      city: {
         id: 4164138,
         name: "Miami",
         coord: {
            lat: 25.7743,
            lon: -80.1937,
         },
         country: "US",
         population: 399457,
         timezone: -14400,
         sunrise: 1662807886,
         sunset: 1662852664,
      },
   },
   status: "idle",
};

export const incrementAsync = createAsyncThunk(
   "forecast/fetchForecast",
   async (amount: number) => {
      const response = await fetchForecast(amount);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
   }
);

export const forecastSlice = createSlice({
   name: "forecast",
   initialState,
   reducers: {
      update: (state, action: PayloadAction<any>) => {
         state = action.payload;
      },
      reset: () => initialState,
   },
});

export const { update, reset } = forecastSlice.actions;

export const selectForecast = (state: RootState) => state.forecast.value;

export default forecastSlice.reducer;
