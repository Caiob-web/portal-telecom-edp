export const databaseConfig = {
  provider: "neon",
  connectionStringEnv: "DATABASE_URL"
} as const;

export async function getDatabaseConnection() {
  // Placeholder: na próxima etapa, inicializar cliente Neon usando process.env.DATABASE_URL.
  // Nenhuma conexão real e nenhum secret são usados nesta versão estrutural.
  return null;
}
