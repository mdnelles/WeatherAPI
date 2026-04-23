export interface WeatherData {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust?: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  name: string
}

export interface ForecastData {
  list: {
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      humidity: number
    }
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }[]
    wind: {
      speed: number
      deg: number
    }
    dt_txt: string
  }[]
  city: {
    name: string
    country: string
    timezone: number
  }
}

export interface DailyForecast {
  date: string
  dayName: string
  temp_max: number
  temp_min: number
  icon: string
  description: string
}
