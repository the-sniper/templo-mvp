# Templo Phase 1 MVP — Design & Implementation Document

**Last updated:** March 2026
**Target market:** Traditional Tamil temple devotees, starting Chennai / Tamil Nadu
**Goal:** Validate product-market fit for Kuladeivam (ancestral temple) reconnection

---

## 1. MVP Validation Hypotheses

| # | Hypothesis | Metric | Target |
|---|-----------|--------|--------|
| 1 | Users complete Kuladeivam flow | Flow completion rate | ≥ 60% |
| 2 | Users share to family via WhatsApp | WhatsApp share rate | ≥ 40% |
| 3 | Users return to dashboard for reminders | Reminder opt-in rate | ≥ 30% |
| 4 | Users donate via UPI and receive receipt | Donation conversion | ≥ 10% |

---

## 2. Complete Page & Route Inventory

### 2.1 Devotee Pages

| Route | File | Status | Description |
|-------|------|--------|-------------|
| `/` | `src/pages/devotee/Index.tsx` | ✅ Done | Landing page — hero, featured temples, spiritual tips, living faith section |
| `/temples` | `src/pages/devotee/Temples.tsx` | ✅ Done | Temple browsing with search, filters, and temple cards |
| `/temple/:id` | `src/pages/devotee/TempleDetails.tsx` | ✅ Done | Individual temple detail page — info, gallery, channel |
| `/dashboard` | `src/pages/devotee/Dashboard.tsx` | ✅ Done | Main dashboard with tabs: Overview, My Temples, Festivals, Settings + Family Temple tab |
| `/following` | → `Dashboard.tsx` | ✅ Done | Alias route to dashboard |
| `/family-dashboard` | `src/pages/devotee/FamilyDashboard.tsx` | ✅ Done | Dedicated "My Family Temple" page — saved temple, upcoming festivals, activity timeline, trust banner |
| `/how-to` | `src/pages/devotee/HowTo.tsx` | ✅ Done | How-to guide for using Templo |
| `/my-account` | → `Dashboard.tsx` | ✅ Done | Alias route to dashboard |

### 2.2 Ancestral Temple Flow (Primary MVP Flow)

| Route | File | Status | Description |
|-------|------|--------|-------------|
| `/ancestral` | `src/pages/devotee/ancestral/AncestralIntro.tsx` | ✅ Done | Intro page — explains Kuladeivam concept, CTA to start |
| `/ancestral/start` | `src/pages/devotee/ancestral/AncestralForm.tsx` | ✅ Done | Quick wizard — village, state, district (required); surname, deity, landmark (optional) |
| `/ancestral/form` | → `AncestralForm.tsx` | ✅ Done | Alias route to quick form |
| `/ancestral/searching` | `src/pages/devotee/ancestral/AncestralSearching.tsx` | ✅ Done | Animated searching state between form and results |
| `/ancestral/results` | `src/pages/devotee/ancestral/AncestralResults.tsx` | ✅ Done | 3–5 temple matches with confidence badges (High/Medium/Low), save action, "Not found?" link |
| `/ancestral/details` | `src/pages/devotee/ancestral/AncestralDetails.tsx` | ✅ Done | Long-form "Improve Matching" — gotra, caste, festivals, elder contact, photo upload |
| `/ancestral/add-temple` | `src/pages/devotee/ancestral/AddAncestralTemple.tsx` | ✅ Done | Manual temple addition form |
| `/ancestral/confirmation` | `src/pages/devotee/ancestral/AncestralConfirmation.tsx` | ✅ Done | Confirmation after saving ancestral temple |

### 2.3 Auth Pages

| Route | File | Status | Description |
|-------|------|--------|-------------|
| `/login` | `src/pages/devotee/auth/Login.tsx` | ✅ Done | Devotee login |
| `/register` | `src/pages/devotee/auth/Register.tsx` | ✅ Done | Devotee registration |
| `/forgot-password` | `src/pages/devotee/auth/ForgotPassword.tsx` | ✅ Done | Password reset flow |

### 2.4 Donation Flow

| Route | File | Status | Description |
|-------|------|--------|-------------|
| `/donate/:id` | `src/pages/devotee/donation/DonatePage.tsx` | ✅ Done | Donation page — amount chips (₹51/101/501/1001), custom amount, purpose dropdown, UPI CTA |
| `/donation/receipt/:id` | `src/pages/devotee/donation/DonationReceipt.tsx` | ✅ Done | Receipt with ID, temple, amount, purpose, date; download PDF + WhatsApp share |

### 2.5 Phase II Features (Coming Soon)

