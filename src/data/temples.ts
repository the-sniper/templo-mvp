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
  description: string;
  image: string;
  deity: string;
  poojaTimings: PoojaTiming[];
  announcements: Announcement[];
}

export const temples: Temple[] = [
  {
    id: '1',
    name: 'Sri Venkateswara Temple',
    location: 'Tirumala Hills, Tirupati',
    city: 'Tirupati',
    description: 'One of the most sacred and visited Hindu temples in the world, dedicated to Lord Venkateswara, a form of Vishnu.',
    image: '/temples/tirupati.jpg',
    deity: 'Lord Venkateswara',
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
  },
  {
    id: '2',
    name: 'Golden Temple',
    location: 'Amritsar, Punjab',
    city: 'Amritsar',
    description: 'The holiest Gurdwara of Sikhism, known as Sri Harmandir Sahib, featuring stunning gold-plated architecture.',
    image: '/temples/golden-temple.jpg',
    deity: 'Guru Granth Sahib',
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
  },
  {
    id: '3',
    name: 'Meenakshi Temple',
    location: 'Madurai, Tamil Nadu',
    city: 'Madurai',
    description: 'Historic Hindu temple dedicated to Goddess Meenakshi and Lord Sundareswarar, famous for its magnificent gopurams.',
    image: '/temples/meenakshi.jpg',
    deity: 'Goddess Meenakshi',
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
    description: 'One of the twelve Jyotirlingas, this ancient temple dedicated to Lord Shiva sits on the banks of the holy Ganges.',
    image: '/temples/kashi.jpg',
    deity: 'Lord Shiva',
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
    description: 'Sacred temple dedicated to Lord Jagannath, famous for the annual Rath Yatra festival.',
    image: '/temples/jagannath.jpg',
    deity: 'Lord Jagannath',
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
    description: 'Famous Ganesh temple known for wish-fulfilling prayers, visited by millions annually.',
    image: '/temples/siddhivinayak.jpg',
    deity: 'Lord Ganesha',
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
