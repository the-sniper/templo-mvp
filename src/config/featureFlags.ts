// Feature flags for Phase I Tamil Nadu MVP
// Focus: Ancestral temple completion, WhatsApp sharing, festival reminders, UPI donations

export const featureFlags = {
  // Phase 1 MVP - Core Features ENABLED
  ancestralTemple: true,
  templeFollowing: true,
  festivalTracking: true,
  donations: true,              // Enable for MVP validation
  templeDetails: true,
  poojaScheduleViewing: true,
  templeChannel: true,
  
  // Phase 1 MVP - Non-Core Features DISABLED
  templeMusic: false,           // Hide for MVP
  templeGallery: false,         // Hide for MVP
  templeHistory: false,         // Hide for MVP
  liveDarshan: false,           // No live streaming
  genericTempleBrowsing: false, // De-emphasize generic browsing
  templeDiscovery: false,       // Focus on ancestral, not discovery
  
  // Phase II Features - DISABLED
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
