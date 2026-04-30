import { NextRequest, NextResponse } from 'next/server'

const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  'São José dos Campos': { lat: -23.1794, lon: -45.8869 },
  'Taubaté':             { lat: -23.0262, lon: -45.5558 },
  'Jacareí':             { lat: -23.2983, lon: -45.9658 },
  'Guaratinguetá':       { lat: -22.8161, lon: -45.1947 },
  'default':             { lat: -23.1794, lon: -45.8869 },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const city   = searchParams.get('city') || 'São José dos Campos'
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ temp: 22, feels_like: 21, description: 'Parcialmente nublado', icon: '02d', humidity: 65, wind: 3.2, city })
  }

  try {
    const coords = CITY_COORDS[city] || CITY_COORDS['default']
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=pt_br&appid=${apiKey}`
    const response = await fetch(url, { next: { revalidate: 1800 } })
    if (!response.ok) throw new Error('Weather API error')
    const data = await response.json()
    return NextResponse.json({
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      city: data.name,
    })
  } catch {
    return NextResponse.json({ temp: 22, feels_like: 21, description: 'Parcialmente nublado', icon: '02d', humidity: 65, wind: 3.2, city })
  }
}
