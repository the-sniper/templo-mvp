import { GalleryImage } from '@/components/TempleGallery';
import { TempleHistoryData } from '@/components/TempleHistory';

export interface PoojaTiming {
  name: string;
  time: string;
  description?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'festival' | 'event' | 'general';
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  description: string;
  image: string;
  deity: string;
  poojaTimings: PoojaTiming[];
  announcements: Announcement[];
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  gallery?: GalleryImage[];
  history?: TempleHistoryData;
}

export const temples: Temple[] = [
  {
    id: '1',
    name: 'Sri Venkateswara Temple',
    location: 'Tirumala Hills, Tirupati',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    description: 'One of the most sacred and visited Hindu temples in the world, dedicated to Lord Venkateswara, a form of Vishnu.',
    image: '/temples/tirupati.jpg',
    deity: 'Lord Venkateswara',
    contact: {
      phone: '+91 877 2277777',
      email: 'info@tirumala.org',
      website: 'https://tirumala.org',
    },
    coordinates: { lat: 13.6833, lng: 79.3500 },
    poojaTimings: [
      { name: 'Suprabhatam', time: '3:00 AM', description: 'Morning awakening ritual' },
      { name: 'Thomala Seva', time: '4:00 AM', description: 'Flower garland offering' },
      { name: 'Archana', time: '6:00 AM - 12:00 PM', description: 'Individual worship' },
      { name: 'Sahasranamarchana', time: '10:00 AM', description: 'Recitation of 1000 names' },
      { name: 'Evening Aarti', time: '7:00 PM', description: 'Evening lamp ceremony' },
      { name: 'Ekantha Seva', time: '10:00 PM', description: 'Night rest ritual' },
    ],
    announcements: [
      { id: 'a1', title: 'Brahmotsavam 2024', date: '2024-10-04', content: 'Annual Brahmotsavam festival will be celebrated from October 4-12. Special darshan arrangements available.', type: 'festival' },
      { id: 'a2', title: 'Online Seva Booking', date: '2024-09-15', content: 'Book your special darshan and seva online through the official TTD website.', type: 'general' },
    ],
    gallery: [
      { id: 'g1', url: '/temples/tirupati.jpg', caption: 'Main Temple View', category: 'architecture' },
      { id: 'g2', url: '/temples/tirupati.jpg', caption: 'Morning Darshan', category: 'daily_darshan' },
      { id: 'g3', url: '/temples/tirupati.jpg', caption: 'Brahmotsavam Festival', category: 'festival' },
      { id: 'g4', url: '/temples/tirupati.jpg', caption: 'Golden Gopuram', category: 'architecture' },
    ],
    history: {
      originStory: 'According to legend, Lord Vishnu descended to Earth in the form of Venkateshwara during the Kali Yuga to guide and protect devotees. The temple on the seven hills (Saptagiri) is one of the oldest and most sacred pilgrimage sites in India.',
      deitySignificance: 'Lord Venkateswara, also known as Balaji, Govinda, and Srinivasa, is considered the most powerful manifestation of Lord Vishnu. Devotees believe that any wish made with true devotion in front of the deity comes true.',
      famousMiracles: [
        'The self-manifested deity (Swayambhu) that appeared on the hill',
        'Countless testimonies of wishes fulfilled by devotees',
        'The ever-fresh flowers on the deity despite being offered daily',
      ],
      famousPoojas: ['Suprabhatam', 'Thomala Seva', 'Archana', 'Sahasranamarchana'],
      pastKumbabishekams: [
        { year: 1958, description: 'First major renovation after temple administration reorganization' },
        { year: 2006, description: 'Maha Samprokshanam performed with elaborate rituals' },
      ],
      architecturalSignificance: 'The temple complex showcases Dravidian architecture with its towering gopurams and intricate carvings. The main sanctum is covered with gold-plated sheets, giving the temple its characteristic golden appearance.',
    },
  },
  {
    id: '2',
    name: 'Golden Temple',
    location: 'Amritsar, Punjab',
    city: 'Amritsar',
    state: 'Punjab',
    description: 'The holiest Gurdwara of Sikhism, known as Sri Harmandir Sahib, featuring stunning gold-plated architecture.',
    image: '/temples/golden-temple.jpg',
    deity: 'Guru Granth Sahib',
    contact: {
      phone: '+91 183 2553957',
      email: 'info@sgpc.net',
      website: 'https://sgpc.net',
    },
    coordinates: { lat: 31.6200, lng: 74.8765 },
    poojaTimings: [
      { name: 'Prakash', time: '4:00 AM', description: 'Morning opening ceremony' },
      { name: 'Morning Kirtan', time: '4:30 AM - 9:00 AM', description: 'Devotional singing' },
      { name: 'Langar', time: '24 Hours', description: 'Community kitchen service' },
      { name: 'Evening Kirtan', time: '6:00 PM - 10:00 PM', description: 'Evening devotional songs' },
      { name: 'Sukhasan', time: '10:00 PM', description: 'Night closing ceremony' },
    ],
    announcements: [
      { id: 'b1', title: 'Guru Nanak Jayanti', date: '2024-11-15', content: 'Special celebrations for the 555th birth anniversary of Guru Nanak Dev Ji.', type: 'festival' },
      { id: 'b2', title: 'Langar Seva', date: '2024-09-20', content: 'Volunteers needed for langar seva. Register at the main office.', type: 'event' },
    ],
    history: {
      originStory: 'The Golden Temple was founded by Guru Ram Das in 1577 and completed by Guru Arjan Dev in 1604. The sacred scripture, Guru Granth Sahib, was installed here for the first time.',
      deitySignificance: 'The Guru Granth Sahib is the central religious scripture of Sikhism, treated as the eternal Guru. The temple represents the spiritual and cultural center of Sikhism.',
      famousMiracles: [
        'The healing properties of the sacred pool (Amrit Sarovar)',
        'Countless stories of spiritual transformation of devotees',
      ],
      architecturalSignificance: 'The temple is covered in 750 kg of pure gold and features a blend of Hindu and Islamic architectural styles. It has four entrances symbolizing openness to all.',
    },
  },
  {
    id: '3',
    name: 'Meenakshi Temple',
    location: 'Madurai, Tamil Nadu',
    city: 'Madurai',
    state: 'Tamil Nadu',
    description: 'Historic Hindu temple dedicated to Goddess Meenakshi and Lord Sundareswarar, famous for its magnificent gopurams.',
    image: '/temples/meenakshi.jpg',
    deity: 'Goddess Meenakshi',
    contact: {
      phone: '+91 452 2349890',
      email: 'info@meenakshitemple.org',
      website: 'https://maduraimeenakshi.org',
    },
    coordinates: { lat: 9.9195, lng: 78.1193 },
    poojaTimings: [
      { name: 'Morning Opening', time: '5:00 AM', description: 'Temple doors open' },
      { name: 'Kalasanthi Pooja', time: '8:00 AM', description: 'Mid-morning worship' },
      { name: 'Uchikalam', time: '12:00 PM', description: 'Afternoon pooja' },
      { name: 'Sayarakshai', time: '4:00 PM', description: 'Evening protection ritual' },
      { name: 'Rakshai', time: '7:30 PM', description: 'Night worship' },
      { name: 'Palliarai', time: '9:30 PM', description: 'Night rest ceremony' },
    ],
    announcements: [
      { id: 'c1', title: 'Chithirai Festival', date: '2024-04-14', content: 'The grand celestial wedding of Goddess Meenakshi will be celebrated.', type: 'festival' },
      { id: 'c2', title: 'Temple Renovation', date: '2024-09-01', content: 'East tower renovation in progress. Alternative entry through south gate.', type: 'general' },
    ],
  },
  {
    id: '4',
    name: 'Kashi Vishwanath Temple',
    location: 'Varanasi, Uttar Pradesh',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    description: 'One of the twelve Jyotirlingas, this ancient temple dedicated to Lord Shiva sits on the banks of the holy Ganges.',
    image: '/temples/kashi.jpg',
    deity: 'Lord Shiva',
    contact: {
      phone: '+91 542 2392629',
      email: 'info@shrikashivishwanath.org',
      website: 'https://shrikashivishwanath.org',
    },
    coordinates: { lat: 25.3109, lng: 83.0107 },
    poojaTimings: [
      { name: 'Mangala Aarti', time: '3:00 AM', description: 'First aarti of the day' },
      { name: 'Bhog Aarti', time: '11:15 AM', description: 'Mid-day offering' },
      { name: 'Sandhya Aarti', time: '7:00 PM', description: 'Evening worship' },
      { name: 'Shringaar Aarti', time: '9:00 PM', description: 'Decoration ceremony' },
      { name: 'Shayana Aarti', time: '10:30 PM', description: 'Night closing aarti' },
    ],
    announcements: [
      { id: 'd1', title: 'Maha Shivaratri', date: '2024-03-08', content: 'Temple will remain open 24 hours. Special abhishekam throughout the night.', type: 'festival' },
      { id: 'd2', title: 'Ganga Aarti Timing', date: '2024-09-10', content: 'Evening Ganga Aarti at Dashashwamedh Ghat: 6:45 PM daily.', type: 'general' },
    ],
  },
  {
    id: '5',
    name: 'Jagannath Temple',
    location: 'Puri, Odisha',
    city: 'Puri',
    state: 'Odisha',
    description: 'Sacred temple dedicated to Lord Jagannath, famous for the annual Rath Yatra festival.',
    image: '/temples/jagannath.jpg',
    deity: 'Lord Jagannath',
    contact: {
      phone: '+91 6752 222002',
      email: 'info@jagannath.nic.in',
      website: 'https://jagannath.nic.in',
    },
    coordinates: { lat: 19.8048, lng: 85.8181 },
    poojaTimings: [
      { name: 'Dwara Phita', time: '5:00 AM', description: 'Opening of doors' },
      { name: 'Mailam', time: '6:00 AM', description: 'Cleaning ritual' },
      { name: 'Abakash', time: '8:00 AM', description: 'Morning prasad' },
      { name: 'Madhyahna Dhupa', time: '12:00 PM', description: 'Afternoon offering' },
      { name: 'Sandhya Dhupa', time: '7:00 PM', description: 'Evening meal' },
      { name: 'Pahuda', time: '11:00 PM', description: 'Deities rest' },
    ],
    announcements: [
      { id: 'e1', title: 'Rath Yatra 2024', date: '2024-07-07', content: 'World-famous chariot festival. Lakhs of devotees expected.', type: 'festival' },
      { id: 'e2', title: 'Mahaprasad Booking', date: '2024-09-05', content: 'Pre-book Mahaprasad through temple counter or online.', type: 'general' },
    ],
  },
  {
    id: '6',
    name: 'Siddhivinayak Temple',
    location: 'Prabhadevi, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    description: 'Famous Ganesh temple known for wish-fulfilling prayers, visited by millions annually.',
    image: '/temples/siddhivinayak.jpg',
    deity: 'Lord Ganesha',
    contact: {
      phone: '+91 22 24373626',
      email: 'info@siddhivinayak.org',
      website: 'https://siddhivinayak.org',
    },
    coordinates: { lat: 19.0169, lng: 72.8302 },
    poojaTimings: [
      { name: 'Morning Pooja', time: '5:30 AM', description: 'First darshan' },
      { name: 'Abhishekam', time: '7:00 AM', description: 'Holy bathing ritual' },
      { name: 'Aarti', time: '12:00 PM', description: 'Noon lamp ceremony' },
      { name: 'Evening Aarti', time: '8:00 PM', description: 'Sunset worship' },
      { name: 'Shej Aarti', time: '9:30 PM', description: 'Closing prayers' },
    ],
    announcements: [
      { id: 'f1', title: 'Ganesh Chaturthi', date: '2024-09-07', content: '10-day Ganesh festival with special decorations and events.', type: 'festival' },
      { id: 'f2', title: 'Tuesday Special Darshan', date: '2024-09-03', content: 'Extended hours on Tuesdays. VIP darshan available.', type: 'event' },
    ],
  },
];
