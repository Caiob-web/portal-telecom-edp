import type { UserRole } from "@/types/database";

export interface MockSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    companyName?: string;
  };
  redirectTo: "/admin" | "/dashboard";
}

const mockUsers: Array<MockSession["user"] & { password: string }> = [
  {
    id: "usr-admin",
    name: "Administrador EDP",
    email: "admin@edp.com",
    password: "admin123",
    role: "ADMIN"
  },
  {
    id: "usr-caio-admin",
    name: "Caio Henrique",
    email: "cfariagouveia@gmail.com",
    password: "admin123",
    role: "ADMIN"
  },
  {
    id: "usr-empresa",
    name: "Maria Operações",
    email: "empresa@teste.com",
    password: "empresa123",
    role: "COMPANY_USER",
    companyName: "TELEFONICA BRASIL S.A."
  }
];

export async function mockLogin(
  email: string,
  password: string
): Promise<MockSession | null> {
  await new Promise((resolve) => setTimeout(resolve, 450));

  const user = mockUsers.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!user) {
    return null;
  }

  const { password: _password, ...safeUser } = user;

  return {
    user: safeUser,
    redirectTo: safeUser.role === "ADMIN" ? "/admin" : "/dashboard"
  };
}
