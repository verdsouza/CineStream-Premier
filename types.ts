export enum ContentType {
  MOVIE = 'MOVIE',
  SERIES = 'SERIES',
}

export enum AccessType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  thumbnailUrl: string;
  backdropUrl: string;
  rating: string;
  duration: string;
  genre: string[];
  accessType: AccessType;
  price?: number; // 0 or undefined for free
  videoUrl?: string; // In a real app, this is protected
  premiumVideoUrl?: string; // The secret secure iframe/URL
  trailerId?: string; // YouTube Video ID
  streamUrls?: {
    server1?: string;
    server2?: string;
    server3?: string;
    server4?: string;
  };
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export interface Booking {
  id: string;
  userId: string;
  userEmail: string;
  contentId: string;
  contentTitle: string;
  slotStartTime: string; // ISO String
  slotEndTime: string;   // ISO String
  accessCode: string;    // Token/API Key
  status: 'active' | 'completed' | 'expired' | 'pending';
  pricePaid: number;
  transactionId?: string; // PayPal Transaction ID
}

export interface SiteConfig {
  siteName: string;
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
  // Dynamic Form Links managed by Admin
  googleFormRegistrationUrl: string;
  paypalUrl: string; // Updated from googleFormBookingUrl
  // CMS Toggles
  showHero: boolean;
  showTrending: boolean;
  showBenefits: boolean;
  // SEO Configuration
  googleAnalyticsId?: string;
  searchConsoleVerification?: string;
  globalKeywords?: string;
  seoDescription?: string;
}

export type Slot = {
  id: string;
  time: string; // "14:00"
  available: boolean;
}