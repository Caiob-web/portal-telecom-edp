import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import sql from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const companyName =
      body.companyName ||
      body.company_name ||
      body.razao_social ||
      ''

    const name =
      body.responsibleName ||
      body.name ||
      ''

    const email = String(body.email || '').trim().toLowerCase()
    const password = String(body.password || '')
    const cnpj = String(body.cnpj || '').trim()
    const phone = String(body.phone || '').trim()
    const municipality = String(body.municipality || '').trim()

    const region = Array.isArray(body.regions)
      ? body.regions.join(', ')
      : String(body.region || '').trim()

    if (!companyName || !name || !email || !password) {
      return NextResponse.json(
        {
          error: 'Preencha empresa, responsável, e-mail e senha.',
        },
        {
          status: 400,
        }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: 'A senha precisa ter no mínimo 8 caracteres.',
        },
        {
          status: 400,
        }
      )
    }

    const existingUser = await sql`
      SELECT id 
      FROM users 
      WHERE email = ${email}
      LIMIT 1
    `

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          error: 'Já existe um usuário cadastrado com este e-mail.',
        },
        {
          status: 409,
        }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const insertedUser = await sql`
      INSERT INTO users (
        name,
        email,
        password_hash,
        company_name,
        cnpj,
        phone,
        role,
        municipality,
        region,
        is_active
      )
      VALUES (
        ${name.trim()},
        ${email},
        ${passwordHash},
        ${String(companyName).trim()},
        ${cnpj || null},
        ${phone || null},
        'company',
        ${municipality || null},
        ${region || null},
        true
      )
      RETURNING 
        id,
        name,
        email,
        company_name,
        cnpj,
        phone,
        role,
        municipality,
        region,
        is_active,
        created_at
    `

    return NextResponse.json(
      {
        ok: true,
        user: insertedUser[0],
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error)

    return NextResponse.json(
      {
        error: 'Erro interno ao realizar cadastro.',
      },
      {
        status: 500,
      }
    )
  }
}
