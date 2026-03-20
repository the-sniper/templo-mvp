# Templo Phase 1 MVP — Complete Design & Implementation Document

**Last updated:** March 2026
**Target market:** Traditional Tamil temple devotees, starting Chennai / Tamil Nadu
**Goal:** Validate product-market fit for Kuladeivam (ancestral temple) reconnection
**Live URL:** https://templo-mvp.lovable.app

---

## Table of Contents

1. [MVP Validation Hypotheses](#1-mvp-validation-hypotheses)
2. [Design System](#2-design-system)
3. [Complete Page Inventory](#3-complete-page-inventory)
4. [Primary User Flow](#4-primary-user-flow)
5. [Shared Components](#5-shared-components)
6. [Context Providers & State](#6-context-providers--state)
7. [Feature Flags](#7-feature-flags)
8. [Analytics & PMF Tracking](#8-analytics--pmf-tracking)
9. [Data & Storage](#9-data--storage)
10. [Tech Stack](#10-tech-stack)
11. [Explicit Exclusions](#11-explicit-exclusions)

---

## 1. MVP Validation Hypotheses

| # | Hypothesis | Metric | Target |
|---|-----------|--------|--------|
| 1 | Users complete Kuladeivam flow | Flow completion rate (start → save) | ≥ 60% |
| 2 | Users share to family via WhatsApp | WhatsApp share rate (of saved) | ≥ 40% |
| 3 | Users return to dashboard for reminders | Reminder opt-in rate | ≥ 30% |
| 4 | Users donate via UPI and receive receipt | Donation conversion (of saved) | ≥ 10% |

---

## 2. Design System

### 2.1 Color Palette (Sacred Temple Color System)

All colors are HSL and use CSS custom properties via Tailwind semantic tokens. No hardcoded colors in components.

**Light Mode (Primary — default):**

| Token | HSL Value | Description |
|-------|-----------|-------------|
| `--background` | `35 35% 95%` | Warm ivory / temple stone — aged, soft, calm |
| `--foreground` | `20 25% 15%` | Deep charcoal brown for headings |
| `--card` | `38 40% 97%` | Slightly warmer card surface |
| `--card-foreground` | `20 25% 15%` | Same as foreground |
| `--popover` | `35 30% 92%` | Warm stone for popovers |
| `--primary` | `24 85% 45%` | **Deep saffron / temple orange** — warm, grounded |
| `--primary-foreground` | `40 50% 98%` | Near-white for text on primary |
| `--secondary` | `5 65% 42%` | **Kumkum red** — used sparingly for accents |
| `--secondary-foreground` | `40 50% 98%` | Near-white for text on secondary |
| `--muted` | `30 20% 75%` | Warm muted tone for subtle elements |
| `--muted-foreground` | `20 15% 35%` | Readable secondary text |
| `--accent` | `40 45% 92%` | Sandalwood / light brass accent |
| `--accent-foreground` | `24 85% 40%` | Saffron text on accent surfaces |
| `--destructive` | `0 72% 50%` | Red for errors |
| `--border` | `30 25% 82%` | Warm borders |
| `--ring` | `24 85% 45%` | Focus ring matches primary |
| `--radius` | `0.75rem` | Default border radius |

**Dark Mode (secondary — warm night):**

| Token | HSL Value | Description |
|-------|-----------|-------------|
| `--background` | `20 20% 8%` | Deep temple night |
| `--primary` | `28 90% 55%` | Glowing saffron |
| `--secondary` | `8 60% 50%` | Brighter kumkum |
| `--card` | `22 18% 12%` | Warm dark card |
| `--border` | `22 18% 22%` | Dark warm border |

**Design philosophy:** Colors evoke oil lamps at dawn, temple stone, kumkum, turmeric, brass, and sandalwood. Avoids cold grays, neon, or gamified colors. Maintains reverence and calm.

### 2.2 Typography

| Font Family | Token | Usage |
|------------|-------|-------|
| **Libre Caslon Text** | `font-serif` | Headings, display text, temple names |
| **Roboto** | `font-sans` | Body text, UI labels, buttons |
| **Roboto Mono** | `font-mono` | Receipt numbers, transaction IDs |

All loaded via Google Fonts.

### 2.3 Spacing Scale

Base: `0.25rem` (4px). Used throughout: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64px`.

### 2.4 Shadows

Warm-toned box shadows (`hsl(30 30% 20%)` base) across 7 tiers: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`. Dark mode uses pure black shadows.

### 2.5 Animations

| Animation | Duration | Usage |
|-----------|----------|-------|
| `fade-in` | 0.4s ease-out | General element entrance |
| `fade-in-up` | 0.5s ease-out | Section reveals (20px translateY) |
| `scale-in` | 0.3s ease-out | Modal/card appearance |
| `shimmer` | 2s linear infinite | Loading skeleton shimmer |
| `ambient-drift` | 8s ease-in-out infinite | Floating decorative elements |
| `flame-flicker` | 3s ease-in-out infinite | Oil lamp / spiritual effects |
| `prayer-glow` | 4s ease-in-out infinite | Pulsing primary-colored box-shadow |
| `scroll-fade` | 0.6s ease-out | Scroll-triggered entrance |

### 2.6 Component Patterns

- **Buttons:** `rounded-full` for all CTAs. Primary uses `bg-primary text-primary-foreground`. Shadow: `shadow-lg shadow-primary/25` for emphasis.
- **Cards:** `rounded-2xl` or `rounded-xl`, `bg-card border border-border/50`, hover state: `hover:border-primary/30 hover:shadow-lg`.
- **Headers:** `bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10` — consistent across all pages.
- **Inputs:** `h-12` height for touch-friendliness. Rounded borders.
- **Badges:** `bg-primary/10 text-primary border-primary/20` for informational. Confidence badges use green/amber/muted.
- **Trust banners:** `bg-primary/5 border border-primary/20 rounded-xl` with emoji indicators (✅ 💳 📄 🛕).

### 2.7 Responsive Strategy

- **Mobile-first:** All layouts start from single-column.
- **Breakpoints:** `sm:` (640px), `md:` (768px), `lg:` (1024px).
- **Touch targets:** Minimum 44px height for interactive elements (`h-12`, `h-14`).
- **Scrollable tabs:** Horizontal scroll with `overflow-x-auto scrollbar-hide` for tab navigation on mobile.
- **Max content width:** `max-w-lg` (512px) for forms, `max-w-2xl` (672px) for content, `max-w-6xl` (1152px) for dashboards.

---

## 3. Complete Page Inventory

### 3.1 Landing Page — `/`

**File:** `src/pages/devotee/Index.tsx` (463 lines)
**Status:** ✅ Complete

**Sections (top to bottom):**

1. **Header** — Global nav (Header component)
2. **Hero section** — Full-viewport height (`min-h-[85vh]`), village temple background image (`src/assets/village-temple.jpg`), gradient overlay (`from-background/70 via-background/50 to-background`). Randomized headline from 10 emotionally-tuned phrases (e.g., "Remember the temple where your grandmother prayed?"). Two CTAs: "Explore Temples" → `/temples`, "Find Ancestral" → `/ancestral`.
3. **Features section** — 2-card grid: "Discover Temples" and "Connect with Priests". Cards with icon, title, description. Warm background `bg-muted/30`.
4. **Featured Temples** — `FeaturedTemples` component (carousel/grid of popular temples).
5. **Temples Near You** — `TemplesNearYou` component. Requests geolocation permission. Shows nearby temples if granted.
6. **Spiritual Tip** — `SpiritualTip` component. Daily devotional tip card.
7. **Ancestral Temple CTA** — Split card: temple image left, content right. Badge "Ancestral Connection", headline "Reconnect with your roots", CTA → `/ancestral`.
8. **Indian Testimonials** — Carousel (`embla-carousel-react`) of 4 testimonials from Indian devotees. Quote icon, star ratings, avatar initials, location with `MapPin`.
9. **NRI Testimonials** — Separate carousel of 4 NRI testimonials. Uses `Globe2` icon for location. `bg-muted/30` background.
10. **Temple Owner CTA** — Banner for temple administrators → `/admin`. Badge "For Temple Owners & Priests".
11. **Footer** — Global footer (Footer component).

**Translations:** Uses `useLanguage()` hook for bilingual (Tamil/English) support on key labels.

---

### 3.2 Temple Browser — `/temples`

**File:** `src/pages/devotee/Temples.tsx` (21 lines)
**Status:** ✅ Complete

**Structure:**
- Header → `TempleList` component (handles search, filters, grid) → Footer.
- Container: `container mx-auto px-4 py-6 sm:py-8`.
- `TempleList` includes `SearchBar`, `QuickFilters`, `AdvancedSearch`, and renders `TempleCard` components in a responsive grid.

---

### 3.3 Temple Details — `/temple/:id`

**File:** `src/pages/devotee/TempleDetails.tsx` (420 lines)
**Status:** ✅ Complete

**Sections:**

1. **Hero image** — Full-width `h-[50vh] min-h-[400px]`, gradient overlay from bottom. Floating back button (rounded-full, backdrop-blur) and share button. Temple name, deity badge, location overlay at bottom.
2. **Sticky Action Bar** — `sticky top-0 z-20`, Follow/unfollow button (heart icon, toggles primary fill), "Share Experience" button.
3. **Description** — `text-lg text-muted-foreground max-w-3xl`.
4. **Tabbed Content** — 3 tabs in a `rounded-2xl bg-card` tab list:
   - **Info:** Pooja timings (cards with name + time badge), Announcements (with type badges: festival/event/general), Contact info (phone/email/website as clickable cards), Google Maps embed.
   - **Explore:** Feature-flagged sections — Gallery (`isFeatureEnabled('templeGallery')`), History (`isFeatureEnabled('templeHistory')`), Music Player (`isFeatureEnabled('templeMusic')`), Live Darshan (`isFeatureEnabled('liveDarshan')`). All currently hidden for MVP.
   - **Updates:** Temple Channel component, Patrons section (collapsible), Feedback popup.
5. **Transaction Buttons** — Bottom sticky bar with Donate/Book/Pooja CTAs. Only shown if `isTransactionEnabled()`. Donate links to `/donate/:id`, others to `/coming-soon`.

---

### 3.4 Dashboard — `/dashboard`

**File:** `src/pages/devotee/Dashboard.tsx` (425 lines)
**Status:** ✅ Complete
**Also accessible via:** `/following`, `/my-account`

**Structure:**
- Welcome header with user name greeting, "Your Spiritual Journey" badge.
- 5-tab layout (`rounded-full` pill tabs, horizontally scrollable on mobile):

**Tab 1: Overview**
- Stats cards (3-col grid): Family Temple card (if saved, links to Family tab), Temples Following count, Upcoming Festivals count. Each card: gradient background, icon, hover: `shadow-lg`, `-translate-y-1`.
- Quick Actions (4-col grid): Find Temples, Ancestral Temple, Family Dashboard, Festivals.

**Tab 2: Family Temple**
- If saved: Card with image header (gradient overlay), "Your Kuladeivam" badge, temple name, location, deity. CTA buttons: "Donate Now" and "View Details".
- If not saved: Empty state with TreePine icon, "Find Your Kuladeivam" CTA → `/ancestral/start`.

**Tab 3: My Temples**
- Header with "Find More" button → `/temples`.
- Grid of followed `TempleCard` components.
- Empty state: Heart icon, "Explore Temples" CTA.

**Tab 4: Festivals**
- List of upcoming festivals (mock data: Pongal, Maha Shivaratri, Holi, Ram Navami).
- Each row: Calendar icon, festival name, temple, date in `MMM d` format, year below.
- Calendar/list view toggle (view switcher).

**Tab 5: Settings**
- Profile form (first name, last name, email, phone) with "Save Changes" CTA.
- "Sign Out" destructive button.

---

### 3.5 Family Dashboard — `/family-dashboard`

**File:** `src/pages/devotee/FamilyDashboard.tsx` (361 lines)
**Status:** ✅ Complete

**If no temple saved:**
- Empty state card: Dashed border (`border-2 border-dashed border-primary/30`), TreePine icon, "Find Your Kuladeivam" heading. CTA → `/ancestral/start`.
- Trust banner below: "UPI supported • Receipt provided • Direct to temple".

**If temple is saved:**

1. **Header** — "Your Kuladeivam" badge, "My Family Temple" heading, user greeting.
2. **Saved Temple Card** — Image header with gradient, temple name, location, "Saved" green badge, deity info. Two actions: "Donate Now" → `/donate/:id`, Share (opens WhatsApp).
3. **Upcoming Festivals** — 3 Tamil festivals (Thai Pongal, Maha Shivaratri, Panguni Uthiram). Date format: `MMM d` + year. "Remind Me on WhatsApp" button → opens WhatsApp with pre-filled message. After enabling: green checkmark "WhatsApp reminders enabled".
4. **Recent Activity** — Timeline: Temple Saved (green check), Reminders Enabled (bell), Recent Donations (gift icon, amount, date, links to receipt).
5. **Quick Actions** — Two buttons: "Full Dashboard" → `/dashboard`, "Change Temple" → `/ancestral`.
6. **Trust Banner** — "100% Direct to Temple" with UPI/receipt/verified trust signals.

**Analytics:** Tracks `page_view` (page: family_dashboard), `reminder_opt_in`.
**State:** Reads from `AncestralContext` (selectedTemple, savedAncestralTemples) and `DonationContext`.

---

### 3.6 Ancestral Intro — `/ancestral`

**File:** `src/pages/devotee/ancestral/AncestralIntro.tsx` (134 lines)
**Status:** ✅ Complete — DO NOT MODIFY

**Sections:**

1. **Decorative icon** — `h-24 w-24 rounded-full bg-primary/10`, 🛕 emoji.
2. **Badge:** "கூலதெய்வம் • Kuladeivam" (Tamil + English).
3. **Heading:** "Find Your Ancestral Temple".
4. **Description:** Purpose statement about Kuladeivam, festival alerts, offerings.
5. **Primary CTA:** "Find My Kuladeivam" → `/ancestral/start`. Tracks `ancestral_start`.
6. **Secondary:** "or explore temples →" → `/temples`.
7. **Trust Section** — 2×2 grid of trust cards: Tamil Support, UPI Donations, Receipt Provided, Family Sharing. Each: icon, title, Tamil subtitle.
8. **How It Works** — 4-step numbered list: Share Roots → Find Matches → Confirm with Family → Stay Connected. Numbered circles in primary color.
9. **Bottom CTA:** "Get Started" with checkmark. "Takes about 30 seconds" subtitle.

**Analytics:** `page_view` (page: ancestral_intro), `ancestral_start` on CTA click.

---

### 3.7 Ancestral Form — `/ancestral/start` (also `/ancestral/form`)

**File:** `src/pages/devotee/ancestral/AncestralForm.tsx` (283 lines)
**Status:** ✅ Complete

**Header:** "Tell Us About Your Roots", subtitle "Takes 30 seconds. You can improve matching later."

**Required Fields** (in a card with "📍 Location" header + "Required" badge):
- **Native Village / Town** — text input, placeholder "e.g., Thiruvaiyaru, Kumbakonam". `h-12` height.
- **State** — dropdown, defaults to "Tamil Nadu". Options: 16 Indian states + "Other".
- **District** — If Tamil Nadu: dropdown of 37 sorted districts. Otherwise: text input.

**Optional Fields** (collapsible section, `Collapsible` component):
- Header: "✨ Optional Details" with "Better matches" badge.
- **Family Surname** — text, placeholder "e.g., Iyer, Pillai, Nadar".
- **Primary Deity** — dropdown: Murugan, Amman/Mariamman, Shiva, Vishnu/Perumal, Ganesha, Hanuman, Other. Each with Tamil script labels.
- **Nearby Landmark** — text, placeholder "e.g., Near Kaveri River, Railway Station".

**CTAs:**
- "Show Matches" — primary, `h-14 text-lg rounded-full`. Disabled until required fields filled.
- "Add optional details for better matches" — ghost button, shows only when optional section is collapsed.

**On submit:** Saves form data to `AncestralContext`, saves search attempt with timestamp, tracks `ancestral_show_matches` with state/district/hasDeity/hasSurname metadata, navigates to `/ancestral/results`.

**Analytics:** `page_view` (page: ancestral_form), `ancestral_show_matches`.

---

### 3.8 Ancestral Searching (Transition) — `/ancestral/searching`

**File:** `src/pages/devotee/ancestral/AncestralSearching.tsx` (79 lines)
**Status:** ✅ Complete

**Purpose:** Brief animated transition between form submission and results.

**UI:**
- Centered layout, full viewport height minus header.
- Pulsing `Save` icon in `h-24 w-24 rounded-full bg-primary/10`.
- Heading: "Recording Your Details".
- Progress bar: fills from 0–100% in 1.5s (6% increments per 100ms).
- Info card: "Your contribution helps future devotees..."
- Decorative emojis: 🕉️ 🪔 🙏 at 20% opacity.
- Auto-navigates to `/ancestral/results` after 1.5s.

---

### 3.9 Ancestral Results — `/ancestral/results`

**File:** `src/pages/devotee/ancestral/AncestralResults.tsx` (250 lines)
**Status:** ✅ Complete

**Header:** Sparkles icon, "Possible Ancestral Temples", subtitle "Based on {village}, {district}".

**Search:** Input with search icon, filters temples by name or location.

**Temple Cards** (up to 5, sorted by confidence):
Each card: horizontal layout with:
- **Image:** `h-32 w-28` left column.
- **Content:** Temple name (serif font), location with MapPin, confidence badge, reason snippet.
- **Confidence Badges:**
  - High: `bg-green-500/10 text-green-700` + 🎯 emoji.
  - Medium: `bg-amber-500/10 text-amber-700`.
  - Low: `bg-muted text-muted-foreground`.
- **Reason snippet:** e.g., "Matches district + deity" or "Nearby location".
- **CTA:** "Save as My Temple" button with CheckCircle icon, `rounded-full`.

**Confidence scoring algorithm:**
- +2 if district matches temple location.
- +1 if state matches.
- +1 if deity is provided.
- +random 0–1 for demo variation.
- Score ≥3: High. ≥2: Medium. <2: Low.

**On "Save as My Temple" click:**
- Tracks `ancestral_save_temple` with templeId, name, confidence level.
- Opens `FamilyConfirmationModal`.

**"Didn't find?" section:**
- Card with gradient background: "Improve Details" → `/ancestral/start`, "Add Temple" → `/ancestral/add-temple`.

**Analytics:** `page_view` (page: ancestral_results), `ancestral_save_temple`.

---

### 3.10 Family Confirmation Modal

**File:** `src/components/FamilyConfirmationModal.tsx` (134 lines)
**Status:** ✅ Complete

**Trigger:** Opens after user saves a temple from results.

**UI:** Dialog/modal centered, `sm:max-w-md`.
- Users icon in primary circle.
- Title: "Confirm with Your Family".
- Description: "Send this to your parents or elders to confirm your Kuladeivam temple."
- Temple preview card: name + location.

**Actions:**
- **Share on WhatsApp** — Green button (`bg-[#25D366]`). Opens `wa.me` with pre-formatted message:
  ```
  🙏 Templo found our possible Kuladeivam temple:
  🛕 *{templeName}*
  📍 {location}
  Is this correct? Please reply: ✅ Yes ❌ No 🤔 Not sure
  Find your ancestral temple: {origin}/ancestral
  ```
- **Skip for now** — Ghost button.

**After share:** Shows green checkmark "Message ready to send!" and "Continue to Dashboard" button.
**After skip:** Directly navigates to dashboard.

**Analytics:** `ancestral_whatsapp_share`, `ancestral_skip_share`.

---

### 3.11 Ancestral Details (Improve Matching) — `/ancestral/details`

**File:** `src/pages/devotee/ancestral/AncestralDetails.tsx` (284 lines)
**Status:** ✅ Complete

**Purpose:** Optional long form for users who want better matching.

**Header:** Info icon, "Improve Matching", subtitle "More details help us find the correct temple."

**Form Sections:**

1. **Family Background** (card):
   - Gotra — text, placeholder "e.g., Bharadwaja, Kashyapa".
   - Caste / Community — text, placeholder "e.g., Mudaliar, Chettiar, Nadar".
   - Mother Tongue — text, placeholder "e.g., Tamil, Telugu, Kannada".

2. **Temple Information** (card):
   - Temple Age — dropdown: Very Old (100+), Old (50-100), Relatively New (<50), Not Sure.
   - Festivals Celebrated — chip/badge selector from 11 Tamil festivals (Pongal, Thai Poosam, Maha Shivaratri, etc.). Toggle on/off.
   - Upload Old Temple Photo — dashed border upload area, shows filename after selection.

3. **Elder Who Might Know** (card with UserPlus icon):
   - Name — text.
   - Phone — text, optional.

4. **Checkboxes:**
   - "I'm not sure about my ancestral temple" — Checkbox.
   - "I consent to my data being used to improve matching" — Checkbox.

**CTAs:**
- "Update & Show Matches" — primary, `h-14 rounded-full`.
- "Back to Results" — ghost button.

**On submit:** Updates form data in `AncestralContext`, navigates to `/ancestral/results`.

---

### 3.12 Add Ancestral Temple — `/ancestral/add-temple`

**File:** `src/pages/devotee/ancestral/AddAncestralTemple.tsx` (292 lines)
**Status:** ✅ Complete

**Purpose:** Manual temple addition when matching fails.

**Contribution banner:** Info icon, "Your contribution matters! Every temple you add helps other devotees..."

**Required section** (card, "📍 Temple Location"):
- Temple Name — text.
- Village / Town — pre-filled from form data.
- District — pre-filled from form data.
- State — dropdown of 28 Indian states, pre-filled.

**Optional section** (card, "🛕 Temple Details"):
- Primary Deity — text.
- Temple Type — dropdown: Family Temple (Kuladeivam), Village Temple (Gramadeivam), Regional Temple, Major Pilgrimage Temple.
- Annual Festivals — 9 festival chip/badge selector.
- Description / History — textarea.

**Photo Upload:**
- Shows preview with remove button after upload.
- Dashed border upload area with Upload icon.

**CTA:** "Add & Save as My Ancestral Temple" → sets as selected temple, navigates to `/ancestral/confirmation`.

---

### 3.13 Ancestral Confirmation — `/ancestral/confirmation`

**File:** `src/pages/devotee/ancestral/AncestralConfirmation.tsx` (152 lines)
**Status:** ✅ Complete

**Structure:**
- Success icon: CheckCircle in `h-20 w-20 rounded-full bg-primary/10`.
- Heading: "Your Ancestral Temple is Saved!"
- Temple card: Image, name, location, deity. "Added by you" badge if custom.
- Thank you banner: Users icon, contribution stats ("You've joined {count} others in preserving our spiritual heritage").
- Share CTA: "Know family members..." with ShareButton component.
- Actions: "Go to Home" (primary), "Add Another Temple" (outline).
- Decorative emojis.

**On mount:** Saves temple via `saveAncestralTemple()`.

---

### 3.14 Donate Page — `/donate/:id`

**File:** `src/pages/devotee/donation/DonatePage.tsx` (277 lines)
**Status:** ✅ Complete

**Header:** Custom sticky header with back button, "Make an Offering" title, temple name subtitle.

**Trust Banner:** "✅ 100% direct to temple account • UPI supported • Receipt generated".

**Form Sections:**

1. **Amount Selection** (card):
   - 4 preset chips: ₹51, ₹101, ₹501, ₹1001 — culturally appropriate amounts.
   - Grid: `grid-cols-4`, `h-14 text-lg font-semibold`.
   - Custom amount input with ₹ prefix, `text-lg`.

2. **Purpose** (card):
   - Dropdown: Annadhanam (Food Offering), Archana, Temple Maintenance, Festival Contribution, General Donation.

3. **Donor Details** (card):
   - Full Name — required.
   - Phone Number — required, `type="tel"`.
   - Dedication Name — optional, "In the name of..." subtitle.

**CTA:** "Pay ₹{amount} via UPI" — `h-14 text-lg rounded-full` with Smartphone icon. Shows "Processing..." during simulated 2-second payment.

**On submit:** Validates name + phone, tracks `donate_initiated`, simulates payment, calls `addDonation()`, tracks `donate_success`, navigates to `/donation/receipt/:id`.

**Analytics:** `page_view` (page: donate), `donate_initiated`, `donate_success`.

---

### 3.15 Donation Receipt — `/donation/receipt/:id`

**File:** `src/pages/devotee/donation/DonationReceipt.tsx` (289 lines)
**Status:** ✅ Complete

**Success Header:** Green checkmark in `h-20 w-20 rounded-full bg-green-100`, "Donation Successful", "Thank you for your generous offering".

**Receipt Card** (bordered card with `border-2`):
- **Receipt header:** Templo branding, "DONATION RECEIPT", "Official Receipt".
- **Amount section:** `text-4xl font-bold text-primary` amount, number-to-words conversion (Indian numbering: Lakh, Crore), in `bg-primary/5 rounded-xl`.
- **Temple details:** Building icon, temple name, "Verified Temple".
- **Donor details:** Name (User icon), Phone (Phone icon).
- **Payment details:** Payment method (UPI, uppercase), Date + time (Indian locale format: "d MMMM yyyy at HH:mm").
- **Reference numbers:** Receipt number and Transaction ID in `font-mono bg-accent/50 rounded-xl`.
- **Purpose/Dedication:** Shown if provided.
- **Footer:** "100% of your donation goes directly to the temple."

**Print support:** `print:bg-white`, `print:hidden` on non-receipt elements, `print:border print:shadow-none` on card.

**Actions:**
- "Print" — calls `window.print()`.
- "WhatsApp" — opens `wa.me` with receipt details (temple, amount, receipt number, date). Styled in WhatsApp green (`bg-[#25D366]/10`).
- "Back to Dashboard" — primary full-width button.

**Number-to-words helper:** Handles Indian numbering system (Crore, Lakh, Thousand, Hundred).

**Analytics:** `donate_success` with amount, temple name, receipt ID.

---

### 3.16 Auth Pages

#### Login — `/login`

**File:** `src/pages/devotee/auth/Login.tsx` (175 lines)
**Status:** ✅ Complete

- Custom header with "Back to Home" link (no full Header component).
- Centered card layout, `max-w-md`.
- Prayer emoji icon (🙏) in primary circle.
- "Welcome Back" heading.
- Card with email + password fields (with visibility toggle).
- "Forgot password?" link.
- "Sign In" button — `rounded-full`, loading state with spinner.
- Demo account card: `bg-primary/5 border-primary/20`, pre-filled credentials (test@temple.com / 12345678), "Use Demo" button.
- "Create one" register link.

#### Register — `/register`

**File:** `src/pages/devotee/auth/Register.tsx`
**Status:** ✅ Complete

- Similar structure to Login.
- Fields: Name, Email, Password (with strength hints).

#### Forgot Password — `/forgot-password`

**File:** `src/pages/devotee/auth/ForgotPassword.tsx`
**Status:** ✅ Complete

- Email input, sends reset link (simulated).

---

### 3.17 How To Guide — `/how-to`

**File:** `src/pages/devotee/HowTo.tsx` (557 lines)
**Status:** ✅ Complete

**Sections:**

1. **Hero:** HelpCircle icon, "How to Use Templo", "Your complete guide..."
2. **3-Step Quick Start:** Numbered step cards: Find a Temple → Follow & Connect → Support & Participate. Each with icon, description, CTA button. Arrow connectors between cards on desktop.
3. **Feature Categories** — Scrollable pill tabs: Getting Started, Discover, Donate & Book, Experience, Community, Your Profile.
4. **Feature Detail Cards** — Each category expands to show features with:
   - Expandable accordion pattern.
   - Step-by-step instructions (numbered).
   - Pro tips.
   - Covers: Temple search, following, festivals, ancestral flow, donations, recurring donations, slot booking, pooja requests, live darshan, temple music, gallery, history, announcements, patrons, sharing, dashboard, language, location.

---

### 3.18 Coming Soon — Phase II Features

**File:** `src/pages/devotee/ComingSoon.tsx` (116 lines)
**Status:** ✅ Complete

**Used for routes:** `/recurring-donate/:id`, `/recurring-donation/confirmation/:id`, `/book/:id`, `/booking/confirmation/:id`, `/pooja/:id`, `/pooja/confirmation/:id`

**Structure:**
- Detects feature from URL path.
- Shows feature-specific icon (🙏/🔄/📅/🪔), title, description.
- "Coming Soon" badge.
- Phase info card: "We're currently in Phase I..."
- Two CTAs: "Explore Temples", "Find Ancestral Temple".
- Decorative emojis.

---

### 3.19 Not Found — `/*`

**File:** `src/pages/devotee/NotFound.tsx`
**Status:** ✅ Complete

- 404 catch-all route.

---

### 3.20 Admin Pages

#### Admin Landing — `/admin`
**File:** `src/pages/admin/Index.tsx`
**Status:** ✅ Complete
- Redirects to login or dashboard.

#### Admin Login — `/admin/login`
**File:** `src/pages/admin/auth/Login.tsx`
**Status:** ✅ Complete

#### Admin Register — `/admin/register`
**File:** `src/pages/admin/auth/Register.tsx`
**Status:** ✅ Complete

#### Admin Dashboard — `/admin/dashboard`
**File:** `src/pages/admin/Dashboard.tsx`
**Status:** ✅ Complete
- Overview stats, quick actions.

#### Admin Donations — `/admin/donations`
**File:** `src/pages/admin/Donations.tsx`
**Status:** ✅ Complete
- View/manage donations.

#### Admin Bookings — `/admin/bookings`
**File:** `src/pages/admin/Bookings.tsx`
**Status:** ✅ Complete

#### Admin Announcements — `/admin/announcements`
**File:** `src/pages/admin/Announcements.tsx`
**Status:** ✅ Complete

#### Admin Profile — `/admin/profile`
**File:** `src/pages/admin/Profile.tsx`
**Status:** ✅ Complete

#### Admin Devotees — `/admin/devotees`
**File:** `src/pages/admin/Devotees.tsx`
**Status:** ✅ Complete

#### Admin Gallery — `/admin/gallery`
**File:** `src/pages/admin/Gallery.tsx`
**Status:** ✅ Complete

#### Admin Inventory — `/admin/inventory`
**File:** `src/pages/admin/Inventory.tsx`
**Status:** ✅ Complete

#### Admin Staff — `/admin/staff`
**File:** `src/pages/admin/Staff.tsx`
**Status:** ✅ Complete

#### Admin Settings — `/admin/settings`
**File:** `src/pages/admin/Settings.tsx`
**Status:** ✅ Complete

#### Admin PMF Metrics — `/admin/metrics`
**File:** `src/pages/admin/Metrics.tsx` (225 lines)
**Status:** ✅ Complete

**Sections:**
1. **Header:** Back to dashboard, "PMF Metrics", "Phase 1 Tamil Nadu MVP", Refresh button.
2. **6 Metric Cards** (3-col grid): Total Users, Flow Completion %, WhatsApp Share Rate %, Reminder Opt-in %, Donation Conversion %, Donation Initiated %.
3. **Conversion Funnel** — Horizontal bar chart: Ancestral Start → Show Matches → Save Temple → WhatsApp Share → Donate. Width proportional to max value. Color: primary with decreasing opacity.
4. **PMF Validation Targets** — 4 rows comparing current vs target: Flow 60%, WhatsApp 40%, Reminder 30%, Donation 10%. Badges: "✓ Achieved" or "In Progress".
5. **Developer Tools** (DEV only): "Clear All Analytics Data" button.

Auto-refreshes every 30 seconds.

---

## 4. Primary User Flow (MVP Critical Path)

```
Landing (/)
  ↓ Click "Find Ancestral" or "Find My Kuladeivam"
Ancestral Intro (/ancestral)
  ↓ Click "Find My Kuladeivam" [tracks: ancestral_start]
Quick Form (/ancestral/start)
  ↓ Fill village + state + district → "Show Matches" [tracks: ancestral_show_matches]
Searching Animation (/ancestral/searching) [1.5s auto-redirect]
  ↓
Results (/ancestral/results) [tracks: page_view]
  ↓ Click "Save as My Temple" [tracks: ancestral_save_temple]
Family Confirmation Modal
  ├─ "Share on WhatsApp" [tracks: ancestral_whatsapp_share] → wa.me deep link
  └─ "Skip for now" [tracks: ancestral_skip_share]
  ↓
Dashboard (/dashboard) → Family Temple tab [tracks: dashboard_view]
  ↓ Click "Donate Now"
Donate Page (/donate/:id) [tracks: donate_initiated]
  ↓ Fill details → "Pay via UPI"
Receipt (/donation/receipt/:id) [tracks: donate_success]
  ├─ Print receipt
  ├─ Share on WhatsApp
  └─ Back to Dashboard
```

**Alternative paths:**
- Results → "Didn't find?" → Improve Matching (/ancestral/details) → back to Results
- Results → "Add Temple" (/ancestral/add-temple) → Confirmation → Home
- Family Dashboard (/family-dashboard) → "Remind Me on WhatsApp" [tracks: reminder_opt_in]

---

## 5. Shared Components

| Component | File | Lines | Description |
|-----------|------|-------|-------------|
| **Header** | `src/components/Header.tsx` | 230 | Sticky nav (`sticky top-0 z-50`), backdrop blur, Templo logo (gradient square + Sparkles icon), desktop nav (Temples, Ancestral Temple, How To, Followed count pill, Language selector, user dropdown/sign-in), mobile Sheet drawer with full-height nav links. Uses `useTemple()` for followed count, `useAuth()` for user state, `useLanguage()` for translations. |
| **Footer** | `src/components/Footer.tsx` | 171 | Spiritual quote banner, 4-col grid (Brand + social icons, Explore links, Services links, Community stats), "Made with ❤ for devotees worldwide", feedback popup trigger, copyright. |
| **FamilyConfirmationModal** | `src/components/FamilyConfirmationModal.tsx` | 134 | WhatsApp share modal (described in §3.10). |
| **ScrollToTop** | `src/components/ScrollToTop.tsx` | — | Auto-scrolls to top on route change. |
| **TempleCard** | `src/components/TempleCard.tsx` | — | Reusable temple card: image, name, deity, location, follow button. |
| **SearchBar** | `src/components/SearchBar.tsx` | — | Search input for temple filtering. |
| **QuickFilters** | `src/components/QuickFilters.tsx` | — | Filter chips (deity, state, city). |
| **AdvancedSearch** | `src/components/AdvancedSearch.tsx` | — | Extended multi-criteria search. |
| **ShareButton** | `src/components/ShareButton.tsx` | — | Generic share (Web Share API fallback to clipboard). |
| **LanguageSelector** | `src/components/LanguageSelector.tsx` | — | Tamil/English language switcher. |
| **LiveActivityCounter** | `src/components/LiveActivityCounter.tsx` | — | Shows live user count. |
| **FeaturedTemples** | `src/components/FeaturedTemples.tsx` | — | Featured temples section for homepage. |
| **SpiritualTip** | `src/components/SpiritualTip.tsx` | — | Daily devotional tip card. |
| **LivingFaith** | `src/components/LivingFaith.tsx` | — | Living faith section. |
| **FeedbackPopup** | `src/components/FeedbackPopup.tsx` | — | User feedback collection dialog. |
| **TemplesNearYou** | `src/components/TemplesNearYou.tsx` | — | Location-based temple suggestions. |
| **NavLink** | `src/components/NavLink.tsx` | — | Styled navigation link. |

### Components Present but Hidden for MVP

| Component | Feature Flag | Reason |
|-----------|-------------|--------|
| **TempleMusicPlayer** | `templeMusic: false` | Phase II |
| **TempleGallery** | `templeGallery: false` | Phase II |
| **TempleHistory** | `templeHistory: false` | Phase II |
| **LiveDarshan** | `liveDarshan: false` | No streaming infra |
| **TemplePatrons** | `patronsLeaderboard: false` | Phase II |
| **TempleChannel** | `templeChannel: true` | Visible but de-emphasized |
| **TempleReviews** | — | Phase II |

---

## 6. Context Providers & State

All contexts wrap the entire app in `src/App.tsx`:

| Context | File | Purpose | Key State |
|---------|------|---------|-----------|
| **LanguageProvider** | `src/context/LanguageContext.tsx` | Tamil/English i18n | `language`, `t()` translation function |
| **AuthProvider** | `src/context/AuthContext.tsx` | User auth state | `user`, `isAuthenticated`, `login()`, `logout()` |
| **TempleProvider** | `src/context/TempleContext.tsx` | Temple data | `temples[]`, `followedTemples[]`, `toggleFollowTemple()`, `getTempleById()` |
| **AncestralProvider** | `src/context/AncestralContext.tsx` | Ancestral flow state | `formData`, `suggestedTemples[]`, `selectedTemple`, `savedAncestralTemples[]`, `saveAncestralTemple()`, `saveSearchAttempt()` |
| **DonationProvider** | `src/context/DonationContext.tsx` | Donation flow | `donations[]`, `addDonation()` |
| **RecurringDonationProvider** | `src/context/RecurringDonationContext.tsx` | Recurring donations (Phase II) | `recurringDonations[]` |
| **BookingProvider** | `src/context/BookingContext.tsx` | Slot booking (Phase II) | `bookings[]` |
| **PoojaProvider** | `src/context/PoojaContext.tsx` | Pooja requests (Phase II) | — |

**Provider nesting order:** QueryClient → Tooltip → Language → Auth → Temple → Ancestral → Donation → RecurringDonation → Booking → Pooja.

---

## 7. Feature Flags

**File:** `src/config/featureFlags.ts` (42 lines)

| Flag | Value | Category |
|------|-------|----------|
| `ancestralTemple` | `true` | Phase I Core |
| `templeFollowing` | `true` | Phase I Core |
| `festivalTracking` | `true` | Phase I Core |
| `donations` | `true` | Phase I Core |
| `templeDetails` | `true` | Phase I Core |
| `poojaScheduleViewing` | `true` | Phase I Core |
| `templeChannel` | `true` | Phase I Core |
| `templeMusic` | `false` | Phase I Non-core |
| `templeGallery` | `false` | Phase I Non-core |
| `templeHistory` | `false` | Phase I Non-core |
| `liveDarshan` | `false` | Phase I Non-core |
| `genericTempleBrowsing` | `false` | Phase I Non-core |
| `templeDiscovery` | `false` | Phase I Non-core |
| `recurringDonations` | `false` | Phase II |
| `slotBooking` | `false` | Phase II |
| `poojaRequests` | `false` | Phase II |
| `inventory` | `false` | Phase II |
| `patronsLeaderboard` | `false` | Phase II |

**Helpers:**
- `isFeatureEnabled(flag)` — checks single flag.
- `isTransactionEnabled()` — returns true if any transaction feature is on.

---

## 8. Analytics & PMF Tracking

**File:** `src/utils/analytics.ts` (125 lines)

### 8.1 Event Types

| Event | Trigger Point | Metadata |
|-------|--------------|----------|
| `ancestral_start` | Intro page CTA click | — |
| `ancestral_show_matches` | Form submission | state, district, hasDeity, hasSurname |
| `ancestral_save_temple` | "Save as My Temple" click | templeId, templeName, confidence |
| `ancestral_whatsapp_share` | WhatsApp share button in modal | templeName, templeLocation |
| `ancestral_skip_share` | "Skip for now" in modal | templeName |
| `reminder_opt_in` | "Remind Me on WhatsApp" click | templeName |
| `donate_initiated` | "Pay via UPI" button click | templeId, templeName, amount, purpose |
| `donate_success` | Payment completed | templeId, amount, donationId |
| `dashboard_view` | Dashboard page load | — |
| `page_view` | Any page load | page name |

### 8.2 Storage

- Events stored in `localStorage` key: `pmf_events`.
- User ID auto-generated and stored in `localStorage` key: `pmf_user_id`.
- Format: `user_{timestamp}_{random9chars}`.
- Each event: `{ event, timestamp (ISO), metadata: { ...custom, userId } }`.
- DEV mode: console logs each event.

### 8.3 Calculated Metrics

| Metric | Formula |
|--------|---------|
| Flow Completion Rate | `saveTemple / ancestralStarts × 100` |
| WhatsApp Share Rate | `whatsappShares / saveTemple × 100` |
| Share Skip Rate | `skipShares / saveTemple × 100` |
| Reminder Opt-in Rate | `reminderOptIns / saveTemple × 100` |
| Donation Conversion Rate | `donateSuccess / saveTemple × 100` |
| Donation Initiated Rate | `donateInitiated / saveTemple × 100` |

### 8.4 Funnel Data

```
Start → Show Matches → Save Temple → WhatsApp Share → Reminder Opt-in → Donate
```

---

## 9. Data & Storage

| Data | Storage Method | Key / Location |
|------|---------------|----------------|
| Ancestral form inputs | AncestralContext + localStorage | Managed by context |
| Saved family temple | AncestralContext + localStorage | Managed by context |
| Followed temples | TempleContext + localStorage | Managed by context |
| Donation records | DonationContext (in-memory) | Session-only unless context persists |
| Analytics events | localStorage | `pmf_events` |
| User ID | localStorage | `pmf_user_id` |
| Reminder preference | localStorage | `festival_reminder_enabled` |
| Temple data | Static mock data | `src/data/temples.ts` |
| Priest data | Static mock data | `src/data/priests.ts` |
| Translations | Static object | `src/data/translations.ts` |

---

## 10. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.3 |
| Language | TypeScript | 5.8 |
| Build Tool | Vite | 5.4 |
| Styling | Tailwind CSS | 3.4 |
| Animation | tailwindcss-animate | 1.0 |
| UI Components | shadcn/ui (Radix primitives) | Latest |
| Routing | React Router DOM | 6.30 |
| State Management | React Context + localStorage | — |
| Data Fetching | TanStack React Query | 5.83 |
| Icons | Lucide React | 0.462 |
| Charts | Recharts | 2.15 |
| Forms | React Hook Form + Zod | 7.61 / 3.25 |
| Carousel | Embla Carousel React | 8.6 |
| Date Utilities | date-fns | 3.6 |
| Toasts | Sonner + Radix Toast | 1.7 / 1.2 |

---

## 11. Explicit Exclusions (NOT Built)

| Exclusion | Reason |
|-----------|--------|
| ❌ Backend / database | All localStorage — no server |
| ❌ Real UPI payment integration | Simulated 2s delay |
| ❌ Real WhatsApp API | Uses `wa.me` deep links only |
| ❌ Push notifications | WhatsApp opt-in placeholder only |
| ❌ Real user authentication | Mock auth with hardcoded demo account |
| ❌ PDF receipt download | Uses `window.print()` as workaround |
| ❌ Temple music player | Feature-flagged off |
| ❌ Temple photo gallery | Feature-flagged off |
| ❌ Temple history pages | Feature-flagged off |
| ❌ Live darshan streaming | Feature-flagged off, no infra |
| ❌ Community feed / patrons | Feature-flagged off |
| ❌ Recurring donations | Phase II, routes → ComingSoon |
| ❌ Slot booking | Phase II, routes → ComingSoon |
| ❌ Pooja requests | Phase II, routes → ComingSoon |
| ❌ Inventory management | Phase II |
| ❌ Admin CRUD operations | UI exists but no persistence |
| ❌ Real analytics backend | localStorage only |
| ❌ Multi-language beyond English | Tamil labels present but no full translation |
| ❌ Image CDN / optimization | Static imports only |

---

*End of document. Last generated: March 2026.*
