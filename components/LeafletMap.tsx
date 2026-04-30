'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'

interface Municipality {
  id: number
  name: string
  state: string
  latitude: number
  longitude: number
  population?: number
}

interface Props {
  municipalities: Municipality[]
  userMunicipality?: string
  fullscreen?: boolean
}

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
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

    const map = L.map(containerRef.current, {
      center: [-23.05, -45.5],
      zoom: 9,
      zoomControl: true,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map)

    L.rectangle(
      [[-22.4, -46.3], [-23.7, -44.1]] as L.LatLngBoundsLiteral,
      { color: '#00A651', weight: 2, opacity: 0.4, fillOpacity: 0.05, dashArray: '6, 4' }
    ).addTo(map)

    municipalities.forEach(mun => {
      const isUser = mun.name === userMunicipality
      const icon = createIcon(isUser ? '#00A651' : '#6B7280', isUser ? 16 : 10)
      const marker = L.marker([mun.latitude, mun.longitude] as L.LatLngTuple, { icon }).addTo(map)

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
      const latlngs = municipalities.map(m => [m.latitude, m.longitude] as L.LatLngTuple)
      map.fitBounds(L.latLngBounds(latlngs), { padding: [40, 40] })
    }

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [municipalities, userMunicipality])

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
      <div style={{
        position: 'absolute',
        bottom: '24px',
        right: '10px',
        zIndex: 1000,
        background: 'white',
        padding: '10px 14px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        fontFamily: 'system-ui',
        fontSize: '12px',
        pointerEvents: 'none',
      }}>
        <div style={{ fontWeight: 700, marginBottom: '8px', color: '#1a1a1a' }}>Legenda</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: 14, height: 14, background: '#00A651', border: '2px solid white', borderRadius: '50%' }} />
          <span style={{ color: '#374151' }}>Seu município</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 10, height: 10, background: '#6B7280', border: '2px solid white', borderRadius: '50%' }} />
          <span style={{ color: '#374151' }}>Outros municípios</span>
        </div>
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e5e7eb', color: '#9ca3af', fontSize: '11px' }}>
          Área de Concessão EDP
        </div>
      </div>
    </div>
  )
}
