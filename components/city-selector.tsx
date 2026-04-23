'use client'

import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { popularCities, type City } from '@/lib/cities'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface CitySelectorProps {
  selectedCity: City
  onSelectCity: (city: City) => void
}

export function CitySelector({ selectedCity, onSelectCity }: CitySelectorProps) {
  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Popular Cities
      </h3>
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {popularCities.map((city) => (
            <button
              key={city.name}
              onClick={() => onSelectCity(city)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                selectedCity.name === city.name
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
              )}
            >
              {city.name}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  )
}
