'use client'

import { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, Thermometer, Wind, Droplets, CloudSun } from 'lucide-react'

interface WeatherData {
  temp: number; feels_like: number; description: string
  icon: string; humidity: number; wind: number; city: string
}

interface Props { userName: string; companyName: string; municipality?: string }

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return { text: 'Bom dia', emoji: '☀️', sub: 'Que seu dia seja produtivo!' }
  if (hour >= 12 && hour < 18) return { text: 'Boa tarde', emoji: '🌤️', sub: 'Continue com ótimo trabalho!' }
  return { text: 'Boa noite', emoji: '🌙', sub: 'Obrigado pelo seu trabalho hoje!' }
}

function getWeatherIcon(description: string) {
  const d = description.toLowerCase()
  if (d.includes('chuva') || d.includes('rain')) return CloudRain
  if (d.includes('parcial') || d.includes('partly')) return CloudSun
  if (d.includes('nublado') || d.includes('cloud')) return Cloud
  return Sun
}

export default function WeatherGreeting({ userName, companyName, municipality }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const greeting = getGreeting()
  const firstName = userName.split(' ')[0]

  useEffect(() => {
    fetch(`/api/weather?city=${encodeURIComponent(municipality || 'São José dos Campos')}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setWeather(data) })
      .finally(() => setLoading(false))
  }, [municipality])

  const WeatherIcon = weather ? getWeatherIcon(weather.description) : Sun

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-edp-green rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-edp-light rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{greeting.emoji}</span>
            <span className="text-white/60 text-sm font-medium uppercase tracking-widest">{greeting.text}</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-white">{firstName}!</h2>
          <p className="text-white/50 text-sm mt-1">{greeting.sub}</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-edp-green rounded-full animate-pulse" />
            <span className="text-white/70 text-sm font-medium">{companyName}</span>
          </div>
        </div>

        {!loading && weather && (
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{weather.city}</p>
              <div className="flex items-center justify-end gap-2">
                <WeatherIcon className="w-8 h-8 text-edp-light" />
                <span className="font-display font-bold text-4xl text-white">{weather.temp}°</span>
              </div>
              <p className="text-white/50 text-xs mt-1 capitalize">{weather.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Thermometer className="w-4 h-4 text-edp-light" />
                <span>Sensação {weather.feels_like}°</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Droplets className="w-4 h-4 text-edp-light" />
                <span>Umidade {weather.humidity}%</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Wind className="w-4 h-4 text-edp-light" />
                <span>Vento {weather.wind} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative border-t border-white/10 px-6 py-3 flex items-center justify-between">
        <p className="text-white/40 text-xs">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-edp-green rounded-full" />
          <span className="text-white/40 text-xs">Sistema online</span>
        </div>
      </div>
    </div>
  )
}
