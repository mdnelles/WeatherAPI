import { NextRequest, NextResponse } from 'next/server'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const type = searchParams.get('type') || 'weather'

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat or lon parameters' }, { status: 400 })
  }

  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json({ error: 'OpenWeather API key not configured' }, { status: 500 })
  }

  try {
    let url: string

    if (type === 'forecast') {
      url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    }

    const response = await fetch(url, { next: { revalidate: 300 } })
    
    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}
