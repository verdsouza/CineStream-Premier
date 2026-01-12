import { ContentItem, ContentType, AccessType, User } from './types';

// TODO: OWNER (dveronica434@gmail.com) MUST CREATE THESE FORMS AND PASTE THE LINKS HERE
export const GOOGLE_FORM_REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder_registration/viewform";
export const GOOGLE_FORM_BOOKING_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfD_placeholder_booking/viewform";

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    description: 'In a dystopian future, a lone courier must transport the last organic seed across a neon-drenched wasteland guarded by cybernetic warlords.',
    type: ContentType.MOVIE,
    thumbnailUrl: '/Neon_Horizon_2026.jpg',
    backdropUrl: '/Neon_Horizon_Backdrop.jpg',
    rating: 'PG-13',
    duration: '2h 15m',
    genre: ['Sci-Fi', 'Action'],
    accessType: AccessType.PREMIUM,
    price: 4.99,
    trailerId: 'LGu3GaZLnAk',
    premiumVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1' // Sample secure link
  },
  {
    id: '2',
    title: 'His & Hers S01 (2026)',
    description: 'A deep-sea documentary team discovers something ancient waking up in the Mariana Trench.',
    type: ContentType.MOVIE,
    thumbnailUrl: '/His_And_Hers_S01_2026.jpg',
    backdropUrl: '/His_And_Hers_S01_2026.jpg',
    rating: 'R',
    duration: '1h 50m',
    genre: ['Thriller', 'Horror'],
    accessType: AccessType.FREE,
    price: 0,
    trailerId: 'LGu3GaZLnAk',
    streamUrls: {
        server1: "https://short.icu/3mNJdEVpA?thumbnail=https://freestreaming.vercel.app/Auntypreneur_2025.jpg",
        server2: "https://daddyhd.com/stream/stream-322.php",
        server3: "https://vidsrc.cc/v2/embed/movie/1460778",
        server4: "https://amg00453-reuters-amg00453c1-vizio-us-2107.playouts.now.amagi.tv/playlist/amg00453-reuters-reuters-vizious/playlist.m3u8"
    }
  },
  {
    id: '3',
    title: 'Velvet Shadows',
    description: 'A high-stakes drama about a jazz musician who gets entangled with the mob in 1920s New Orleans.',
    type: ContentType.SERIES,
    thumbnailUrl: '/Velvet_Shadows_S01_2026.jpg',
    backdropUrl: '/Velvet_Shadows_Backdrop.jpg',
    rating: 'TV-MA',
    duration: '1 Season',
    genre: ['Drama', 'Crime'],
    accessType: AccessType.PREMIUM,
    price: 9.99,
    trailerId: 'LGu3GaZLnAk'
  },
  {
    id: '4',
    title: 'Cyber Drift',
    description: 'Illegal street racing meets virtual reality hacking in this high-octane anime adaptation.',
    type: ContentType.MOVIE,
    thumbnailUrl: '/Cyber_Drift_Anime_2026.jpg',
    backdropUrl: '/Cyber_Drift_Backdrop.jpg',
    rating: 'PG-13',
    duration: '1h 45m',
    genre: ['Anime', 'Action'],
    accessType: AccessType.FREE,
    price: 0,
    trailerId: 'LGu3GaZLnAk',
    streamUrls: {
        server1: "https://vidsrc.cc/v2/embed/movie/1460778"
    }
  },
  {
    id: '5',
    title: 'Last Echo',
    description: 'An astronaut stranded on a derelict station begins to hear a voice that claims to be the station itself.',
    type: ContentType.MOVIE,
    thumbnailUrl: '/Last_Echo_Movie_2025.jpg',
    backdropUrl: '/Last_Echo_Backdrop.jpg',
    rating: 'R',
    duration: '2h 05m',
    genre: ['Sci-Fi', 'Mystery'],
    accessType: AccessType.PREMIUM,
    price: 5.99,
    trailerId: 'LGu3GaZLnAk'
  },
  {
    id: '6',
    title: 'Kingdom of Glass',
    description: 'A fantasy epic where magic is fueled by memories, and a young queen must forget her past to save her kingdom.',
    type: ContentType.SERIES,
    thumbnailUrl: '/Kingdom_Of_Glass_S03.jpg',
    backdropUrl: '/Kingdom_Of_Glass_Backdrop.jpg',
    rating: 'TV-14',
    duration: '3 Seasons',
    genre: ['Fantasy', 'Adventure'],
    accessType: AccessType.PREMIUM,
    price: 12.99,
    trailerId: 'LGu3GaZLnAk'
  }
];

export const MOCK_USER: User = {
  id: 'u1',
  email: 'demo@example.com',
  name: 'Demo User',
  role: 'user'
};

export const MOCK_ADMIN: User = {
  id: 'a1',
  email: 'dveronica434@gmail.com',
  name: 'Admin',
  role: 'admin'
};

export const TIME_SLOTS = [
  "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"
];