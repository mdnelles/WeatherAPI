'use client'

import { useEffect, useState, useMemo } from 'react'
import type { WeatherData } from '@/lib/weather-types'

interface AnimatedBackgroundProps {
  weather: WeatherData | null
}

type TimeOfDay = 'night' | 'dawn' | 'day' | 'dusk'
type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'snow' | 'storm' | 'mist'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  delay: number
}

function getTimeOfDay(weather: WeatherData | null): TimeOfDay {
  if (!weather) return 'day'
  
  const now = weather.dt + weather.timezone
  const sunrise = weather.sys.sunrise + weather.timezone
  const sunset = weather.sys.sunset + weather.timezone
  
  const dawnStart = sunrise - 3600
  const dawnEnd = sunrise + 3600
  const duskStart = sunset - 3600
  const duskEnd = sunset + 3600
  
  if (now >= dawnStart && now < dawnEnd) return 'dawn'
  if (now >= duskStart && now < duskEnd) return 'dusk'
  if (now >= dawnEnd && now < duskStart) return 'day'
  return 'night'
}

function getWeatherCondition(weather: WeatherData | null): WeatherCondition {
  if (!weather?.weather?.[0]) return 'clear'
  
  const main = weather.weather[0].main.toLowerCase()
  const id = weather.weather[0].id
  
  if (id >= 200 && id < 300) return 'storm'
  if (id >= 300 && id < 600) return 'rain'
  if (id >= 600 && id < 700) return 'snow'
  if (id >= 700 && id < 800) return 'mist'
  if (id === 800) return 'clear'
  if (id > 800) return 'clouds'
  
  return 'clear'
}

const gradients: Record<TimeOfDay, Record<WeatherCondition, string>> = {
  night: {
    clear: 'from-slate-900 via-indigo-950 to-slate-900',
    clouds: 'from-slate-800 via-slate-900 to-slate-800',
    rain: 'from-slate-800 via-slate-900 to-slate-950',
    snow: 'from-slate-700 via-slate-800 to-indigo-900',
    storm: 'from-slate-900 via-slate-950 to-slate-900',
    mist: 'from-slate-700 via-slate-800 to-slate-700',
  },
  dawn: {
    clear: 'from-indigo-900 via-rose-800 to-amber-700',
    clouds: 'from-slate-700 via-rose-900 to-slate-800',
    rain: 'from-slate-700 via-slate-800 to-slate-700',
    snow: 'from-slate-600 via-rose-200/20 to-slate-700',
    storm: 'from-slate-800 via-slate-900 to-slate-800',
    mist: 'from-slate-600 via-rose-300/10 to-slate-700',
  },
  day: {
    clear: 'from-sky-400 via-blue-500 to-cyan-600',
    clouds: 'from-slate-400 via-slate-500 to-slate-600',
    rain: 'from-slate-500 via-slate-600 to-slate-700',
    snow: 'from-slate-300 via-blue-200 to-slate-400',
    storm: 'from-slate-600 via-slate-700 to-slate-800',
    mist: 'from-slate-400 via-slate-500 to-slate-500',
  },
  dusk: {
    clear: 'from-blue-600 via-orange-500 to-rose-600',
    clouds: 'from-slate-600 via-rose-700/50 to-slate-700',
    rain: 'from-slate-600 via-slate-700 to-slate-800',
    snow: 'from-slate-500 via-rose-300/20 to-slate-600',
    storm: 'from-slate-700 via-slate-800 to-slate-900',
    mist: 'from-slate-500 via-rose-400/10 to-slate-600',
  },
}

