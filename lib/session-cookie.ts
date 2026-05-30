import "server-only";
import { cookies } from "next/headers";
import type { UserRole } from "@/types/database";

export interface PortalSessionCookie {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
}

export async function getPortalSessionCookie() {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get("portalTelecomSession")?.value;

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(rawSession)) as PortalSessionCookie;
  } catch {
    return null;
  }
}
