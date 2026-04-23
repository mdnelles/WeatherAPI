export interface City {
  name: string
  country: string
  lat: number
  lon: number
  timezone: string
}

export const popularCities: City[] = [
  { name: 'New York', country: 'US', lat: 40.7128, lon: -74.006, timezone: 'America/New_York' },
  { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
  { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522, timezone: 'Europe/Paris' },
  { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' },
  { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708, timezone: 'Asia/Dubai' },
  { name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore' },
  { name: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437, timezone: 'America/Los_Angeles' },
  { name: 'Mumbai', country: 'IN', lat: 19.076, lon: 72.8777, timezone: 'Asia/Kolkata' },
  { name: 'Rio de Janeiro', country: 'BR', lat: -22.9068, lon: -43.1729, timezone: 'America/Sao_Paulo' },
]
