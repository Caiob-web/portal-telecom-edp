'use client'

import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-edp-green border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Carregando mapa...</p>
      </div>
    </div>
  ),
})

interface Municipality { id: number; name: string; state: string; latitude: number; longitude: number; population?: number }
interface Props { municipalities: Municipality[]; userMunicipality?: string; fullscreen?: boolean }

export default function MapComponent(props: Props) {
  return <LeafletMap {...props} />
}
