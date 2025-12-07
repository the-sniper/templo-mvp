export interface PoojaService {
  id: string;
  name: string;
  description: string;
  duration: string;
  suggestedDonationMin: number;
  suggestedDonationMax: number;
}

export interface Priest {
  id: string;
  name: string;
  templeId: string;
  photo?: string;
  experience: number; // years
  languages: string[];
  specializations: string[];
  bio: string;
  available: boolean;
}

export interface PoojaRequest {
  id: string;
  priestId: string;
  priestName: string;
  serviceId: string;
  serviceName: string;
  templeId: string;
  templeName: string;
  devoteePhone: string;
  devoteeName: string;
  preferredDate: string;
  preferredTime: string;
  occasion?: string;
  inMemoryOf?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  createdAt: Date;
  donationAmount?: number;
}

// Sample pooja services
export const poojaServices: PoojaService[] = [
  {
    id: 'ps1',
    name: 'Ganesh Pooja',
    description: 'Invocation of Lord Ganesha for auspicious beginnings and removal of obstacles',
    duration: '30-45 mins',
    suggestedDonationMin: 501,
    suggestedDonationMax: 1101,
  },
  {
    id: 'ps2',
    name: 'Satyanarayan Pooja',
    description: 'Worship of Lord Vishnu for prosperity and well-being',
    duration: '2-3 hours',
    suggestedDonationMin: 1101,
    suggestedDonationMax: 2501,
  },
  {
    id: 'ps3',
    name: 'Rudrabhishekam',
    description: 'Sacred bathing ritual for Lord Shiva with milk, honey, and holy water',
    duration: '1-2 hours',
    suggestedDonationMin: 1001,
    suggestedDonationMax: 2101,
  },
  {
    id: 'ps4',
    name: 'Navagraha Shanti',
    description: 'Ritual to appease the nine celestial bodies for removing planetary afflictions',
    duration: '2-3 hours',
    suggestedDonationMin: 1501,
    suggestedDonationMax: 3001,
  },
  {
    id: 'ps5',
    name: 'Lakshmi Pooja',
    description: 'Worship of Goddess Lakshmi for wealth and prosperity',
    duration: '45 mins - 1 hour',
    suggestedDonationMin: 501,
    suggestedDonationMax: 1501,
  },
  {
    id: 'ps6',
    name: 'Shraddha / Tarpan',
    description: 'Ancestral rites for departed souls and seeking their blessings',
    duration: '1-2 hours',
    suggestedDonationMin: 1001,
    suggestedDonationMax: 2501,
  },
];

// Sample priests data
export const priests: Priest[] = [
  {
    id: 'p1',
    name: 'Pandit Ramesh Sharma',
    templeId: '1',
    experience: 25,
    languages: ['Hindi', 'Sanskrit', 'Telugu', 'English'],
    specializations: ['Venkateswara Seva', 'Vedic Rituals', 'Marriage Ceremonies'],
    bio: 'Senior priest at Tirumala with expertise in Vaishnava traditions and Vedic rituals.',
    available: true,
  },
  {
    id: 'p2',
    name: 'Pandit Subramaniam Iyer',
    templeId: '3',
    experience: 30,
    languages: ['Tamil', 'Sanskrit', 'English'],
    specializations: ['Meenakshi Amman Pooja', 'Agamic Rituals', 'Temple Ceremonies'],
    bio: 'Experienced in Agamic traditions and Meenakshi temple rituals.',
    available: true,
  },
  {
    id: 'p3',
    name: 'Pandit Vishwanath Mishra',
    templeId: '4',
    experience: 20,
    languages: ['Hindi', 'Sanskrit', 'Bhojpuri'],
    specializations: ['Shiva Pooja', 'Rudrabhishekam', 'Shraddha Rituals'],
    bio: 'Specialist in Shaiva traditions and rituals at Kashi Vishwanath.',
    available: true,
  },
  {
    id: 'p4',
    name: 'Pandit Jagannath Das',
    templeId: '5',
    experience: 22,
    languages: ['Odia', 'Hindi', 'Sanskrit'],
    specializations: ['Jagannath Seva', 'Mahaprasad Rituals', 'Festival Ceremonies'],
    bio: 'Sevayat at Jagannath Temple with deep knowledge of Puri traditions.',
    available: true,
  },
  {
    id: 'p5',
    name: 'Pandit Ganesh Kulkarni',
    templeId: '6',
    experience: 18,
    languages: ['Marathi', 'Hindi', 'Sanskrit', 'English'],
    specializations: ['Ganesh Pooja', 'Satyanarayan Katha', 'Griha Pravesh'],
    bio: 'Expert in Ganapatya traditions and modern-day ritual adaptations.',
    available: true,
  },
];
