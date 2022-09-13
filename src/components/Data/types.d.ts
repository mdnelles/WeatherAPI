export interface ForecastObj {
   highArr: number[];
   lowArr: number[];
   dayArr: string[];
   iconArr: string[];
}
export type ForecastArr = undefined | ForecastObj[];
