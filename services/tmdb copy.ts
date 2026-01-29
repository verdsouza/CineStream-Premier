import { MediaItem } from "../types";

const API_KEY = (import.meta as any).env?.VITE_TMDB_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

// FIXED TIME HELPER
// This snaps the time to the current hour (e.g., if it's 14:45, it becomes 14:00).
// This ensures that 'relative' times like "+2 hours" result in a FIXED timestamp (e.g., 16:00)
// that does not drift or change every time you refresh the page within that hour.
const getFixedMatchTime = (hoursAdd: number, minutesSet: number = 0) => {
  const date = new Date();
  date.setMinutes(0);      // Snap to top of the hour
  date.setSeconds(0);      // Zero out seconds
  date.setMilliseconds(0); // Zero out milliseconds
  
  // Add hours relative to the stable top-of-the-hour time
  date.setHours(date.getHours() + hoursAdd);
  
  // Set the minutes explicitly (e.g., kick off at :30)
  date.setMinutes(minutesSet);
  
  return date.toISOString();
};

// Helper for Specific UTC Time today (e.g., set to 23:00 UTC today to test date rollover)
const getSpecificTime = (hour: number, minute: number = 0) => {
    const date = new Date();
    date.setUTCHours(hour, minute, 0, 0);
    return date.toISOString();
}

export const UNIQUE_SPORTS: MediaItem[] = [
  {
    id: "womens-premier-league",
    title: "Women's Premier League : Royal Challengers Bangalore W vs UP Warriorz W",
    poster_path: "https://femalecricket.com/wp-content/uploads/2026/01/WPL_Match-5-Royal-Challengers-Bengaluru-Women-vs-UP-Warriorz-Women-1200x788.jpg",
    backdrop_path: "https://femalecricket.com/wp-content/uploads/2026/01/WPL_Match-5-Royal-Challengers-Bengaluru-Women-vs-UP-Warriorz-Women-1200x788.jpg",
    // Fixed Time: Current Hour - 1 (e.g. if now is 14:20, this was 13:00). Ensures it is LIVE.
    release_date: getFixedMatchTime(7, 30), 
    vote_average: 9.2,
    duration: "Live",
    media_type: 'sports',
    genres: ["Cricket", "Women's Premier League"],
    streams: {
      "Server 1 (Main)": "https://embedsports.top/embed/charlie/up-warriorz-vs-royal-challengers-bengaluru-1629480816/1",
      "Server 2 (Backup)": "https://daddyhd.com/stream/stream-598.php",
      "Server 3 (Backup)": "https://daddyhd.com/stream/stream-591.php",
      "Server 4 (Backup)": "https://daddyhd.com/stream/stream-417.php",
      "Server 5 (Backup)": "https://daddyhd.com/stream/stream-36.php",
    },
    overview: "Live coverage of the Women's Premier League : RCB (W) vs UPW (W). Title decider match.",
  },
  {
    id: "twenty20",
    title: "Twenty20 : South Africa vs West Indie",
    poster_path: "https://www.icccricketschedule.com/_image?href=https%3A%2F%2Fimg.icccricketschedule.com%2Fuploads%2Fimages%2F202601%2Fsouth-africa-vs-west-indies-2026_1200x675_3e5557.jpg&w=1200&h=675&q=75&f=webp",
    backdrop_path: "https://www.icccricketschedule.com/_image?href=https%3A%2F%2Fimg.icccricketschedule.com%2Fuploads%2Fimages%2F202601%2Fsouth-africa-vs-west-indies-2026_1200x675_3e5557.jpg&w=1200&h=675&q=75&f=webp",
    // Fixed Time: Current Hour + 1, :30 minutes. (e.g. if now is 14:20, this is 15:30 fixed).
    release_date: getFixedMatchTime(9, 30),
    vote_average: 9.5,
    duration: "Live",
    media_type: 'sports',
    genres: ["Cricket", "Twenty20"],
    streams: {
      "Server 1 (Main)": "https://embedsports.top/embed/charlie/south-africa-vs-west-indies-1629480817/1",
      "Server 2 (Backup)": "https://daddyhd.com/stream/stream-346.php",
      "Server 3 (Backup)": "https://daddyhd.com/stream/stream-65.php",
      "Server 4 (Backup)": "https://daddyhd.com/stream/stream-38.php",
      "Server 5 (Backup)": "https://daddyhd.com/stream/stream-368.php",
      "Server 6 (Backup)": "https://daddyhd.com/stream/stream-412.php",   
    },
    overview: "T20 Live. Twenty20 : South Africa vs West Indie",
  },
  {
    id: "farmers-insurance-open",
    title: "PGA Tour Farmers Insurance Open (2026)",
    poster_path: "https://espnpressroom.com/us/files/2026/01/Farmers-Graphic-2.png",
    backdrop_path: "https://espnpressroom.com/us/files/2026/01/Farmers-Graphic-2.png",
    // Fixed Time: Current Hour + 4 hours.
    release_date: getFixedMatchTime(9, 30),
    vote_average: 8.9,
    duration: "Live",
    media_type: 'sports',
    genres: ["Golf", "PGA Tour"],
    streams: {
      "Server 1 (Main)": "https://embedsports.top/embed/charlie/farmers-insurance-open-featured-holes-3-8-11-and-16-first-round-1629480833/1",
      "Server 2 (Backup)": "https://daddyhd.com/stream/stream-70.php",
      "Server 3 (Backup)": "https://daddyhd.com/stream/stream-318.php",
      "Server 4 (Backup)": "https://daddyhd.com/stream/stream-422.php",
      "Server 5 (Backup)": "https://daddyhd.com/stream/stream-588.php",
    },
    overview: "Watch Live Golf: PGA Tour Farmers Insurance Open",
  },
  {
    id: "match-early-test",
    title: "TNA iMPACT! Wrestling: Early Test Match",
    poster_path: "https://hips.hearstapps.com/hmg-prod/images/tna-impact-wrestling-6536da30b4f27.jpeg?resize=980:*",
    backdrop_path: "https://hips.hearstapps.com/hmg-prod/images/tna-impact-wrestling-6536da30b4f27.jpeg?resize=980:*",
    // Fixed Time: Current Hour + 8 hours.
    release_date: getFixedMatchTime(18, 30),
    vote_average: 8.7,
    duration: "Live",
    media_type: 'sports',
    genres: ["Fighting", "TNA Wrestling"],
    streams: {
      "Server 1 (Main)": "https://embedsports.top/embed/admin/ppv-tna-impact/1",
      "Server 2 (Backup)": "https://embedsports.top/embed/admin/ppv-tna-impact/2",
      "Server 3 (Backup)": "https://daddyhd.com/stream/stream-303.php",
      "Server 4 (Backup)": "https://daddyhd.com/stream/stream-409.php",
    },
    overview: "Live TNA Wrestling. Check TNA Wrestling schedule for more upcoming matches.",
  },
  {
    id: "match-ended-1",
    title: "Benfica vs Real Madrid - Key Moments - UEFA Champions League 2026",
    poster_path: "https://www.aljazeera.com/wp-content/uploads/2026/01/2026-01-28T222717Z_126287702_UP1EM1S1PJ1XC_RTRMADP_3_SOCCER-CHAMPIONS-SLB-RMA-1769640390.jpg?resize=1920%2C1080",
    backdrop_path: "https://www.aljazeera.com/wp-content/uploads/2026/01/2026-01-28T222717Z_126287702_UP1EM1S1PJ1XC_RTRMADP_3_SOCCER-CHAMPIONS-SLB-RMA-1769640390.jpg?resize=1920%2C1080",
    // Fixed Time: 24 hours ago exactly.
    release_date: getFixedMatchTime(-4, 0),
    vote_average: 9.0,
    duration: "Replay",
    media_type: 'sports',
    genres: ["Soccer", "UEFA Champions"],
    streams: {
       "Server 1 (Highlights)": "https://www.youtube.com/embed/dRd-sNzUlJk?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=dRd-sNzUlJk",
    },
    overview: "Full Event Replay. Main card and prelims.",
  },
  {
    id: "match-ended-2",
    title: "SPURS at ROCKETS | FULL GAME HIGHLIGHTS | January 28, 2026",
    poster_path: "https://img.youtube.com/vi/KgNiXIRYgJ8/maxresdefault.jpg",
    backdrop_path: "https://img.youtube.com/vi/KgNiXIRYgJ8/maxresdefault.jpg  ",
    // Fixed Time: 24 hours ago exactly.
    release_date: getFixedMatchTime(-4, 0),
    vote_average: 9.0,
    duration: "Replay",
    media_type: 'sports',
    genres: ["Basketball", "NBA"],
    streams: {
       "Server 1 (Highlights)": "https://www.youtube.com/embed/KgNiXIRYgJ8?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=KgNiXIRYgJ8",
    },
    overview: "Full Event Replay. Main card and prelims.",
  },
  {
    id: "match-ended-3",
    title: "BULLS at PACERS | FULL GAME HIGHLIGHTS | January 28, 2026",
    poster_path: "https://img.youtube.com/vi/OVTaT_HAyos/maxresdefault.jpg",
    backdrop_path: "https://img.youtube.com/vi/OVTaT_HAyos/maxresdefault.jpg",
    // Fixed Time: 24 hours ago exactly.
    release_date: getFixedMatchTime(-4, 0),
    vote_average: 9.0,
    duration: "Replay",
    media_type: 'sports',
    genres: ["Basketball", "NBA"],
    streams: {
       "Server 1 (Highlights)": "https://www.youtube.com/embed/OVTaT_HAyos?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=OVTaT_HAyos",
    },
    overview: "Full Event Replay. Main card and prelims.",
  },
];

