import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'
import MapComponent from '@/components/MapComponent'

export default async function MapPage() {
  const session = await getServerSession(authOptions)
  const municipalities = await sql`SELECT * FROM municipalities WHERE is_active = true ORDER BY name`

  return (
    <div className="p-4 lg:p-6 space-y-4 animate-fade-in">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-800">Mapa da Região</h1>
        <p className="text-gray-500">28 municípios da área de concessão EDP — Vale do Paraíba</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <MapComponent municipalities={municipalities as any} userMunicipality={session?.user?.municipality} fullscreen />
      </div>
    </div>
  )
}
