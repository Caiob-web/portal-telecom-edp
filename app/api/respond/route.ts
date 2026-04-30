import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import sql from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const formData = await req.formData()
    const notificationId = formData.get('notification_id') as string
    const observation    = formData.get('observation') as string
    const imageFile      = formData.get('image') as File | null

    if (!notificationId || !observation)
      return NextResponse.json({ error: 'ID da notificação e observação são obrigatórios' }, { status: 400 })

    const userId = parseInt(session.user.id)
    const existing = await sql`
      SELECT id FROM notification_responses WHERE notification_id = ${parseInt(notificationId)} AND user_id = ${userId} LIMIT 1
    `
    if (existing.length > 0)
      return NextResponse.json({ error: 'Você já respondeu esta notificação' }, { status: 409 })

    let imageUrl: string | null = null
    let imageFilename: string | null = null

    if (imageFile && imageFile.size > 0) {
      const blobToken = process.env.BLOB_READ_WRITE_TOKEN
      if (blobToken) {
        try {
          const filename = `responses/${userId}/${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`
          const bytes  = await imageFile.arrayBuffer()
          const buffer = Buffer.from(bytes)
          const uploadResponse = await fetch(`https://blob.vercel-storage.com/${filename}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${blobToken}`, 'Content-Type': imageFile.type },
            body: buffer,
          })
          if (uploadResponse.ok) {
            const blobData = await uploadResponse.json()
            imageUrl = blobData.url
            imageFilename = imageFile.name
          }
        } catch (uploadError) {
          console.error('Image upload error:', uploadError)
        }
      } else {
        imageFilename = imageFile.name
        console.warn('BLOB_READ_WRITE_TOKEN não configurado')
      }
    }

    const response = await sql`
      INSERT INTO notification_responses (notification_id, user_id, observation, image_url, image_filename, status)
      VALUES (${parseInt(notificationId)}, ${userId}, ${observation}, ${imageUrl}, ${imageFilename}, 'acknowledged')
      RETURNING *
    `
    await sql`UPDATE notifications SET status = 'acknowledged', updated_at = NOW() WHERE id = ${parseInt(notificationId)}`

    return NextResponse.json({ success: true, response: response[0] })
  } catch (error: any) {
    console.error('Response error:', error)
    return NextResponse.json({ error: 'Erro ao salvar resposta' }, { status: 500 })
  }
}