// Live TV content
export const UNIQUE_TV_LIVE: MediaItem[] = [
  {
    id: "alzazeera-news-channel-hd",
    title: "Al Jazeera News Live HD",
    poster_path: "https://www.vhv.rs/dpng/d/492-4928236_al-jazeera-news-logo-hd-png-download.png",
    backdrop_path: "https://www.vhv.rs/dpng/d/492-4928236_al-jazeera-news-logo-hd-png-download.png",
    release_date: "2026-01-20",
    vote_average: 7.8,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["Al Jazeera", "Live", "News"],
    streams: {
      "Server 1": "https://d1cy85syyhvqz5.cloudfront.net/v1/master/7b67fbda7ab859400a821e9aa0deda20ab7ca3d2/aljazeeraLive/AJE/index.m3u8",
    },
    overview:
      "Watch the Latest world news updates Channel live in high definition. Enjoy a wide range of news updates from various genres, all in stunning HD quality.",
  },
  {
    id: "cnn-international-channel-hd",
    title: "CNN International Live HD",
    poster_path: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/960px-CNN_International_logo.svg.png",
    backdrop_path: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/CNN_International_logo.svg/960px-CNN_International_logo.svg.png",
    release_date: "2026-01-20",
    vote_average: 7.8,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["CNN", "Live", "News"],
    streams: {
      "Server 1": "https://amg01918-cnnus-amg01918c1-vizio-us-1813.playouts.now.amagi.tv/playlist/amg01918-cnnus-cnnheadlines-vizious/playlist.m3u8",
    },
    overview:
      "Watch the Latest world news updates Channel live in high definition. Enjoy a wide range of news updates from various genres, all in stunning HD quality.",
  },
  {
    id: "abc-channel-hd",
    title: "ABC Live HD",
    poster_path: "https://i.pinimg.com/736x/16/3b/41/163b41fe4cc84461bfa46445bb7e8e04.jpg",
    backdrop_path: "https://i.pinimg.com/736x/16/3b/41/163b41fe4cc84461bfa46445bb7e8e04.jpg",
    release_date: "2026-01-20",
    vote_average: 7.8,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["ABC", "Live", "News"],
    streams: {
      "Server 1": "https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8",
    },
    overview:
      "Watch the Latest world news updates Channel live in high definition. Enjoy a wide range of news updates from various genres, all in stunning HD quality.",
  },
  {
    id: "euronews-channel-hd",
    title: "Euronews Live HD",
    poster_path: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Euronews_Logo_2025.svg",
    backdrop_path: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Euronews_Logo_2025.svg",
    release_date: "2026-01-20",
    vote_average: 7.8,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["Euronews", "Live", "News"],
    streams: {
      "Server 1": "https://amg00882-amg00882c2-lg-au-4259.playouts.now.amagi.tv/playlist.m3u8",
    },
    overview:
      "Watch the Latest world news updates Channel live in high definition. Enjoy a wide range of news updates from various genres, all in stunning HD quality.",
  },
  {
    id: "bbcnews-channel-hd",
    title: "BBC News Live HD",
    poster_path: "https://i.pinimg.com/736x/59/98/4d/59984d90139cb8e9ac6bbed0e849efc8.jpg",
    backdrop_path: "https://i.pinimg.com/736x/59/98/4d/59984d90139cb8e9ac6bbed0e849efc8.jpg",
    release_date: "2026-01-20",
    vote_average: 7.8,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["BBC News", "Live", "News"],
    streams: {
      "Server 1": "https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_news_channel_hd/t=3840/v=pv14/b=5070016/main.m3u8",
    },
    overview:
      "Watch the Latest world news updates Channel live in high definition. Enjoy a wide range of news updates from various genres, all in stunning HD quality.",
  },
  {
    id: "reuters-news-channel-hd",
    title: "Reuters News Live HD",
    poster_path: "https://i.pinimg.com/564x/25/03/11/250311255660f18f2d603fa7e415a82f.jpg",
    backdrop_path: "https://i.pinimg.com/564x/25/03/11/250311255660f18f2d603fa7e415a82f.jpg",
    release_date: "2026-01-20",
    vote_average: 7.8,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["Reuters News", "Live", "News"],
    streams: {
      "Server 1": "https://amg00453-reuters-amg00453c1-vizio-us-2107.playouts.now.amagi.tv/playlist/amg00453-reuters-reuters-vizious/playlist.m3u8",
    },
    overview:
      "Watch the Latest world news updates Channel live in high definition. Enjoy a wide range of news updates from various genres, all in stunning HD quality.",
  },
  {
    id: "usa-today-news-channel-hd",
    title: "USA Today News Live HD",
    poster_path: "https://w7.pngwing.com/pngs/109/179/png-transparent-usa-today-mountain-view-key-west-newspaper-business-usc-logo-blue-text-trademark.png",
    backdrop_path: "https://w7.pngwing.com/pngs/109/179/png-transparent-usa-today-mountain-view-key-west-newspaper-business-usc-logo-blue-text-trademark.png",
    release_date: "2026-01-20",
    vote_average: 7.8,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["USA Today News", "Live", "News"],
    streams: {
      "Server 1": "https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg00731-gannettcoinc-usatodaynews-vizious/playlist.m3u8",
    },
    overview:
      "Watch the Latest world news updates Channel live in high definition. Enjoy a wide range of news updates from various genres, all in stunning HD quality.",
  },
  {
    id: "fox-weather-channel-hd",
    title: "Fox Weather Live HD",
    poster_path: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fox_Weather_logo.svg/500px-Fox_Weather_logo.svg.png",
    backdrop_path: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Fox_Weather_logo.svg/500px-Fox_Weather_logo.svg.png",
    release_date: "2026-01-20",
    vote_average: 7.8,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["Fox Weather", "Live", "News"],
    streams: {
      "Server 1": "https://247wlive.foxweather.com/stream/index.m3u8",
    },
    overview:
      "Watch the Latest world news updates Channel live in high definition. Enjoy a wide range of news updates from various genres, all in stunning HD quality.",
  },
  {
    id: "go2travel-live-channel",
    title: "Go2Travel Live Channel",
    poster_path: "https://play-lh.googleusercontent.com/fAQewlj4O6OWRCReMV-ysG2Ip3i7Yz3TBxhFEeipV0BqK9nQk_siCt36ksBIZGmglGUt",
    backdrop_path: "https://play-lh.googleusercontent.com/fAQewlj4O6OWRCReMV-ysG2Ip3i7Yz3TBxhFEeipV0BqK9nQk_siCt36ksBIZGmglGUt",
    release_date: "2026-01-20",
    vote_average: 8.3,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["Go2Travel", "Live", "Entertainment"],
    streams: {
      "Server 1": "https://go2thls.wns.live/hls/stream.m3u8"
     
    },
    overview: "Live comedy shows, stand-up specials, and funny content 24/7.",
  },
   {
    id: "crime-investigation-live-channel",
    title: "Crime + Investigation",
    poster_path: "/images/tv/investigationdiscovery.jpg",
    backdrop_path: "/images/tv/investigationdiscovery.jpg",
    release_date: "2026-01-20",
    vote_average: 8.3,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["Drama", "Live", "Entertainment"],
    streams: {
      "Server 1": "https://fl31.moveonjoy.com/Crime_and_Investigation_Network/tracks-v1a1/mono.ts.m3u8",
      "Server 2": "https://amg00376-magellan-amg00376c12-samsung-au-1725.playouts.now.amagi.tv/ts-us-w2-n1/playlist/amg00376-magellantv-truecrimenowaunzin-samsungau/cb433e4f7b7b6fdccb993e6cd3f715a0d1076a8b5d32d03765f95cb52abc4013dce0ad92f24ef1684c8778873f5e32161e77b57dce7d01d9de71b8366d2211709188fa7ddd800278f298537f4de6286508ba1110d3224d218fa95223ad0998554953e400655372aab80af6294bd5f352c92074deb2dc653d635a419f435df5c30ff5aea3045add6fa6af1f4e873b47e5864498861bbb9d82539b469b77f0429d8fa2d886129f85c46aff53b330080b7224ccb246f9b1353771070b43fe441b047360e8aa87fb4a7cb5534248fdecb9c70f9d3deff9e805fd55c16db6409624822b8b04a2f347a3acc1bf08216be1ac5f10a4651e04ca7b1713c4fec8212c26674439bc7b594acc7fd1212a77b3f5c21785c41aac7b42efbb441222c99d499ad2e7cdbff0c57d952bcec8e38b7d6c7a235552c80df9da5ad2278b2cf38e0b770804048c8a45c883ee5b32494692cf0b874455ea8dcbcbf4260fe74c571ae469d25e454bc9376773ac6dda922e63842345d46169b5087bd00cacf81ff4a1daf70f74e08d900cac399dc060b8c10ba769334e11f3a37c2d22624990bf36436003802f82f4c5ee7005059687eef6d25c3502795a123b82ece37f8c9d824e3913d258326f641a75c45136087eace4ab482d8153dd9acf43dd2308337c976c284a/25/1920x1080_5500000/index.m3u8",
      "Server 3": "https://a-cdn.klowdtv.com/live3/law_720p/playlist.m3u8",
      "Server 4": "https://langleyproductions-cops-2-eu.rakuten.wurl.tv/playlist.m3u8",
      "Server 5": "https://daddyhd.com/stream/stream-332.php",
      "Server 6": "https://daddyhd.com/stream/stream-665.php",
    },
    overview: "Live comedy shows, stand-up specials, and funny content 24/7.",
  },
  {
    id: "hallmark-movies",
    title: "Hallmark Movies Mysteries",
    poster_path: "https://i.ebayimg.com/images/g/ePMAAOSwTgxnQ2mv/s-l1200.jpg",
    backdrop_path: "https://i.ebayimg.com/images/g/ePMAAOSwTgxnQ2mv/s-l1200.jpg",
    release_date: "2024-01-20",
    vote_average: 8.3,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["Movies", "Live", "Entertainment"],
    streams: {
      "Server 1": "https://fl61.moveonjoy.com/HALLMARK_MOVIES_MYSTERIES/tracks-v1a1/mono.ts.m3u8"     
    },
    overview: "Live comedy shows, stand-up specials, and funny content 24/7.",
  },
  {
    id: "history-usa-channel",
    title: "History USA Channel",
    poster_path: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/History_%282021%29.svg/250px-History_%282021%29.svg.png",
    backdrop_path: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/History_%282021%29.svg/250px-History_%282021%29.svg.png",
    release_date: "2024-01-20",
    vote_average: 8.4,
    duration: "24/7",
    media_type: 'tv_live',
    genres: ["History USA", "Educational", "Live"],
    streams: {
      "Server 1": "https://fl7.moveonjoy.com/history_channel/tracks-v1a1/mono.ts.m3u8"
    },
    overview:
      "Live documentary channel featuring nature, science, and history content.",
  },
];
// 15 UNIQUE MOVIES (ALL FROM TMDB)
export const UNIQUE_MOVIES: MediaItem[] = [
  {
    id: "1236153",
    title: "Mercy (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/pyok1kZJCfyuFapYXzHcy7BLlQa.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/pyok1kZJCfyuFapYXzHcy7BLlQa.jpg",
    release_date: "2026-01-16",
    vote_average: 6.4,
    duration: "2h 40m",
    media_type: 'movie',
    genres: ["Action ", "Adventure", "Comedy"],
    streams: {
      "Server 1": "https://xprime.today/watch/1236153",
      "Server 2": "https://cinemaos.tech/player/1236153",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1236153/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://short.icu/AanpBKBQc?thumbnail=https://media.themoviedb.org/t/p/w780/mHC8tSRYfAKGh2jaSNQMSzGdbOW.jpg",
      "Server 5 - HINDI": "https://byseqekaho.com/e/j1pt36tomnsn",
      "Server 6": "https://www.cinezo.net/watch/movie/1236153",
      "Server 7": "https://vidsrc-embed.ru/embed/movie/1236153",
      "Server 8": "https://api.cinezo.net/embed/tmdb-movie-1236153",
    },
    overview:
      "In the near future, a detective stands on trial accused of murdering his wife. He has ninety minutes to prove his innocence to the advanced AI Judge he once championed, before it determines his fate.",
  },
  {
    id: "1584215",
    title: "The Internship (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/fYqSOkix4rbDiZW0ACNnvZCpT6X.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/fYqSOkix4rbDiZW0ACNnvZCpT6X.jpg",
    release_date: "2026-01-16",
    vote_average: 5.6,
    duration: "2h 40m",
    media_type: 'movie',
    genres: ["Action ", "Adventure", "Thriller"],
    streams: {
      "Server 1": "https://xprime.today/watch/1584215",
      "Server 2": "https://cinemaos.tech/player/1584215",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1584215/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI": "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5": "https://www.cinezo.net/watch/movie/1584215",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1584215",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1584215",
    },
    overview:
      "A CIA-trained assassin recruits other graduates from her secret childhood program, The Internship, to violently destroy the organization. The CIA fights back with deadly force.",
  },
  {
    id: "1412598",
    title: "Killer Whale (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/cqbXxAw9sUr4tJ5ffEwtnz6IL9o.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/cqbXxAw9sUr4tJ5ffEwtnz6IL9o.jpg",
    release_date: "2026-01-16",
    vote_average: 6.5,
    duration: "2h 40m",
    media_type: 'movie',
    genres: ["Thriller ", "Horror", "Action"],
    streams: {
      "Server 1": "https://xprime.today/watch/1412598",
      "Server 2": "https://cinemaos.tech/player/1412598",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1412598/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5": "https://www.cinezo.net/watch/movie/1412598",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1412598",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1412598",
    },
    overview:
      "Follows best friends Maddie and Trish as they find themselves trapped in a remote lagoon with the dangerous killer whale named Ceto.",
  },
  {
    id: "1443762",
    title: "The Big Fake (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/qNEL6chkH2s6gwvt0Jt9NfiXG8m.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/qNEL6chkH2s6gwvt0Jt9NfiXG8m.jpg",
    release_date: "2026-01-16",
    vote_average: 4.6,
    duration: "2h 40m",
    media_type: 'movie',
    genres: ["Thriller ", "Horror", "Action"],
    streams: {
      "Server 1": "https://xprime.today/watch/1443762",
      "Server 2": "https://cinemaos.tech/player/1443762",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1443762/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://short.icu/lfpJnzkNlk?thumbnail=https://media.themoviedb.org/t/p/w780/uHavtqbnMDcwqVK9Y94ZQSWxtCw.jpg",
      "Server 5 - HINDI": "https://byseqekaho.com/e/09jtnsnu0bwp",
      "Server 6": "https://www.cinezo.net/watch/movie/1443762",
      "Server 7": "https://vidsrc-embed.ru/embed/movie/1443762",
      "Server 8": "https://api.cinezo.net/embed/tmdb-movie-1443762",
    },
    overview:
      "Toni Chichiarelli arrives in Rome with the dream of becoming a painter, but his talent leads him elsewhere — from art galleries to state secrets. Between art, crime, and power, his signature ends up everywhere — even in the history of Italy.",
  },
  {
    id: "1306368",
    title: "The Rip (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/p4bW2sJKAwcHuLpfoZK7Zo63osA.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/p4bW2sJKAwcHuLpfoZK7Zo63osA.jpg",
    release_date: "2026-01-16",
    vote_average: 5.6,
    duration: "2h 40m",
    media_type: 'movie',
    genres: ["Action ", "Adventure", "Comedy"],
    streams: {
      "Server 1": "https://xprime.today/watch/1306368",
      "Server 2": "https://cinemaos.tech/player/1306368",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1306368/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://short.icu/XQE80AhAa?thumbnail=https://media.themoviedb.org/t/p/w500/3F2EXWF1thX0BdrVaKvnm6mAhqh.jpg",
      "Server 5 - HINDI": "https://byseqekaho.com/e/faaqrf79oazr",
      "Server 6": "https://www.cinezo.net/watch/movie/1306368",
      "Server 7": "https://vidsrc-embed.ru/embed/movie/1306368",
      "Server 8": "https://api.cinezo.net/embed/tmdb-movie-1306368",
    },
    overview:
      "Trust frays when a team of Miami cops discovers millions in cash inside a run-down stash house, calling everyone — and everything — into question.",
  },
  {
    id: "1034716",
    title: "People We Meet on Vacation (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/xzZaU0MN6L9oc1pl0RUXSB7hWwD.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/xzZaU0MN6L9oc1pl0RUXSB7hWwD.jpg",
    release_date: "2026-01-16",
    vote_average: 7.4,
    duration: "2h 40m",
    media_type: 'movie',
    genres: ["Comedy ", "Drama", "Romance"],
    streams: {
      "Server 1": "https://xprime.today/watch/1034716",
      "Server 2": "https://cinemaos.tech/player/1034716",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1034716/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://short.icu/Ca642R4QZ?thumbnail=https://media.themoviedb.org/t/p/w780/qth56RA3rkUlhbDRDKGeMJEssdi.jpg",
      "Server 5 - HINDI": "https://byseqekaho.com/e/8anidmdjsvs4",
      "Server 6": "https://www.cinezo.net/watch/movie/1034716",
      "Server 7": "https://vidsrc-embed.ru/embed/movie/1034716",
      "Server 8": "https://api.cinezo.net/embed/tmdb-movie-1034716",
    },
    overview:
      "Poppys a free spirit. Alex loves a plan. After years of summer vacations, these polar-opposite pals wonder if they could be a perfect romantic match.",
  },
  {
    id: "1614077",
    title: "Sulutan (2025)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/kd11696ab32WhHUeq5ZkWi9k09Y.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/kd11696ab32WhHUeq5ZkWi9k09Y.jpg",
    release_date: "2026-01-26",
    vote_average: 6.2,
    duration: "1h 19m",
    media_type: 'movie',
    genres: ["Adult", "Romance", "Drama"],
    streams: {
      "Server 1": "https://xprime.today/watch/1614077",
      "Server 2": "https://cinemaos.tech/player/1614077",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1614077/tagalog?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/agmoLHlhL?thumbnail=https://media.themoviedb.org/t/p/w780/hkgr0dHPdR7a5q60QiGqHGXNBVe.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1614077",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1614077",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1614077",
      "Server 8": "https://byseqekaho.com/e/ytxpdjdt2sqb",
    },
    overview:
      "Lena and Mara are drawn into a secret affair that defies boundaries and threatens everything they’ve built. When Mara uncovers her groom’s betrayal, she finds solace in Lena, a newfound friend who soon becomes something more. As passion and secrecy collide, their choices endanger careers, fracture relationships, and lead to devastating consequences.",
  },
  {
    id: "1555917",
    title: "The Secret of Maria Makinang (2025)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/aaIyWoyk13wp2SmzVTA1X2VSLaz.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/aaIyWoyk13wp2SmzVTA1X2VSLaz.jpg",
    release_date: "2025-10-22",
    vote_average: 5.1,
    duration: "1h 19m",
    media_type: 'movie',
    genres: ["Adult", "Romance", "Drama"],
    streams: {
      "Server 1": "https://xprime.today/watch/1555917",
      "Server 2": "https://cinemaos.tech/player/1555917",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1555917/tagalog?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/ZbqGc8QMt?thumbnail=https://media.themoviedb.org/t/p/w780/1JBTTWYIKWyb4JThbQqGyc5FgXB.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1555917",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1555917",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1555917",
      "Server 8": "http://byseqekaho.com/e/h4zfrz9rchim/",
    },
    overview:
      "It tells the story of Maria, a young woman who appears only during the full moon. She falls for a man named Danilo, and their love is tested through time, because for Danilo, decades have passed, but for Maria, it has only been a few moments.",
  },
  {
    id: "1597538",
    title: "Angkinin Mo Ako (2025)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/2YZ24F49pRkNb45YWI6yckrTYE.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/2YZ24F49pRkNb45YWI6yckrTYE.jpg",
    release_date: "2025-10-23",
    vote_average: 5.1,
    duration: "1h 10m",
    media_type: 'movie',
    genres: ["Adult", "Romance", "Drama"],
    streams: {
      "Server 1": "https://xprime.today/watch/1597538",
      "Server 2": "https://cinemaos.tech/player/1597538",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1597538/tagalog?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/gYE1rgiXE?thumbnail=https://media.themoviedb.org/t/p/w780/mkRGuXIrBETwQvzi3HqiogdL40R.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1597538",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1597538",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1597538",
      "Server 8": "https://byseqekaho.com/e/7j7jdm0pcl8o",
    },
    overview:
      "Cess Garcia and VMX’s next big thing Dara Lima star in a steamy drama about two sisters and the man who sparks their sensual awakening. A female lawyer hires a young man as tutor for her younger sister but unknown to her, their review sessions are becoming wild",
  },
  {
    id: "1612071",
    title: "Elaichi: Ek Prem Katha (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/uaHRJYzURYiNyZmF0p0bTiQMpOK.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/uaHRJYzURYiNyZmF0p0bTiQMpOK.jpg",
    release_date: "2025-10-23",
    vote_average: 5.1,
    duration: "1h 10m",
    media_type: 'movie',
    genres: ["Adult", "Romance", "Drama"],
    streams: {
      "Server 1": "https://xprime.today/watch/1612071",
      "Server 2": "https://cinemaos.tech/player/1612071",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1612071/tagalog?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/tQkMTCEon?thumbnail=https://media.themoviedb.org/t/p/w780/zaciqbV1bdUlbvrjUmPynXx9rdr.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1612071",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1612071",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1612071",
    },
    overview:
      "In Elaichi, the spice of desire, Sonal’s quiet domestic life explodes into nights of burning lust when a chance encounter with a younger actor turns into a frivolous sexual affair - pushing her deeper into obsession until her family, her body, and her soul are scorched by betrayal.`",
  },
  {
    id: "1213898",
    title: "Border 2 (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/hju9XncHxUxUS1GAJ4YqpdFCa5t.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/hju9XncHxUxUS1GAJ4YqpdFCa5t.jpg",
    release_date: "2026-01-23",
    vote_average: 5.1,
    duration: "3h 19m",
    media_type: 'movie',
    genres: ["War", "Action", "Drama"],
    streams: {
      "Server 1": "https://xprime.today/watch/1213898",
      "Server 2": "https://cinemaos.tech/player/1213898",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1213898/hindi?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/fCjlBHVLI?thumbnail=https://media.themoviedb.org/t/p/w780/nPuXMmWmHJySh0cyOs0MjEQA67w.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1213898",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1213898",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1213898",
    },
    overview:
      "During the events of the 1971 Indo-Pak war, a new generation of young Indian warriors were getting ready to defend the nation from an even bigger threat to the Indian motherland.",
  },
  {
    id: "1617536",
    title: "One Two Cha Cha Chaa (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/cWfX0Pog0ZHgTKY3glhIjvkWxgB.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/cWfX0Pog0ZHgTKY3glhIjvkWxgB.jpg",
    release_date: "2026-01-16",
    vote_average: 5.1,
    duration: "2h 40m",
    media_type: 'movie',
    genres: ["Action ", "Adventure", "Comedy"],
    streams: {
      "Server 1": "https://xprime.today/watch/1617536",
      "Server 2": "https://cinemaos.tech/player/1617536",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1617536/hindi?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/fbGaNUQgw?thumbnail=https://media.themoviedb.org/t/p/w780/pWq3jl2WBlD17x1CkprNeCe2cGG.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1617536",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1617536",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1617536",
    },
    overview:
      "So, Fuel Up, Gear Up, Level Up and Fasten your seat belts for the wildest and wackiest road trip of all time.",
  },
  {
    id: "1282440",
    title: "Happy Patel: Khatarnak Jasoos (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/vsCkxiY2c26C6y4RyTVkpdXIfCW.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/vsCkxiY2c26C6y4RyTVkpdXIfCW.jpg",
    release_date: "2026-01-23",
    vote_average: 5.1,
    duration: "2h 02m",
    media_type: 'movie',
    genres: ["Comedy ", "Action", "Romance"],
    streams: {
      "Server 1": "https://xprime.today/watch/1282440",
      "Server 2": "https://cinemaos.tech/player/1282440",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1282440/hindi?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/mNw3SxUtx?thumbnail=https://media.themoviedb.org/t/p/w780/gsLYR8uALrt2p33iOpqReNW6XyQ.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1282440",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1282440",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1282440",
    },
    overview:
      "Happy Patel, a chronically unsuccessful MI7 operative, is finally assigned a mission in Goa, where he uncovers his Indian roots and must rescue a high-profile scientist from crime lord Mama. Unaware of his Indian heritage and armed with a comically British accent, Happy’s blunders trigger a string of chaotic mishaps that could lead him to expose a criminal network.",
  },
  {
    id: "1599099",
    title: "Azad Bharat (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/zeUHs0NACraRyOPlUyuuBC0Iarz.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/zeUHs0NACraRyOPlUyuuBC0Iarz.jpg",
    release_date: "2026-01-16",
    vote_average: 5.1,
    duration: "2h 20m",
    media_type: 'movie',
    genres: ["Adventure", "Comedy", "Fantasy"],
    streams: {
      "Server 1": "https://xprime.today/watch/1599099",
      "Server 2": "https://cinemaos.tech/player/1599099",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1599099/hindi?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/D2auhaVWv?thumbnail=https://media.themoviedb.org/t/p/w780/zmJqRGyI9SuZOPrGq0gZSiv2wMR.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1599099",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1599099",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1599099",
    },
    overview:
      "Freedom fighter Neera Arya joins India's first women's army founded by Subhas Chandra Bose, highlighting untold stories from India's independence movement and themes of courage and patriotism.",
  },
  {
    id: "1382160",
    title: "45 (2025)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/luDTygZ6uAwaknc2isXZcz8YMvE.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/luDTygZ6uAwaknc2isXZcz8YMvE.jpg",
    release_date: "2025-12-25",
    vote_average: 5.1,
    duration: "2h 24m",
    media_type: 'movie',
    genres: ["Action", "Drama", "Thriller"],
    streams: {
      "Server 1": "https://xprime.today/watch/1382160",
      "Server 2": "https://cinemaos.tech/player/1382160",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1382160/hindi?autoplay=false&back=true&server=0",
      "Server 4 - Kannada": "https://byseqekaho.com/e/eo0jjw0mwg9t",
      "Server 5 - Hindi": "https://byseqekaho.com/e/rfifotoan62n",
    },
    overview:
      "A captivating new project by Suraj Production and the Magical Composer’s Debut film, #45Themovie is set to redefine the cinema-watching experience with its unique narrative and compelling performances.",
  },
  {
    id: "1510339",
    title: "Mark (2025)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/6LTDv6XHiHN0N77QIFg2tidVvhh.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/6LTDv6XHiHN0N77QIFg2tidVvhh.jpg",
    release_date: "2025-12-25",
    vote_average: 5.1,
    duration: "2h 24m",
    media_type: 'movie',
    genres: ["Action", "Drama", "Thriller"],
    streams: {
      "Server 1(Telugu)": "https://xprime.today/watch/1510339",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1510339/hindi?autoplay=false&back=true&server=0",
      "Server 4 (Kannada)": "https://byseqekaho.com/e/se2m96qhd0jh",
      "Server 5 (Hindi)": "https://byseqekaho.com/e/7g36yabhfauq",
    },
    overview:
      "Mark is suspended from his police duties for his unruly yet effective ways of operating, but when 18 children are abducted and found dead, races to catch the criminals. With only 18 hours left, he must confront powerful foes and use unconventional tactics to succeed.",
  },
  {
    id: "1457939",
    title: "Rahu Ketu (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/zjgWWOIsEqYNSa1fGRr82mBo3gv.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/zjgWWOIsEqYNSa1fGRr82mBo3gv.jpg",
    release_date: "2026-01-16",
    vote_average: 5.1,
    duration: "2h 20m",
    media_type: 'movie',
    genres: ["Adventure", "Comedy", "Fantasy"],
    streams: {
      "Server 1": "https://xprime.today/watch/1457939",
      "Server 2": "https://cinemaos.tech/player/1457939",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1457939/hindi?autoplay=false&back=true&server=0",
      "Server 4": "https://byseqekaho.com/e/mecoep0szpat",
      "Server 5": "https://www.cinezo.net/watch/movie/1457939",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1457939",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1599099",
    },
    overview:
      "Rahu Ketu (2026) In the magical world of writer Churu Lal Sharma, his unlucky creations Rahu and Ketu spring to life, causing hilarious chaos instead of fighting corruption. When the mischievous Meenu Taxi steals Churus mystical notebook, the bumbling duo are dragged into absurd adventures that land them in the middle of a drug mafia.",
  },
  {
    id: "1594670",
    title: "Psych Siddhartha (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/9UZrHOeryYvgVaEfUMY3hk1OWg0.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/rHFjswQM8tdAL8RYqRJDsJBCngY.jpg",
    release_date: "2026-01-01",
    vote_average: 8.1,
    duration: "2h 27m",
    media_type: 'movie',
    genres: ["Comedy", "Romance"],
    streams: {
      "Server 1": "https://xprime.today/watch/1594670",
      "Server 2": "https://cinemaos.tech/player/1594670",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1594670/hindi?autoplay=false&back=true&server=0",
      "Server 4": "https://www.cinezo.net/watch/movie/1594670",
      "Server 5": "https://vidsrc-embed.ru/embed/movie/1594670",
      "Server 6": "https://api.cinezo.net/embed/tmdb-movie-1594670",
    },
    overview:
      "Psych Siddhartha (2026) is a layered psychological drama that explores emotional collapse, fragile hope, and the enduring scars of unresolved trauma. At its center is Siddharth, a man battered by repeated personal losses that have left him isolated, financially strained, and emotionally exhausted. Life has reduced him to survival mode, where every attempt to move forward seems to be met with another setback.  ",
  },
  {
    id: "1196946",
    title: "Ikkis (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/8PWu0V10nMqG5SrA13wLRXTD2fH.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/wbhoYwvqgadchfMgUOfOp87QZDS.jpg",
    release_date: "2026-01-01",
    vote_average: 8.1,
    duration: "2h 27m",
    media_type: 'movie',
    genres: ["War", "History", "Biography"],
    streams: {
      "Server 1": "https://xprime.today/watch/1196946",
      "Server 2": "https://cinemaos.tech/player/1196946",
      "Server 3":
        "https://zxcstream.xyz/player/movie/1196946/hindi?autoplay=false&back=true&server=0",
      "Server 4":
        "https://short.icu/_iVjlYQ_U?thumbnail=https://media.themoviedb.org/t/p/w780/wbhoYwvqgadchfMgUOfOp87QZDS.jpg",
      "Server 5": "https://www.cinezo.net/watch/movie/1196946",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/1196946",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-1196946",
    },
    overview:
      "Second Lieutenant and Indias youngest Param Vir Chakra recipient, Arun Khetarpal, gave his life fighting for his battalion and the country during the 1971 Battle of Basantar. Ikkis also takes a reflective look at the futility of war through the eyes of Khetarpals father, who visits his ancestral home in Sargodha and Alma Mater for reunion, which now happens to be in post-partition Pakistan, 30 years later.",
  },
  {
    id: "872585",
    title: "Oppenheimer",
    poster_path:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaB0.jpg",
    release_date: "2023-07-21",
    vote_average: 8.1,
    duration: "3h 0m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/872585",
      "Server 2": "https://cinemaos.tech/player/872585",
      "Server 3":
        "https://zxcstream.xyz/player/movie/872585/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/872585",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/872585",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-872585",
    },
    genres: ["Drama", "History", "Biography"],
    overview:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
  },
  {
    id: "346698",
    title: "Barbie",
    poster_path:
      "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
    release_date: "2023-07-21",
    vote_average: 7.2,
    duration: "1h 54m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/346698",
      "Server 2": "https://cinemaos.tech/player/346698",
      "Server 3":
        "https://zxcstream.xyz/player/movie/346698/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/346698",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/346698",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-346698",
    },
    genres: ["Comedy", "Adventure", "Fantasy"],
    overview:
      "Barbie and Ken are having the time of their lives in the colorful world of Barbie Land.",
  },
  {
    id: "569094",
    title: "Spider-Man: Across the Spider-Verse",
    poster_path:
      "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4hD5ri.jpg",
    release_date: "2023-06-02",
    vote_average: 8.7,
    duration: "2h 20m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/569094",
      "Server 2": "https://cinemaos.tech/player/569094",
      "Server 3":
        "https://zxcstream.xyz/player/movie/569094/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/569094",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/569094",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-569094",
    },
    genres: ["Animation", "Action", "Adventure"],
    overview:
      "Miles Morales returns for an epic adventure across the multiverse.",
  },
  {
    id: "447365",
    title: "Guardians of the Galaxy Vol. 3",
    poster_path:
      "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    release_date: "2023-05-05",
    vote_average: 8.0,
    duration: "2h 30m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/447365",
      "Server 2": "https://cinemaos.tech/player/447365",
      "Server 3":
        "https://zxcstream.xyz/player/movie/447365/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/447365",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/447365",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-447365",
    },
    genres: ["Action", "Adventure", "Comedy"],
    overview: "Peter Quill must rally his team to defend the universe.",
  },
  {
    id: "385687",
    title: "Fast X",
    poster_path:
      "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4hD5ri.jpg",
    release_date: "2023-05-19",
    vote_average: 7.2,
    duration: "2h 21m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/385687",
      "Server 2": "https://cinemaos.tech/player/385687",
      "Server 3":
        "https://zxcstream.xyz/player/movie/385687/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/385687",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/385687",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-385687",
    },
    genres: ["Action", "Crime", "Thriller"],
    overview: "Dom Toretto and his family are targeted by a vengeful son.",
  },
  {
    id: "603692",
    title: "John Wick: Chapter 4",
    poster_path:
      "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/7I6VUdPj6tQECNHdviJkUHD2u89.jpg",
    release_date: "2023-03-24",
    vote_average: 7.8,
    duration: "2h 49m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/603692",
      "Server 2": "https://cinemaos.tech/player/603692",
      "Server 3":
        "https://zxcstream.xyz/player/movie/603692/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/603692",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/603692",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-603692",
    },
    genres: ["Action", "Crime", "Thriller"],
    overview: "John Wick uncovers a path to defeating The High Table.",
  },
  {
    id: "667538",
    title: "Transformers: Rise of the Beasts",
    poster_path:
      "https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
    release_date: "2023-06-09",
    vote_average: 7.3,
    duration: "2h 7m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/667538",
      "Server 2": "https://cinemaos.tech/player/667538",
      "Server 3":
        "https://zxcstream.xyz/player/movie/667538/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/667538",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/667538",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-667538",
    },
    genres: ["Action", "Adventure", "Sci-Fi"],
    overview: "Optimus Prime and the Autobots take on their biggest challenge.",
  },
  {
    id: "298618",
    title: "The Flash",
    poster_path:
      "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    release_date: "2023-06-16",
    vote_average: 6.9,
    duration: "2h 24m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/298618",
      "Server 2": "https://cinemaos.tech/player/298618",
      "Server 3":
        "https://zxcstream.xyz/player/movie/298618/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/298618",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/298618",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-298618",
    },
    genres: ["Action", "Adventure", "Fantasy"],
    overview: "Barry Allen uses his super speed to change the past.",
  },
  {
    id: "575264",
    title: "Mission: Impossible - Dead Reckoning Part One",
    poster_path:
      "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
    release_date: "2023-07-14",
    vote_average: 7.7,
    duration: "2h 43m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/575264",
      "Server 2": "https://cinemaos.tech/player/575264",
      "Server 3":
        "https://zxcstream.xyz/player/movie/575264/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/575264",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/575264",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-575264",
    },
    genres: ["Action", "Adventure", "Thriller"],
    overview: "Ethan Hunt and his IMF team must track down a dangerous weapon.",
  },
  {
    id: "447277",
    title: "The Little Mermaid",
    poster_path:
      "https://image.tmdb.org/t/p/w500/ym1dxyOk4jFcSl4Q2zmRrA5BEEN.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/7pFwXl9QqgU7wQeQ5tCgxArqMFH.jpg",
    release_date: "2023-05-26",
    vote_average: 6.7,
    duration: "2h 15m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/447277",
      "Server 2": "https://cinemaos.tech/player/447277",
      "Server 3":
        "https://zxcstream.xyz/player/movie/447277/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/447277",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/447277",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-447277",
    },
    genres: ["Adventure", "Family", "Fantasy"],
    overview: "A young mermaid trades her voice for human legs.",
  },
  {
    id: "157336",
    title: "Interstellar",
    poster_path:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    release_date: "2014-11-07",
    vote_average: 8.4,
    duration: "2h 49m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/157336",
      "Server 2": "https://cinemaos.tech/player/157336",
      "Server 3":
        "https://zxcstream.xyz/player/movie/157336/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/157336",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/157336",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-157336",
    },
    genres: ["Adventure", "Drama", "Sci-Fi"],
    overview: "A team of explorers travel through a wormhole in space.",
  },
  {
    id: "27205",
    title: "Inception",
    poster_path:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-16",
    vote_average: 8.4,
    duration: "2h 28m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/27205",
      "Server 2": "https://cinemaos.tech/player/27205",
      "Server 3":
        "https://zxcstream.xyz/player/movie/27205/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/27205",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/27205",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-27205",
    },
    genres: ["Action", "Sci-Fi", "Thriller"],
    overview: "A thief who steals corporate secrets through dream-sharing.",
  },
  {
    id: "155",
    title: "The Dark Knight",
    poster_path:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/hkC4yNDFmW1yQuQhtZydMeRuaAb.jpg",
    release_date: "2008-07-18",
    vote_average: 8.5,
    duration: "2h 32m",
    media_type: 'movie',
    streams: {
      "Server 1": "https://xprime.today/watch/155",
      "Server 2": "https://cinemaos.tech/player/155",
      "Server 3":
        "https://zxcstream.xyz/player/movie/155/english?autoplay=false&back=true&server=0",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
      "Server 5 ": "https://www.cinezo.net/watch/movie/155",
      "Server 6": "https://vidsrc-embed.ru/embed/movie/155",
      "Server 7": "https://api.cinezo.net/embed/tmdb-movie-155",
    },
    genres: ["Action", "Crime", "Drama"],
    overview: "Batman faces the Joker in Gotham City.",
  },
];

