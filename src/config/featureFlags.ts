// Feature flags for Phase I / Phase II rollout
// Phase I: Temple discovery, following, channel updates, ancestral search (data collection)
// Phase II: Donations, bookings, pooja requests, inventory, patrons

export const featureFlags = {
  // Phase I Features - ENABLED
  templeDiscovery: true,
  templeDetails: true,
  templeFollowing: true,
  templeChannel: true,
  festivalTracking: true,
  poojaScheduleViewing: true,
  ancestralTemple: true,
  liveDarshan: false, // Hidden for Phase I - no live streaming yet
  templeMusic: true,
  templeGallery: true,
  templeHistory: true,
  
  // Phase II Features - DISABLED
  donations: false,
  recurringDonations: false,
  slotBooking: false,
  poojaRequests: false,
  inventory: false,
  patronsLeaderboard: false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;

export const isFeatureEnabled = (feature: FeatureFlag): boolean => {
  return featureFlags[feature];
};

// Helper to check if any transaction feature is enabled
export const isTransactionEnabled = (): boolean => {
  return featureFlags.donations || 
         featureFlags.recurringDonations || 
         featureFlags.slotBooking || 
         featureFlags.poojaRequests;
};
