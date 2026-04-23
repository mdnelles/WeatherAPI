'use client'

import { WeatherIcon } from './weather-icon'
import type { DailyForecast } from '@/lib/weather-types'
import { Skeleton } from '@/components/ui/skeleton'

interface ForecastProps {
  forecast: DailyForecast[]
  isLoading: boolean
}

export function Forecast({ forecast, isLoading }: ForecastProps) {
  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-4">
        <h3 className="text-sm font-medium text-white/70 mb-4">5-Day Forecast</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-14 bg-white/10 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (!forecast.length) {
    return (
      <div className="glass rounded-2xl p-4">
        <h3 className="text-sm font-medium text-white/70 mb-4">5-Day Forecast</h3>
        <p className="text-white/50 text-sm text-center py-4">No forecast data available</p>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="text-sm font-medium text-white/70 mb-4">5-Day Forecast</h3>
      <div className="space-y-2">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="glass-light rounded-xl p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <WeatherIcon icon={day.icon} size={32} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {index === 0 ? 'Today' : day.dayName}
                </p>
                <p className="text-xs text-white/50 capitalize truncate">
                  {day.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-sm font-medium text-white">
                {Math.round(day.temp_max)}°
              </span>
              <span className="text-sm text-white/50">
                {Math.round(day.temp_min)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
