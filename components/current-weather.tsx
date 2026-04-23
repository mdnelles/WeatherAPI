'use client'

import { Droplets, Wind, Eye, Thermometer } from 'lucide-react'
import { WeatherIcon } from './weather-icon'
import type { WeatherData } from '@/lib/weather-types'
import { Skeleton } from '@/components/ui/skeleton'

interface CurrentWeatherProps {
  weather: WeatherData | null
  isLoading: boolean
  cityName: string
}

export function CurrentWeather({ weather, isLoading, cityName }: CurrentWeatherProps) {
  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-40 bg-white/10" />
            <Skeleton className="h-16 w-32 bg-white/10" />
            <Skeleton className="h-5 w-24 bg-white/10" />
          </div>
          <Skeleton className="h-20 w-20 rounded-full bg-white/10" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-12 bg-white/10 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="glass rounded-2xl p-6">
        <p className="text-white/60 text-center">Unable to load weather data</p>
      </div>
    )
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{cityName}</h2>
          <p className="text-6xl font-light text-white mt-2">
            {Math.round(weather.main.temp)}°
          </p>
          <p className="text-white/70 capitalize mt-1">
            {weather.weather[0]?.description}
          </p>
          <p className="text-sm text-white/50 mt-2">
            Feels like {Math.round(weather.main.feels_like)}°
          </p>
        </div>
        <WeatherIcon icon={weather.weather[0]?.icon || '01d'} size={80} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="glass-light rounded-xl p-3 flex items-center gap-3">
          <Droplets className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-xs text-white/50">Humidity</p>
            <p className="text-sm font-medium text-white">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="glass-light rounded-xl p-3 flex items-center gap-3">
          <Wind className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-xs text-white/50">Wind</p>
            <p className="text-sm font-medium text-white">{Math.round(weather.wind.speed)} m/s</p>
          </div>
        </div>

        <div className="glass-light rounded-xl p-3 flex items-center gap-3">
          <Eye className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-xs text-white/50">Visibility</p>
            <p className="text-sm font-medium text-white">{(weather.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        <div className="glass-light rounded-xl p-3 flex items-center gap-3">
          <Thermometer className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-xs text-white/50">Pressure</p>
            <p className="text-sm font-medium text-white">{weather.main.pressure} hPa</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-white/50">
        <span>Sunrise: {formatTime(weather.sys.sunrise)}</span>
        <span>Sunset: {formatTime(weather.sys.sunset)}</span>
      </div>
    </div>
  )
}
