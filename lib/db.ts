export const databaseConfig = {
  provider: "neon",
  connectionStringEnv: "DATABASE_URL"
} as const;

export async function getDatabaseConnection() {
  // Conexao futura com Neon Database via DATABASE_URL.
  // Nesta etapa estrutural nao ha cliente, query real ou secret carregado.
  return null;
}
