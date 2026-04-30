import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default sql

export async function query(text: string, params?: unknown[]) {
  try {
    const result = await sql(text, params)
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export interface User {
  id: number
  name: string
  email: string
  company_name: string
  cnpj?: string
  phone?: string
  role: string
  municipality?: string
  is_active: boolean
  created_at: string
}

export interface Notification {
  id: number
  title: string
  description?: string
  pdf_url?: string
  municipality?: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  status: 'pending' | 'acknowledged' | 'resolved'
  base44_id?: string
  created_at: string
  updated_at: string
  response_id?: number
  responded_by?: number
  observation?: string
  image_url?: string
  responded_at?: string
}

export interface Municipality {
  id: number
  name: string
  state: string
  latitude: number
  longitude: number
  population?: number
}

export interface NotificationResponse {
  id: number
  notification_id: number
  user_id: number
  observation: string
  image_url?: string
  image_filename?: string
  status: string
  responded_at: string
}