export function AnimatedBackground({ weather }: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [stars, setStars] = useState<Particle[]>([])
  
  const timeOfDay = useMemo(() => getTimeOfDay(weather), [weather])
  const condition = useMemo(() => getWeatherCondition(weather), [weather])
  const gradient = gradients[timeOfDay][condition]
  
  const showStars = timeOfDay === 'night' || timeOfDay === 'dawn' || timeOfDay === 'dusk'
  const showSun = timeOfDay === 'day' && (condition === 'clear' || condition === 'clouds')
  const showMoon = timeOfDay === 'night' && condition === 'clear'
  const showRain = condition === 'rain' || condition === 'storm'
  const showSnow = condition === 'snow'
  const showClouds = condition === 'clouds' || condition === 'rain' || condition === 'storm' || condition === 'mist'
  
  useEffect(() => {
    // Generate rain/snow particles
    if (showRain || showSnow) {
      const count = showSnow ? 80 : 120
      const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: showSnow ? Math.random() * 4 + 2 : Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        speed: showSnow ? Math.random() * 8 + 6 : Math.random() * 0.8 + 0.4,
        delay: Math.random() * 2,
      }))
      setParticles(generated)
    } else {
      setParticles([])
    }
  }, [showRain, showSnow])
  
  useEffect(() => {
    // Generate stars for night/dusk/dawn
    if (showStars) {
      const starOpacity = timeOfDay === 'night' ? 0.8 : 0.4
      const generated: Particle[] = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * starOpacity,
        speed: 0,
        delay: Math.random() * 3,
      }))
      setStars(generated)
    } else {
      setStars([])
    }
  }, [showStars, timeOfDay])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-1000">
      {/* Gradient base */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} transition-all duration-1000`} />

      {/* Stars */}
      {showStars && stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: '2s',
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Sun */}
      {showSun && (
        <div className="absolute top-16 right-1/4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-yellow-300 shadow-[0_0_60px_20px_rgba(253,224,71,0.4)]" />
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-yellow-200 animate-pulse opacity-50" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      )}

      {/* Moon */}
      {showMoon && (
        <div className="absolute top-20 right-1/4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-slate-200 shadow-[0_0_40px_10px_rgba(226,232,240,0.3)]" />
            <div className="absolute top-2 right-3 w-4 h-4 rounded-full bg-slate-300/50" />
            <div className="absolute top-8 right-6 w-3 h-3 rounded-full bg-slate-300/40" />
            <div className="absolute top-5 left-4 w-2 h-2 rounded-full bg-slate-300/30" />
          </div>
        </div>
      )}

      {/* Clouds */}
      {showClouds && (
        <>
          <div className="absolute top-[10%] left-[5%] animate-[drift_80s_linear_infinite]" style={{ opacity: condition === 'mist' ? 0.4 : 0.6 }}>
            <CloudShape scale={1.2} />
          </div>
          <div className="absolute top-[15%] left-[30%] animate-[drift_100s_linear_infinite]" style={{ animationDelay: '-20s', opacity: condition === 'mist' ? 0.3 : 0.5 }}>
            <CloudShape scale={1} />
          </div>
          <div className="absolute top-[8%] left-[60%] animate-[drift_70s_linear_infinite]" style={{ animationDelay: '-40s', opacity: condition === 'mist' ? 0.35 : 0.55 }}>
            <CloudShape scale={0.8} />
          </div>
          <div className="absolute top-[20%] left-[80%] animate-[drift_90s_linear_infinite]" style={{ animationDelay: '-10s', opacity: condition === 'mist' ? 0.25 : 0.45 }}>
            <CloudShape scale={1.1} />
          </div>
        </>
      )}

      {/* Rain */}
      {showRain && particles.map((drop) => (
        <div
          key={`rain-${drop.id}`}
          className="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-300/60 to-blue-400/80 rounded-full"
          style={{
            left: `${drop.x}%`,
            top: `-5%`,
            height: `${drop.size * 10}px`,
            opacity: drop.opacity,
            animation: `fall ${drop.speed}s linear infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}

      {/* Snow */}
      {showSnow && particles.map((flake) => (
        <div
          key={`snow-${flake.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.x}%`,
            top: `-5%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.speed}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}

      {/* Lightning flash for storms */}
      {condition === 'storm' && (
        <div 
          className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" 
          style={{ 
            animationDuration: '0.1s',
            animationIterationCount: 1,
            animationDelay: '5s',
          }} 
        />
      )}

      {/* Ambient glow based on conditions */}
      <div className="absolute inset-0">
        {timeOfDay === 'day' && condition === 'clear' && (
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-yellow-300/20 to-transparent blur-3xl" />
        )}
        {timeOfDay === 'dawn' && (
          <div className="absolute bottom-1/3 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-400/20 via-rose-400/10 to-transparent blur-2xl" />
        )}
        {timeOfDay === 'dusk' && (
          <div className="absolute bottom-1/4 left-0 right-0 h-1/3 bg-gradient-to-t from-orange-500/25 via-rose-500/15 to-transparent blur-2xl" />
        )}
        {timeOfDay === 'night' && condition === 'clear' && (
          <>
            <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute top-10 right-1/4 w-1/3 h-1/4 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
          </>
        )}
      </div>

      {/* Mist overlay */}
      {condition === 'mist' && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-400/30 via-slate-500/20 to-slate-400/30 animate-pulse" style={{ animationDuration: '4s' }} />
      )}

      {/* Bottom fade for content readability */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  )
}

function CloudShape({ scale = 1 }: { scale?: number }) {
  return (
    <svg 
      width={200 * scale} 
      height={100 * scale} 
      viewBox="0 0 200 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="60" cy="60" rx="40" ry="30" fill="currentColor" className="text-white/40" />
      <ellipse cx="100" cy="50" rx="50" ry="35" fill="currentColor" className="text-white/50" />
      <ellipse cx="150" cy="60" rx="35" ry="25" fill="currentColor" className="text-white/40" />
      <ellipse cx="80" cy="45" rx="30" ry="22" fill="currentColor" className="text-white/55" />
      <ellipse cx="130" cy="48" rx="35" ry="28" fill="currentColor" className="text-white/55" />
    </svg>
  )
}
