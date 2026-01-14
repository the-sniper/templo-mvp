// PMF Analytics Tracking for Phase 1 Tamil Nadu MVP
// Events are stored in localStorage for now, ready for backend migration

export type PMFEvent = 
  | 'ancestral_start'           // User begins ancestral flow
  | 'ancestral_show_matches'    // User submits form, sees results
  | 'ancestral_save_temple'     // User saves a temple
  | 'ancestral_whatsapp_share'  // User shares via WhatsApp
  | 'ancestral_skip_share'      // User skips WhatsApp share
  | 'reminder_opt_in'           // User opts into festival reminders
  | 'donate_initiated'          // User clicks "Pay via UPI"
  | 'donate_success'            // Payment completed
  | 'page_view';                // Page view tracking

interface AnalyticsEvent {
  event: PMFEvent;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

const STORAGE_KEY = 'pmf_events';
const USER_KEY = 'pmf_user_id';

// Generate or get user ID
export const getUserId = (): string => {
  let userId = localStorage.getItem(USER_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_KEY, userId);
  }
  return userId;
};

// Track an event
export const trackEvent = (event: PMFEvent, metadata?: Record<string, unknown>): void => {
  try {
    const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    events.push({
      event,
      timestamp: new Date().toISOString(),
      metadata: {
        ...metadata,
        userId: getUserId(),
      },
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    
    // Log for debugging in development
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${event}`, metadata);
    }
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
};

// Get all events
export const getEvents = (): AnalyticsEvent[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

// Get events by type
export const getEventsByType = (eventType: PMFEvent): AnalyticsEvent[] => {
  return getEvents().filter(e => e.event === eventType);
};

// Calculate PMF metrics
export const getPMFMetrics = () => {
  const events = getEvents();
  const uniqueUsers = new Set(events.map(e => (e.metadata as any)?.userId)).size;
  
  const ancestralStarts = getEventsByType('ancestral_start').length;
  const showMatches = getEventsByType('ancestral_show_matches').length;
  const saveTemple = getEventsByType('ancestral_save_temple').length;
  const whatsappShares = getEventsByType('ancestral_whatsapp_share').length;
  const reminderOptIns = getEventsByType('reminder_opt_in').length;
  const donateInitiated = getEventsByType('donate_initiated').length;
  const donateSuccess = getEventsByType('donate_success').length;

  return {
    totalUsers: uniqueUsers,
    ancestralStarts,
    flowCompletionRate: ancestralStarts > 0 ? Math.round((saveTemple / ancestralStarts) * 100) : 0,
    whatsappShareRate: saveTemple > 0 ? Math.round((whatsappShares / saveTemple) * 100) : 0,
    reminderOptInRate: saveTemple > 0 ? Math.round((reminderOptIns / saveTemple) * 100) : 0,
    donationConversionRate: saveTemple > 0 ? Math.round((donateSuccess / saveTemple) * 100) : 0,
    donationInitiatedRate: saveTemple > 0 ? Math.round((donateInitiated / saveTemple) * 100) : 0,
    funnel: {
      start: ancestralStarts,
      showMatches,
      saveTemple,
      whatsappShare: whatsappShares,
      donate: donateSuccess,
    }
  };
};

// Clear all events (for testing)
export const clearEvents = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
