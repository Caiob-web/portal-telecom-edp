'use client'

import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import Link from 'next/link'

export default function NotificationBell({ userId }: { userId?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch('/api/notifications')
        if (res.ok) {
          const data = await res.json()
          setCount(data.notifications?.filter((n: any) => !n.response_id)?.length || 0)
        }
      } catch {}
    }
    fetch_()
    const interval = setInterval(fetch_, 2 * 60 * 1000)
    return () => clearInterval(interval)
  }, [userId])

  return (
    <Link href="/dashboard/notifications" className="relative">
      <Bell className="w-5 h-5 text-gray-600" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center notif-pulse">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}
