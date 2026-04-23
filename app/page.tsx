'use client'

import { useState, useCallback } from 'react'
import useSWR from 'swr'
import { CurrentWeather } from '@/components/current-weather'
import { CitySelector } from '@/components/city-selector'
import { Forecast } from '@/components/forecast'
import { CitySearch } from '@/components/city-search'
import { AnimatedBackground } from '@/components/animated-background'
import { popularCities, type City } from '@/lib/cities'
import type { WeatherData, ForecastData, DailyForecast } from '@/lib/weather-types'
import { Cloud } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function processForecast(data: ForecastData | null): DailyForecast[] {
  if (!data?.list) return []

  const dailyMap = new Map<string, DailyForecast>()

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const dateKey = date.toISOString().split('T')[0]

    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, {
        date: dateKey,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        icon: item.weather[0]?.icon || '01d',
        description: item.weather[0]?.description || '',
      })
    } else {
      const existing = dailyMap.get(dateKey)!
      existing.temp_max = Math.max(existing.temp_max, item.main.temp_max)
      existing.temp_min = Math.min(existing.temp_min, item.main.temp_min)
    }
  })

  return Array.from(dailyMap.values()).slice(0, 5)
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>(popularCities[0])

  const { data: weather, isLoading: weatherLoading } = useSWR<WeatherData>(
    `/api/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}`,
    fetcher,
    { refreshInterval: 300000 }
  )

  const { data: forecastData, isLoading: forecastLoading } = useSWR<ForecastData>(
    `/api/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&type=forecast`,
    fetcher,
    { refreshInterval: 300000 }
  )

  const forecast = processForecast(forecastData ?? null)

  const handleCitySelect = useCallback((city: City) => {
    setSelectedCity(city)
  }, [])

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground weather={weather ?? null} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="glass rounded-xl p-2.5">
              <Cloud className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-2xl font-semibold text-white">
              Open Weather
            </h1>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[320px]">
            <CitySearch onSelectCity={handleCitySelect} />
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather - Takes 2 columns on large screens */}
          <div 
            key={`weather-${selectedCity.name}`}
            className="lg:col-span-2 animate-fade-slide-in"
          >
            <CurrentWeather
              weather={weather ?? null}
              isLoading={weatherLoading}
              cityName={selectedCity.name}
            />
          </div>

          {/* Forecast - Takes 1 column on large screens */}
          <div 
            key={`forecast-${selectedCity.name}`}
            className="lg:col-span-1 animate-fade-slide-in"
            style={{ animationDelay: '0.1s' }}
          >
            <Forecast forecast={forecast} isLoading={forecastLoading} />
          </div>
        </div>

        {/* Popular Cities Section */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-white/80 mb-4">Popular Cities</h2>
          <CitySelector
            selectedCity={selectedCity}
            onSelectCity={handleCitySelect}
          />
        </div>
      </div>
    </main>
  )
}
