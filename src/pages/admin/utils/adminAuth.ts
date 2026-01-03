import { AdminRole, AdminUser } from "../types";

type StoredAdminUser = Partial<AdminUser> & { role?: string };

const normalizeRole = (role?: string): AdminRole => {
  // legacy / demo values
  if (role === "admin") return "temple_owner";
  if (role === "owner") return "temple_owner";

  // default
  if (!role) return "temple_owner";

  return role as AdminRole;
};

export const loadAdminUser = (): AdminUser | null => {
  const stored = localStorage.getItem("adminUser");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as StoredAdminUser;
    const now = new Date().toISOString();

    const normalized: AdminUser = {
      id: parsed.id ?? "demo-admin",
      email: parsed.email ?? "",
      name: parsed.name ?? "Temple Admin",
      phone: parsed.phone,
      templeName: parsed.templeName ?? "Demo Temple",
      templeId: parsed.templeId ?? "demo-temple",
      role: normalizeRole(parsed.role),
      createdAt: parsed.createdAt ?? now,
    };

    // persist normalized shape (fixes old demo role values)
    localStorage.setItem("adminUser", JSON.stringify(normalized));
    return normalized;
  } catch {
    localStorage.removeItem("adminUser");
    return null;
  }
};