// 15 UNIQUE TV SHOWS (ALL FROM TMDB)
export const UNIQUE_TV_SHOWS: MediaItem[] = [
  {
    id: "254071",
    title: "Steal S01 (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/6KmlaPhsohh3Ki9XJUq0jiUYbf3.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/6KmlaPhsohh3Ki9XJUq0jiUYbf3.jpg",
    release_date: "2026-01-08",
    vote_average: 7.2,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://zxcstream.xyz/player/tv/254071/s=1/e=1/english?autoplay=false&back=true&server=0",
      "Server 2": "https://xprime.today/watch/254071/1/1",
      "Server 3": "https://byseqekaho.com/e/xxxxxxxx",
      "Server 4 ": "https://api.cinezo.net/embed/tmdb-tv-254071/1/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/254071?season=1&episode=1",
      "Server 6 - HINDI":
        "https://short.icu/kB0-DCujU?thumbnail=https://media.themoviedb.org/t/p/w780/cm17eZBEI0jAsuwlIrw9L7K5lY2.jpg",
    },
    genres: ["Crime", "Drama", "Mystery"],
    overview:
      "A typical day at Lochmill Capital is upended when armed thieves burst in and force Zara and her best friend Luke to execute their demands. In the aftermath, conflicted detective Rhys races against time to find out who stole £4 billion pounds of people's pensions and why.",
  },
  {
    id: "311632",
    title: "Space Gen: Chandrayaan S01 (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/d6WIr1vycFCCdYewgRf8dpWxQQE.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/d6WIr1vycFCCdYewgRf8dpWxQQE.jpg",
    release_date: "2026-01-08",
    vote_average: 7.2,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://zxcstream.xyz/player/tv/311632/s=1/e=1/hindi?autoplay=false&back=true&server=0",
      "Server 2": "https://xprime.today/watch/311632/1/1",
      "Server 3": "https://byseqekaho.com/e/yxv57pc9qtxs",
      "Server 4 ": "https://api.cinezo.net/embed/tmdb-tv-311632/1/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/311632?season=1&episode=1",
    },
    genres: ["Sci-Fi", "Drama", "Mystery"],
    overview:
      "Indian space engineers face mounting pressure to redeem themselves following the Chandrayaan 2 lunar mission's unexpected outcome.",
  },
  {
    id: "308482",
    title: 'Taskaree: The Smuggler"s Web S01 (2026)',
    poster_path:
      "https://image.tmdb.org/t/p/w500/25fKRXvQLBq4nXu9vjOVJcvCiiD.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/25fKRXvQLBq4nXu9vjOVJcvCiiD.jpg",
    release_date: "2026-01-08",
    vote_average: 7.2,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://zxcstream.xyz/player/tv/308482/s=1/e=1/hindi?autoplay=false&back=true&server=0",
      "Server 2": "https://xprime.today/watch/308482/1/1",
      "Server 3": "https://byseqekaho.com/e/wrnmbynqqeyk",
      "Server 4 ": "https://api.cinezo.net/embed/tmdb-tv-308482/1/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/308482?season=1&episode=1",
    },
    genres: ["Crime", "Drama", "Mystery"],
    overview:
      "A dedicated customs officer and his team take on a notorious smuggler leading a powerful syndicate, but unexpected obstacles threaten their mission.",
  },
  {
    id: "297594",
    title: "Bindiya Ke Bahubali S02 (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/eSJGKRff52Pg2SfOiIdC4IlMMQR.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/eSJGKRff52Pg2SfOiIdC4IlMMQR.jpg",
    release_date: "2026-01-08",
    vote_average: 7.2,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://zxcstream.xyz/player/tv/297594/s=2/e=1/hindi?autoplay=false&back=true&server=0",
      "Server 2": "https://xprime.today/watch/297594/2/1",
      "Server 3": "https://byseqekaho.com/e/hv81w9p30urb",
      "Server 4 ": "https://api.cinezo.net/embed/tmdb-tv-297594/2/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/297594?season=2&episode=1",
    },
    genres: ["Drama", "Crime", "Mystery"],
    overview:
      "With humour, absurdity and family cat and mouse at its center, this is a tale of family gangsters in a fictitious madhouse city, Bindiya. As the current Don is put behind bars, the gangster familys alliances shift, new love, friendships, and betrayals explode until Bindiya becomes a full-blown circus-where love is a deal, power is personal, and every one has a card and blood on their hands.",
  },
  {
    id: "311171",
    title: "Bhootiyapa (2025)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/4NGdzyuffqhb1jMEvTfri3jn5Fj.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/4NGdzyuffqhb1jMEvTfri3jn5Fj.jpg",
    release_date: "2025-01-08",
    vote_average: 7.2,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://zxcstream.xyz/player/tv/311171/s=1/e=1/hindi?autoplay=false&back=true&server=0",
      "Server 2": "https://xprime.today/watch/311171/1/1",
      "Server 3": "https://byseqekaho.com/e/f1i18ua20w0r",
      "Server 4": "https://short.icu/5ALJ-TlBZ?thumbnail=https://media.themoviedb.org/t/p/w780/eQJUKQMl0SvoHiYwAW2E0VoAwR2.jpg"
    },
    genres: ["Drama", "Crime", "Mystery"],
    overview:
      "Bhootiyapa revolves around a film crew documenting the untold stories of these ghosts, who, despite their spectral existence, have tales to tell about love, loss and laughter. Each ghost, from a different era, adds a layer of mystery and mirth to the story, revealing how life after death can be as vibrant and surprising as mortal life itself.",
  },
  {
    id: "243826",
    title: "Pharma (2025)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/hQWT47GFQyvO1tFqx6IgCOvrrr8.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/hQWT47GFQyvO1tFqx6IgCOvrrr8.jpg",
    release_date: "2025-01-08",
    vote_average: 7.2,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
      "https://zxcstream.xyz/player/tv/243826/s=1/e=1/hindi?autoplay=false&back=true&server=0",
      "Server 2 - Only Malayalam": "https://xprime.today/watch/243826/1/1",
      "Server 3 - HINDI": "https://short.icu/PqYLFFeKU?thumbnail=https://media.themoviedb.org/t/p/w780/n1qDEYpr3pq7bJ9GGaF9zVNjdNq.jpg"
    },
    genres: ["Drama", "Crime", "Mystery"],
    overview:
      "A young medical representative struggles against the pharma game, masters it and eventually fights against it.",
  },
  {
    id: "61859",
    title: "The Night Manager S02 (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/1MccRnw41qQjREuZkovqP2UX1i3.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/lJoaiZcYMc8RkmPLROcdS2WQxn9.jpg",
    release_date: "2026-01-08",
    vote_average: 7.2,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://zxcstream.xyz/player/tv/61859/s=1/e=1/english?autoplay=false&back=true&server=0",
      "Server 2": "https://xprime.today/watch/61859/2/1",
      "Server 3": "https://vidsrc-embed.ru/embed/tv/61859",
      "Server 4 ": "https://api.cinezo.net/embed/tmdb-tv-61859/2/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/61859?season=1&episode=1",
      "Server 6 - HINDI": "https://byseqekaho.com/e/p9vhhvpow8rk",
      "Server 7 - HINDI":
        "https://short.icu/ndrmOyAuX?thumbnail=https://media.themoviedb.org/t/p/w780/lJoaiZcYMc8RkmPLROcdS2WQxn9.jpg",
    },
    genres: ["Spy", "Crime", "Mystery"],
    overview:
      "Former British soldier Jonathan Pine navigates the shadowy recesses of Whitehall and Washington where an unholy alliance operates between the intelligence community and the secret arms trade. To infiltrate the inner circle of lethal arms dealer Richard Onslow Roper, Pine must himself become a criminal.",
  },
  {
    id: "259731",
    title: "His & Hers S01 (2026)",
    poster_path:
      "https://image.tmdb.org/t/p/w500/cDSXLVQLkCSBIpBx3UW04TsfZ5c.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/n4hJLZmBG8kZccNn7bNgBDsVQ6a.jpg",
    release_date: "2026-01-08",
    vote_average: 7.2,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://zxcstream.xyz/player/tv/259731/s=1/e=1/english?autoplay=false&back=true&server=0",
      "Server 2": "https://xprime.today/watch/259731/1/1",
      "Server 3": "https://vidsrc-embed.ru/embed/tv/259731",
      "Server 4 ": "https://api.cinezo.net/embed/tmdb-tv-259731/1/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/259731?season=1&episode=1",
      "Server 6 - HINDI":
        "https://short.icu/tyiiqPGLF?thumbnail=https://media.themoviedb.org/t/p/w780/n4hJLZmBG8kZccNn7bNgBDsVQ6a.jpg",
    },
    genres: ["Drama", "Crime", "Mystery"],
    overview:
      "Two estranged spouses — one a detective, the other a news reporter — vie to solve a murder in which each believes the other is a prime suspect.",
  },
  {
    id: "100088",
    title: "The Last of Us",
    poster_path:
      "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    release_date: "2023-01-15",
    vote_average: 8.8,
    duration: "50m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://zxcstream.xyz/player/tv/100088/s=1/e=1/english?autoplay=false&back=true&server=0",
      "Server 2": "https://vidsrc-embed.ru/embed/tv/100088",
      "Server 3": "https://xprime.today/watch/100088/2/1",
      "Server 4": "https://api.cinezo.net/embed/tmdb-tv-100088/2/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/100088?season=2&episode=1",
      "Server 6 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
    },
    genres: ["Drama", "Action", "Sci-Fi"],
    overview: "After a global pandemic destroys civilization.",
  },
  {
    id: "94997",
    title: "House of the Dragon",
    poster_path:
      "https://image.tmdb.org/t/p/w500/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
    release_date: "2022-08-21",
    vote_average: 8.5,
    duration: "55m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://www.zxcstream.xyz/player/tv/94997/2/1?autoplay=false&back=true&server=0",
      "Server 2": "https://vidsrc-embed.ru/embed/tv/94997",
      "Server 3": "https://xprime.today/watch/94997/2/1",
      "Server 4": "https://api.cinezo.net/embed/tmdb-tv-94997/2/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/94997?season=2&episode=1",
      "Server 6 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
    },
    genres: ["Drama", "Action", "Adventure"],
    overview:
      "The story of House Targaryen set 200 years before Game of Thrones.",
  },
  {
    id: "119051",
    title: "Wednesday",
    poster_path:
      "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/9G3mCR9qQ8U7Oi2f7nPmNpXMGFA.jpg",
    release_date: "2022-11-23",
    vote_average: 8.5,
    duration: "45m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://www.zxcstream.xyz/player/tv/119051/2/1?autoplay=false&back=true&server=0",
      "Server 2": "https://vidsrc-embed.ru/embed/tv/119051",
      "Server 3": "https://xprime.today/watch/119051/2/1",
      "Server 4": "https://api.cinezo.net/embed/tmdb-tv-119051/2/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/119051?season=2&episode=1",
      "Server 6 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
    },
    genres: ["Comedy", "Crime", "Fantasy"],
    overview: "Wednesday Addams attempts to master her psychic ability.",
  },
  {
    id: "1399",
    title: "Game of Thrones",
    poster_path:
      "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/mUkuc2wyV9dHLG0D0Loaw5pO2s8.jpg",
    release_date: "2011-04-17",
    vote_average: 8.5,
    duration: "1h",
    media_type: 'tv',
    streams: {
      "Server 1": "https://vidsrc.cc/v2/embed/tv/1399",
      "Server 2":
        "https://zxcstream.xyz/player/tv/1399/s=1/e=1/english?autoplay=false&back=true&server=0",
      "Server 3":
        "https://apicinetaro.falex43350.workers.dev/tv/1399/1/1/english",
      "Server 4 - HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",  
    },
    genres: ["Drama", "Fantasy", "Adventure"],
    overview: "Nine noble families fight for control over Westeros.",
  },
  {
    id: "66732",
    title: "Stranger Things",
    poster_path:
      "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    release_date: "2016-07-15",
    vote_average: 8.7,
    duration: "50m",
    media_type: 'tv',
    streams: {
      "Server 1":
        "https://www.zxcstream.xyz/player/tv/66732/5/1?autoplay=false&back=true&server=0",
      "Server 2": "https://vidsrc-embed.ru/embed/tv/66732",
      "Server 3": "https://xprime.today/watch/66732/5/1",
      "Server 4": "https://api.cinezo.net/embed/tmdb-tv-66732/5/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/66732?season=5&episode=1",
      "Server 6- HINDI":
        "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
    },
    genres: ["Drama", "Fantasy", "Horror"],
    overview: "When a young boy vanishes, a small town uncovers a mystery.",
  },
  {
    id: "71912",
    title: "The Witcher",
    poster_path:
      "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/7vBpX7e4Dp3dG2c5QZ6w4qyY6qy.jpg",
    release_date: "2019-12-20",
    vote_average: 8.2,
    duration: "1h",
    media_type: 'tv',
    genres: ["Action", "Adventure", "Drama"],
    streams: {
      "Server 1":
        "https://www.zxcstream.xyz/player/tv/71912/4/1?autoplay=false&back=true&server=0",
      "Server 2": "https://vidsrc-embed.ru/embed/tv/71912",
      "Server 3": "https://xprime.today/watch/71912/4/1",
      "Server 4": "https://api.cinezo.net/embed/tmdb-tv-71912/4/1",
      "Server 5 ": "https://www.cinezo.net/watch/tv/71912?season=4&episode=1",
      "Server 6 - HINDI": "https://www.youtube.com/embed/Y_X19YfQWZA?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=Y_X19YfQWZA",
    },
    overview: "Geralt of Rivia, a mutated monster-hunter for hire.",
  }
];

// Fetch functions to simulate API calls
export const fetchMovies = async (): Promise<MediaItem[]> => {
  return UNIQUE_MOVIES;
};

export const fetchTVShows = async (): Promise<MediaItem[]> => {
  return UNIQUE_TV_SHOWS;
};

export const fetchSports = async (): Promise<MediaItem[]> => {
  return UNIQUE_SPORTS;
};

export const fetchTVLive = async (): Promise<MediaItem[]> => {
  return UNIQUE_TV_LIVE;
};

export const fetchById = async (id: string, type: string): Promise<MediaItem | null> => {
  let source: MediaItem[] = [];
  
  if (type === 'movie') source = UNIQUE_MOVIES;
  else if (type === 'tv') source = UNIQUE_TV_SHOWS;
  else if (type === 'sports') source = UNIQUE_SPORTS;
  else if (type === 'tv_live') source = UNIQUE_TV_LIVE;
  
  const item = source.find(i => i.id === id);
  return item || null;
};