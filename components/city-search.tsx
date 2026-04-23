'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { City } from '@/lib/cities'

interface GeocodingResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

interface CitySearchProps {
  onSelectCity: (city: City) => void
}

export function CitySearch({ onSelectCity }: CitySearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeocodingResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchCities = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setResults(data)
          setIsOpen(true)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(searchCities, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleSelect = (result: GeocodingResult) => {
    onSelectCity({
      name: result.name,
      country: result.country,
      lat: result.lat,
      lon: result.lon,
      timezone: '',
    })
    setQuery('')
    setResults([])
    setIsOpen(false)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="glass rounded-xl overflow-hidden">
        <div className="flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-white/50 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            placeholder="Search for a city..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 px-3 text-sm"
          />
          {isLoading && <Loader2 className="w-4 h-4 text-white/50 animate-spin" />}
          {query && !isLoading && (
            <button onClick={handleClear} className="text-white/50 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-50">
          <ul className="py-2">
            {results.map((result, index) => (
              <li key={`${result.name}-${result.lat}-${result.lon}`}>
                <button
                  onClick={() => handleSelect(result)}
                  className={cn(
                    'w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors',
                    'flex items-center justify-between'
                  )}
                >
                  <span className="font-medium">{result.name}</span>
                  <span className="text-white/50 text-xs">
                    {result.state ? `${result.state}, ` : ''}{result.country}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
