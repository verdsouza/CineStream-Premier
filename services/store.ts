import { Booking, ContentItem, User, SiteConfig } from '../types';
import { MOCK_CONTENT } from '../constants';

const KEYS = {
  CONTENT: 'cine_content',
  BOOKINGS: 'cine_bookings',
  USER: 'cine_user',
  CONFIG: 'cine_config',
};

// Custom Event Name for Cross-Component Sync
const STORE_EVENT = 'cine_store_update';

// Helper to trigger UI updates
const triggerUpdate = () => {
    window.dispatchEvent(new Event(STORE_EVENT));
    window.dispatchEvent(new Event('storage')); // For cross-tab
};

// Helper for safe parsing
const safeParse = <T>(json: string | null, fallback: T): T => {
    if (!json) return fallback;
    try {
        return JSON.parse(json);
    } catch (e) {
        console.warn('Failed to parse storage item, returning fallback', e);
        return fallback;
    }
};

// Initialize
const init = () => {
  if (!localStorage.getItem(KEYS.CONTENT)) {
    localStorage.setItem(KEYS.CONTENT, JSON.stringify(MOCK_CONTENT));
  }
  if (!localStorage.getItem(KEYS.BOOKINGS)) {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([]));
  }
  if (!localStorage.getItem(KEYS.CONFIG)) {
    const defaultConfig: SiteConfig = {
      siteName: 'CineStream Premier',
      heroTitle: 'Experience Cinema. Exclusively.',
      heroSubtitle: 'Book your private viewing slot for the world\'s most anticipated releases.',
      contactEmail: 'dveronica434@gmail.com',
      googleFormRegistrationUrl: 'https://docs.google.com/forms/create', 
      paypalUrl: 'https://paypal.me/RnDServicesMumbai',
      showHero: true,
      showTrending: true,
      showBenefits: true,
      googleAnalyticsId: '',
      searchConsoleVerification: '',
      globalKeywords: 'streaming, movies, premium, cinema, 4k, exclusive',
      seoDescription: 'The premier destination for exclusive, high-bitrate movie streaming slots.'
    };
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(defaultConfig));
  }
};

init();

export const Store = {
  // Event Name for Listeners
  STORE_EVENT,

  getContent: (): ContentItem[] => {
    return safeParse(localStorage.getItem(KEYS.CONTENT), []);
  },
  
  getContentById: (id: string): ContentItem | undefined => {
    const content = safeParse<ContentItem[]>(localStorage.getItem(KEYS.CONTENT), []);
    return content.find((c: ContentItem) => c.id === id);
  },

  updateContent: (content: ContentItem[]) => {
    localStorage.setItem(KEYS.CONTENT, JSON.stringify(content));
    triggerUpdate();
  },

  // CRITICAL: Force reset from code constants
  resetContentToDefaults: () => {
    localStorage.setItem(KEYS.CONTENT, JSON.stringify(MOCK_CONTENT));
    triggerUpdate();
  },

  getBookings: (): Booking[] => {
    return safeParse(localStorage.getItem(KEYS.BOOKINGS), []);
  },

  getBookingsByUser: (email: string): Booking[] => {
    const bookings = safeParse<Booking[]>(localStorage.getItem(KEYS.BOOKINGS), []);
    return bookings.filter((b: Booking) => b.userEmail === email);
  },

  createBooking: (booking: Booking) => {
    const bookings = safeParse<Booking[]>(localStorage.getItem(KEYS.BOOKINGS), []);
    bookings.push(booking);
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
    triggerUpdate();
  },

  updateBookingStatus: (id: string, status: Booking['status'], accessCode?: string) => {
    const bookings = safeParse<Booking[]>(localStorage.getItem(KEYS.BOOKINGS), []);
    const updated = bookings.map((b: Booking) => {
        if (b.id === id) {
            return { ...b, status, accessCode: accessCode || b.accessCode };
        }
        return b;
    });
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
    triggerUpdate();
  },

  getCurrentUser: (): User | null => {
    return safeParse(localStorage.getItem(KEYS.USER), null);
  },

  login: (email: string, password?: string): User => {
    if (email.trim() === 'admin' && password === 'admin') {
         const adminUser: User = { 
             id: 'admin-root', 
             email: 'admin', 
             name: 'System Administrator', 
             role: 'admin' 
         };
         localStorage.setItem(KEYS.USER, JSON.stringify(adminUser));
         triggerUpdate();
         return adminUser;
    }

    const isLegacyAdmin = email.toLowerCase().trim() === 'dveronica434@gmail.com';
    const user: User = isLegacyAdmin 
      ? { id: 'admin-legacy', email: email, name: 'Owner', role: 'admin' }
      : { id: Date.now().toString(), email: email, name: email.split('@')[0], role: 'user' };
      
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
    triggerUpdate();
    return user;
  },

  logout: () => {
    localStorage.removeItem(KEYS.USER);
    triggerUpdate();
  },

  getConfig: (): SiteConfig => {
    const defaultConfig: SiteConfig = {
        siteName: 'CineStream Premier',
        heroTitle: 'Experience Cinema. Exclusively.',
        heroSubtitle: 'Book your private viewing slot.',
        contactEmail: 'dveronica434@gmail.com',
        googleFormRegistrationUrl: '',
        paypalUrl: '',
        showHero: true,
        showTrending: true,
        showBenefits: true,
        googleAnalyticsId: '',
        searchConsoleVerification: '',
        globalKeywords: 'streaming, movies, premium, cinema, 4k, exclusive',
        seoDescription: 'The premier destination for exclusive, high-bitrate movie streaming slots.'
    };
    return safeParse(localStorage.getItem(KEYS.CONFIG), defaultConfig);
  },

  updateConfig: (config: SiteConfig) => {
    localStorage.setItem(KEYS.CONFIG, JSON.stringify(config));
    triggerUpdate();
  }
};