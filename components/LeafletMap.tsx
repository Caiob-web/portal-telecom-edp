'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'

interface Municipality { id: number; name: string; state: string; latitude: number; longitude: number; population?: number }
interface Props { municipalities: Municipality[]; userMunicipality?: string; fullscreen?: boolean }

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const createIcon = (color: string, size = 12) =>
  L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })

export default function LeafletMap({ municipalities, userMunicipality }: Props) {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, { center: [-23.05, -45.5], zoom: 9, zoomControl: true })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map)

    L.rectangle([[-22.4, -46.3], [-23.7, -44.1]], {
      color: '#00A651', weight: 2, opacity: 0.4, fillOpacity: 0.05, dashArray: '6, 4',
    }).addTo(map)

    municipalities.forEach(mun => {
      const isUser = mun.name === userMunicipality
      const icon = createIcon(isUser ? '#00A651' : '#6B7280', isUser ? 16 : 10)
      const marker = L.marker([mun.latitude, mun.longitude], { icon }).addTo(map)

      marker.bindPopup(`
        <div style="font-family:system-ui;padding:4px;min-width:160px;">
          <div style="font-weight:700;color:#1a1a1a;font-size:14px;margin-bottom:4px;">${mun.name}</div>
          <div style="color:#6b7280;font-size:12px;">Estado: ${mun.state}</div>
          ${mun.population ? `<div style="color:#6b7280;font-size:12px;">Pop: ~${mun.population.toLocaleString('pt-BR')}</div>` : ''}
          ${isUser ? '<div style="margin-top:6px;background:#00A651;color:white;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;display:inline-block;">Seu município</div>' : ''}
        </div>
      `, { maxWidth: 200 })

      marker.bindTooltip(mun.name, { permanent: false, direction: 'top', offset: [0, -8] })
    })

    if (municipalities.length > 0) {
      const latlngs = municipalities.map(m => [m.latitude, m.longitude] as [number, number])
      map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] })
    }

    const legend = L.control({ position: 'bottomright' })
    legend.onAdd = () => {
      const div = L.DomUtil.create('div')
      div.style.cssText = 'background:white;padding:10px 14px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.15);font-family:system-ui;font-size:12px;'
      div.innerHTML = `
        <div style="font-weight:700;margin-bottom:8px;color:#1a1a1a;">Legenda</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <div style="width:14px;height:14px;background:#00A651;border:2px solid white;border-radius:50%;"></div>
          <span style="color:#374151;">Seu município</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <div style="width:10px;height:10px;background:#6B7280;border:2px solid white;border-radius:50%;"></div>
          <span style="color:#374151;">Outros municípios</span>
        </div>
      `
      return div
    }
    legend.addTo(map)

    return () => { map.remove(); mapRef.current = null }
  }, [municipalities, userMunicipality])

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
}
