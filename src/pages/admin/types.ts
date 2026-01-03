// Admin Role Types
export type AdminRole = 
  | 'temple_owner'       // Full access to all features
  | 'head_priest'        // Manage bookings, poojas, announcements
  | 'priest'             // View bookings, manage their poojas
  | 'manager'            // Donations, inventory, bookings
  | 'staff'              // Limited view-only access
  | 'inventory_manager'  // Manage temple inventory/supplies
  | 'admin';             // Legacy demo role (maps to temple_owner access)

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  templeName: string;
  templeId: string;
  role: AdminRole;
  createdAt: string;
}

// Role permissions mapping
export const rolePermissions: Record<AdminRole, {
  label: string;
  donations: { view: boolean; manage: boolean; reconcile: boolean };
  bookings: { view: boolean; manage: boolean };
  poojas: { view: boolean; manage: boolean };
  announcements: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  templeProfile: { view: boolean; edit: boolean };
  gallery: { view: boolean; upload: boolean; delete: boolean };
  devotees: { view: boolean };
  staff: { view: boolean; manage: boolean };
  settings: { view: boolean; edit: boolean };
}> = {
  temple_owner: {
    label: 'Temple Owner / Trustee',
    donations: { view: true, manage: true, reconcile: true },
    bookings: { view: true, manage: true },
    poojas: { view: true, manage: true },
    announcements: { view: true, create: true, edit: true, delete: true },
    templeProfile: { view: true, edit: true },
    gallery: { view: true, upload: true, delete: true },
    devotees: { view: true },
    staff: { view: true, manage: true },
    settings: { view: true, edit: true },
  },
  head_priest: {
    label: 'Head Priest',
    donations: { view: true, manage: false, reconcile: false },
    bookings: { view: true, manage: true },
    poojas: { view: true, manage: true },
    announcements: { view: true, create: true, edit: true, delete: false },
    templeProfile: { view: true, edit: false },
    gallery: { view: true, upload: true, delete: false },
    devotees: { view: true },
    staff: { view: true, manage: false },
    settings: { view: false, edit: false },
  },
  priest: {
    label: 'Priest',
    donations: { view: false, manage: false, reconcile: false },
    bookings: { view: true, manage: false },
    poojas: { view: true, manage: true }, // Only their own poojas
    announcements: { view: true, create: false, edit: false, delete: false },
    templeProfile: { view: true, edit: false },
    gallery: { view: true, upload: false, delete: false },
    devotees: { view: false },
    staff: { view: false, manage: false },
    settings: { view: false, edit: false },
  },
  manager: {
    label: 'Temple Manager',
    donations: { view: true, manage: true, reconcile: true },
    bookings: { view: true, manage: true },
    poojas: { view: true, manage: false },
    announcements: { view: true, create: true, edit: true, delete: false },
    templeProfile: { view: true, edit: true },
    gallery: { view: true, upload: true, delete: true },
    devotees: { view: true },
    staff: { view: true, manage: false },
    settings: { view: true, edit: false },
  },
  staff: {
    label: 'Temple Staff',
    donations: { view: false, manage: false, reconcile: false },
    bookings: { view: true, manage: false },
    poojas: { view: true, manage: false },
    announcements: { view: true, create: false, edit: false, delete: false },
    templeProfile: { view: true, edit: false },
    gallery: { view: true, upload: false, delete: false },
    devotees: { view: false },
    staff: { view: false, manage: false },
    settings: { view: false, edit: false },
  },
  inventory_manager: {
    label: 'Inventory Manager',
    donations: { view: false, manage: false, reconcile: false },
    bookings: { view: false, manage: false },
    poojas: { view: false, manage: false },
    announcements: { view: true, create: false, edit: false, delete: false },
    templeProfile: { view: true, edit: false },
    gallery: { view: true, upload: false, delete: false },
    devotees: { view: false },
    staff: { view: false, manage: false },
    settings: { view: false, edit: false },
  },
  // Legacy demo role: treat as full temple owner access
  admin: {
    label: 'Admin (Legacy)',
    donations: { view: true, manage: true, reconcile: true },
    bookings: { view: true, manage: true },
    poojas: { view: true, manage: true },
    announcements: { view: true, create: true, edit: true, delete: true },
    templeProfile: { view: true, edit: true },
    gallery: { view: true, upload: true, delete: true },
    devotees: { view: true },
    staff: { view: true, manage: true },
    settings: { view: true, edit: true },
  },
};

// Check if user has permission
export const hasPermission = (
  role: AdminRole | string,
  module: keyof typeof rolePermissions['temple_owner'],
  action: string
): boolean => {
  const permissions = (rolePermissions as Record<string, typeof rolePermissions.temple_owner>)[role] ?? rolePermissions.temple_owner;
  const modulePerms = permissions[module] as Record<string, boolean>;
  return modulePerms?.[action] ?? false;
};

// Donation types
export interface Donation {
  id: string;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  amount: number;
  type: 'general' | 'renovation' | 'annadanam' | 'festival' | 'other';
  purpose?: string;
  date: string;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cash';
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  isRecurring: boolean;
  isAnonymous: boolean;
}

// Booking types
export interface Booking {
  id: string;
  devoteName: string;
  devotePhone: string;
  devoteEmail?: string;
  type: 'darshan' | 'pooja' | 'special_darshan';
  date: string;
  timeSlot: string;
  numberOfPeople: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';
  specialRequests?: string;
  createdAt: string;
}

// Announcement types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'festival' | 'event' | 'urgent';
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}
