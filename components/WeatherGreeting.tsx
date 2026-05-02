'use client'

import { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, Thermometer, Wind, Droplets, CloudSun } from 'lucide-react'

interface WeatherData { temp: number; feels_like: number; description: string; icon: string; humidity: number; wind: number; city: string }
interface Props { userName: string; companyName: string; municipality?: string }

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5  && h < 12) return { text: 'Bom dia',    emoji: '☀️', sub: 'Que seu dia seja produtivo!' }
  if (h >= 12 && h < 18) return { text: 'Boa tarde',  emoji: '🌤️', sub: 'Continue com ótimo trabalho!' }
  return                         { text: 'Boa noite',  emoji: '🌙', sub: 'Obrigado pelo trabalho hoje!' }
}

function getWeatherIcon(desc: string) {
  const d = desc.toLowerCase()
  if (d.includes('chuva') || d.includes('rain'))   return CloudRain
  if (d.includes('parcial') || d.includes('partly')) return CloudSun
  if (d.includes('nublado') || d.includes('cloud')) return Cloud
  return Sun
}

export default function WeatherGreeting({ userName, companyName, municipality }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const greeting  = getGreeting()
  const firstName = userName.split(' ')[0]

  useEffect(() => {
    fetch(`/api/weather?city=${encodeURIComponent(municipality || 'São José dos Campos')}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setWeather(d) })
  }, [municipality])

  const WeatherIcon = weather ? getWeatherIcon(weather.description) : Sun

  return (
    <div className="relative overflow-hidden rounded-2xl bg-edp-card border border-white/5">
      {/* Background foto do poste */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('/poste.jpg')" }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-edp-card via-edp-card/90 to-transparent" />
      {/* Green glow */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-edp-green/10 rounded-full blur-2xl" />

      <div className="relative p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{greeting.emoji}</span>
            <span className="text-white/40 text-xs font-medium uppercase tracking-widest">{greeting.text}</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-white">{firstName}!</h2>
          <p className="text-white/30 text-sm mt-0.5">{greeting.sub}</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-edp-green rounded-full animate-pulse" />
            <span className="text-white/60 text-sm font-medium">{companyName}</span>
          </div>
        </div>

        {weather && (
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-white/30 text-xs uppercase tracking-wider mb-1">{weather.city}</p>
              <div className="flex items-center justify-end gap-2">
                <WeatherIcon className="w-7 h-7 text-edp-green" />
                <span className="font-display font-bold text-4xl text-white">{weather.temp}°</span>
              </div>
              <p className="text-white/30 text-xs mt-0.5 capitalize">{weather.description}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-white/40 text-xs"><Thermometer className="w-3.5 h-3.5 text-edp-green"/>Sensação {weather.feels_like}°</div>
              <div className="flex items-center gap-2 text-white/40 text-xs"><Droplets   className="w-3.5 h-3.5 text-edp-green"/>Umidade {weather.humidity}%</div>
              <div className="flex items-center gap-2 text-white/40 text-xs"><Wind       className="w-3.5 h-3.5 text-edp-green"/>Vento {weather.wind} m/s</div>
            </div>
          </div>
        )}
      </div>

      <div className="relative border-t border-white/5 px-6 py-3 flex items-center justify-between">
        <p className="text-white/20 text-xs">
          {new Date().toLocaleDateString('pt-BR',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
        </p>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-edp-green rounded-full animate-pulse" />
          <span className="text-white/20 text-xs">Sistema online</span>
        </div>
      </div>
    </div>
  )
}