| Route | File | Status | Description |
|-------|------|--------|-------------|
| `/recurring-donate/:id` | → `ComingSoon.tsx` | 🔒 Phase II | Recurring donations |
| `/recurring-donation/confirmation/:id` | → `ComingSoon.tsx` | 🔒 Phase II | Recurring donation confirmation |
| `/book/:id` | → `ComingSoon.tsx` | 🔒 Phase II | Slot booking |
| `/booking/confirmation/:id` | → `ComingSoon.tsx` | 🔒 Phase II | Booking confirmation |
| `/pooja/:id` | → `ComingSoon.tsx` | 🔒 Phase II | Pooja request |
| `/pooja/confirmation/:id` | → `ComingSoon.tsx` | 🔒 Phase II | Pooja confirmation |

### 2.6 Admin Pages

| Route | File | Status | Description |
|-------|------|--------|-------------|
| `/admin` | `src/pages/admin/Index.tsx` | ✅ Done | Admin landing / redirect |
| `/admin/login` | `src/pages/admin/auth/Login.tsx` | ✅ Done | Admin login |
| `/admin/register` | `src/pages/admin/auth/Register.tsx` | ✅ Done | Admin registration |
| `/admin/dashboard` | `src/pages/admin/Dashboard.tsx` | ✅ Done | Admin dashboard overview |
| `/admin/donations` | `src/pages/admin/Donations.tsx` | ✅ Done | Manage donations |
| `/admin/bookings` | `src/pages/admin/Bookings.tsx` | ✅ Done | Manage bookings |
| `/admin/announcements` | `src/pages/admin/Announcements.tsx` | ✅ Done | Manage announcements |
| `/admin/profile` | `src/pages/admin/Profile.tsx` | ✅ Done | Admin profile |
| `/admin/devotees` | `src/pages/admin/Devotees.tsx` | ✅ Done | Manage devotees |
| `/admin/gallery` | `src/pages/admin/Gallery.tsx` | ✅ Done | Manage gallery |
| `/admin/inventory` | `src/pages/admin/Inventory.tsx` | ✅ Done | Manage inventory |
| `/admin/staff` | `src/pages/admin/Staff.tsx` | ✅ Done | Manage staff |
| `/admin/settings` | `src/pages/admin/Settings.tsx` | ✅ Done | Admin settings |
| `/admin/metrics` | `src/pages/admin/Metrics.tsx` | ✅ Done | PMF metrics dashboard — funnel, conversion rates, targets |

---

## 3. Shared Components

| Component | File | Purpose |
|-----------|------|---------|
| Header | `src/components/Header.tsx` | Global nav — logo, links, language selector |
| Footer | `src/components/Footer.tsx` | Global footer |
| ScrollToTop | `src/components/ScrollToTop.tsx` | Auto-scroll on route change |
| FamilyConfirmationModal | `src/components/FamilyConfirmationModal.tsx` | WhatsApp share modal after saving ancestral temple |
| TempleCard | `src/components/TempleCard.tsx` | Reusable temple card with image, deity, location |
| SearchBar | `src/components/SearchBar.tsx` | Temple search input |
| QuickFilters | `src/components/QuickFilters.tsx` | Filter chips for temple browsing |
| AdvancedSearch | `src/components/AdvancedSearch.tsx` | Extended search with multiple criteria |
| ShareButton | `src/components/ShareButton.tsx` | Generic share functionality |
| LanguageSelector | `src/components/LanguageSelector.tsx` | Language switcher (Tamil/English) |
| LiveActivityCounter | `src/components/LiveActivityCounter.tsx` | Shows live user activity |
| FeaturedTemples | `src/components/FeaturedTemples.tsx` | Featured temples carousel/grid |
| SpiritualTip | `src/components/SpiritualTip.tsx` | Daily spiritual tip card |
| LivingFaith | `src/components/LivingFaith.tsx` | Living faith section on homepage |
| FeedbackPopup | `src/components/FeedbackPopup.tsx` | User feedback collection |
| TemplesNearYou | `src/components/TemplesNearYou.tsx` | Location-based temple suggestions |
| NavLink | `src/components/NavLink.tsx` | Navigation link component |

### Components Hidden for MVP (feature-flagged off)

| Component | Reason |
|-----------|--------|
| TempleMusicPlayer | Phase II — not MVP scope |
| TempleGallery | Phase II — not MVP scope |
| TempleHistory | Phase II — not MVP scope |
| LiveDarshan | Phase II — no live streaming |
| TemplePatrons | Phase II — community features |
| TempleChannel | Visible but de-emphasized |
| TempleReviews | Phase II |

---

## 4. Context Providers & State

| Context | File | Purpose |
|---------|------|---------|
| AuthContext | `src/context/AuthContext.tsx` | User authentication state |
| TempleContext | `src/context/TempleContext.tsx` | Temple data and selection |
| AncestralContext | `src/context/AncestralContext.tsx` | Ancestral form inputs and saved temple |
| DonationContext | `src/context/DonationContext.tsx` | Donation flow state |
| BookingContext | `src/context/BookingContext.tsx` | Booking flow state (Phase II) |
| PoojaContext | `src/context/PoojaContext.tsx` | Pooja request state (Phase II) |
| RecurringDonationContext | `src/context/RecurringDonationContext.tsx` | Recurring donation state (Phase II) |
| LanguageContext | `src/context/LanguageContext.tsx` | Tamil / English language toggle |

