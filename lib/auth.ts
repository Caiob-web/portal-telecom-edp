import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import sql from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios')
        }

        const users = await sql`
          SELECT * FROM users
          WHERE email = ${credentials.email}
          AND is_active = true
          LIMIT 1
        `

        if (users.length === 0) {
          throw new Error('Usuário não encontrado ou inativo')
        }

        const user = users[0]
        const passwordMatch = await bcrypt.compare(credentials.password, user.password_hash)

        if (!passwordMatch) {
          throw new Error('Senha incorreta')
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          company_name: user.company_name,
          role: user.role,
          municipality: user.municipality,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.company_name = (user as any).company_name
        token.role = (user as any).role
        token.municipality = (user as any).municipality
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.company_name = token.company_name as string
        session.user.role = token.role as string
        session.user.municipality = token.municipality as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
