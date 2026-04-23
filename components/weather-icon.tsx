'use client'

import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  Moon,
  CloudMoon,
  CloudSun,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface WeatherIconProps {
  icon: string
  className?: string
  size?: number
}

export function WeatherIcon({ icon, className, size = 48 }: WeatherIconProps) {
  const isNight = icon.endsWith('n')
  
  const iconMap: Record<string, React.ElementType> = {
    '01d': Sun,
    '01n': Moon,
    '02d': CloudSun,
    '02n': CloudMoon,
    '03d': Cloud,
    '03n': Cloud,
    '04d': Cloud,
    '04n': Cloud,
    '09d': CloudDrizzle,
    '09n': CloudDrizzle,
    '10d': CloudRain,
    '10n': CloudRain,
    '11d': CloudLightning,
    '11n': CloudLightning,
    '13d': CloudSnow,
    '13n': CloudSnow,
    '50d': CloudFog,
    '50n': CloudFog,
  }

  const colorMap: Record<string, string> = {
    '01d': 'text-yellow-400',
    '01n': 'text-slate-300',
    '02d': 'text-yellow-300',
    '02n': 'text-slate-400',
    '03d': 'text-slate-400',
    '03n': 'text-slate-500',
    '04d': 'text-slate-500',
    '04n': 'text-slate-600',
    '09d': 'text-blue-400',
    '09n': 'text-blue-500',
    '10d': 'text-blue-400',
    '10n': 'text-blue-500',
    '11d': 'text-yellow-500',
    '11n': 'text-yellow-600',
    '13d': 'text-cyan-300',
    '13n': 'text-cyan-400',
    '50d': 'text-slate-400',
    '50n': 'text-slate-500',
  }

  const Icon = iconMap[icon] || Cloud
  const color = colorMap[icon] || 'text-slate-400'

  return (
    <Icon 
      size={size} 
      className={cn('weather-icon', color, className)} 
      strokeWidth={1.5}
    />
  )
}