---

## 5. Feature Flags

File: `src/config/featureFlags.ts`

| Flag | Value | Notes |
|------|-------|-------|
| `ancestralTemple` | ✅ true | Core MVP flow |
| `templeFollowing` | ✅ true | Follow/save temples |
| `festivalTracking` | ✅ true | Festival reminders |
| `donations` | ✅ true | UPI donations |
| `templeDetails` | ✅ true | View temple pages |
| `poojaScheduleViewing` | ✅ true | View-only pooja schedules |
| `templeChannel` | ✅ true | Temple updates channel |
| `templeMusic` | ❌ false | Hidden for MVP |
| `templeGallery` | ❌ false | Hidden for MVP |
| `templeHistory` | ❌ false | Hidden for MVP |
| `liveDarshan` | ❌ false | No live streaming |
| `genericTempleBrowsing` | ❌ false | De-emphasized |
| `templeDiscovery` | ❌ false | Focus on ancestral |
| `recurringDonations` | ❌ false | Phase II |
| `slotBooking` | ❌ false | Phase II |
| `poojaRequests` | ❌ false | Phase II |
| `inventory` | ❌ false | Phase II |
| `patronsLeaderboard` | ❌ false | Phase II |

---

## 6. Analytics Events Tracked

File: `src/utils/analytics.ts`

| Event | Trigger |
|-------|---------|
| `ancestral_start` | User begins ancestral form |
| `ancestral_show_matches` | Form submitted, viewing results |
| `ancestral_save_temple` | User saves a temple as family temple |
| `ancestral_whatsapp_share` | WhatsApp share button clicked |
| `ancestral_skip_share` | User skips family confirmation |
| `reminder_opt_in` | Festival reminder enabled |
| `donate_initiated` | Donate button clicked |
| `donate_success` | Payment completed |
| `dashboard_view` | Dashboard page loaded |
| `page_view` | Any page loaded |

### Admin Metrics Dashboard (`/admin/metrics`)

Displays:
- Total users count
- Flow completion rate (start → save)
- WhatsApp share rate
- Reminder opt-in rate
- Donation conversion rate
- Visual conversion funnel
- PMF target comparison table

---

## 7. Data & Storage

| Data | Storage | Notes |
|------|---------|-------|
| Ancestral form inputs | localStorage + AncestralContext | Persists across sessions |
| Saved family temple | localStorage | Key: `templo_saved_temple` |
| Analytics events | localStorage | Key: `templo_analytics_events` |
| User ID | localStorage | Auto-generated UUID |
| Temple data | Static mock data | `src/data/temples.ts` |
| Priest data | Static mock data | `src/data/priests.ts` |
| Translations | Static | `src/data/translations.ts` |

---

## 8. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 + tailwindcss-animate |
| UI Library | shadcn/ui (Radix primitives) |
| Routing | React Router DOM 6 |
| State | React Context + localStorage |
| Icons | Lucide React |
| Charts | Recharts (admin metrics) |
| Forms | React Hook Form + Zod |

---

## 9. Primary User Flow (MVP Critical Path)

```
Landing (/) 
  → Ancestral Intro (/ancestral)
    → Quick Form (/ancestral/start)
      → Searching animation (/ancestral/searching)
        → Results (/ancestral/results)
          → Save temple → Family Confirmation Modal
            → WhatsApp Share OR Skip
              → Dashboard (/dashboard) [Family Temple tab]
                → Donate (/donate/:id)
                  → Receipt (/donate/receipt/:id)
                    → Back to Dashboard
```

---

## 10. Design System

- **Theme:** Warm neutral backgrounds, orange primary accents
- **Typography:** Serif headings, sans-serif body
- **Cards:** Clean rounded cards with subtle borders
- **Mobile-first:** All pages responsive, touch-friendly CTAs
- **Cultural sensitivity:** Tamil terminology (Kuladeivam, Annadhanam, Archana), temple imagery
- **Trust signals:** UPI badge, receipt generation, direct-to-temple messaging

---

## 11. What Is NOT Built (Explicit Exclusions)

- ❌ Backend / database (all localStorage)
- ❌ Real UPI payment integration
- ❌ Real WhatsApp API (uses `wa.me` deep links)
- ❌ Push notifications for reminders
- ❌ User authentication with real sessions
- ❌ Temple music player
- ❌ Temple photo gallery
- ❌ Temple history pages
- ❌ Live darshan streaming
- ❌ Community feed / patrons leaderboard
- ❌ Recurring donations
- ❌ Slot booking
- ❌ Pooja requests
- ❌ Inventory management
- ❌ PDF receipt download (mock only)
