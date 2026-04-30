import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import sql from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { name, email, company_name, cnpj, phone, municipality, password } = await req.json()

    if (!name || !email || !company_name || !password)
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos' }, { status: 400 })

    if (password.length < 8)
      return NextResponse.json({ error: 'A senha deve ter pelo menos 8 caracteres' }, { status: 400 })

    const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`
    if (existing.length > 0)
      return NextResponse.json({ error: 'Este e-mail já está cadastrado' }, { status: 409 })

    const passwordHash = await bcrypt.hash(password, 12)
    const newUser = await sql`
      INSERT INTO users (name, email, company_name, cnpj, phone, municipality, password_hash, role)
      VALUES (${name}, ${email}, ${company_name}, ${cnpj || null}, ${phone || null}, ${municipality || null}, ${passwordHash}, 'telecom')
      RETURNING id, name, email, company_name, created_at
    `
    return NextResponse.json({ success: true, user: newUser[0] }, { status: 201 })
  } catch (error: any) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
