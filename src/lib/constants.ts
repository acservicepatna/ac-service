/**
 * Application constants and configuration for AC Service Patna - Patna, Bihar
 */

export const APP_CONFIG = {
  name: 'AC Service Patna',
  description: 'Professional AC Servicing Solutions in Patna',
  version: '1.0.0',
  author: 'AC Service Patna Team',
  location: 'Patna, Bihar',
  logo: '/logo.webp',
} as const;

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  BOOKING: '/booking',
  CONTACT: '/contact',
  ABOUT: '/about',
} as const;

export const SERVICE_CATEGORIES = {
  MAINTENANCE: 'maintenance',
  REPAIR: 'repair',
  INSTALLATION: 'installation',
  CLEANING: 'cleaning',
  EMERGENCY: 'emergency',
} as const;

export const APPOINTMENT_STATUSES = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Patna Service Areas
export const PATNA_SERVICE_AREAS = [
  {
    name: 'Boring Road',
    pincode: '800001',
    landmarks: ['AIIMS Patna', 'Boring Canal', 'Exhibition Road'],
  },
  {
    name: 'Kankarbagh',
    pincode: '800020',
    landmarks: ['Kankarbagh Main Road', 'Buddha Colony', 'Anand Puri'],
  },
  {
    name: 'Fraser Road',
    pincode: '800001',
    landmarks: ['Golghar', 'Gandhi Maidan', 'Fraser Road Area'],
  },
  {
    name: 'Patliputra',
    pincode: '800013',
    landmarks: ['Patliputra Stadium', 'Saguna More', 'ISBT Patna'],
  },
  {
    name: 'Danapur',
    pincode: '801503',
    landmarks: ['Danapur Cantonment', 'Danapur Railway Station'],
  },
  {
    name: 'Bailey Road',
    pincode: '800014',
    landmarks: ['Hartali More', 'Bailey Road Market', 'Sri Krishna Puri'],
  },
  {
    name: 'Rajendra Nagar',
    pincode: '800016',
    landmarks: ['Rajendra Nagar Terminal', 'IGIMS', 'Keshri Nagar'],
  },
  {
    name: 'Kidwaipuri',
    pincode: '800002',
    landmarks: ['Kidwaipuri Main Road', 'Power Grid Corporation'],
  },
  {
    name: 'Digha',
    pincode: '800011',
    landmarks: ['Digha Ghat', 'Ashok Nagar', 'Digha Main Road'],
  },
  {
    name: 'Patrakar Nagar',
    pincode: '800013',
    landmarks: ['Press Club', 'Patrakar Nagar Main Road'],
  },
] as const;

// Contact Information
export const CONTACT_INFO = {
  phone: {
    primary: '+91-9296746329',
    emergency: '+91-9296746329',
    whatsapp: '+91-9296746329',
    display: '9296746329',
  },
  email: {
    primary: 'contact.acservicepatna@gmail.com',
    support: 'contact.acservicepatna@gmail.com',
    emergency: 'contact.acservicepatna@gmail.com',
  },
  social: {
    instagram: 'https://www.instagram.com/acservicepatna',
    instagramUsername: '@acservicepatna',
    facebook: 'https://www.facebook.com/acservicespatna',
    facebookUsername: 'acservicespatna',
    youtube: 'https://www.youtube.com/@AcServicePatna',
    youtubeUsername: '@AcServicePatna',
  },
  hours: {
    regular: 'Mon-Sun: 8:00 AM - 8:00 PM',
    emergency: 'Emergency Services: 24/7',
  },
  address: {
    street: 'Shop No. 15, Ground Floor, Bailey Road',
    area: 'Near Hartali More',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800014',
    country: 'India',
  },
  coordinates: {
    latitude: 25.5941,
    longitude: 85.1376,
  },
} as const;

// Business Hours
export const BUSINESS_HOURS = {
  regular: {
    monday: { open: '09:00', close: '19:00', isOpen: true },
    tuesday: { open: '09:00', close: '19:00', isOpen: true },
    wednesday: { open: '09:00', close: '19:00', isOpen: true },
    thursday: { open: '09:00', close: '19:00', isOpen: true },
    friday: { open: '09:00', close: '19:00', isOpen: true },
    saturday: { open: '09:00', close: '17:00', isOpen: true },
    sunday: { open: '10:00', close: '16:00', isOpen: true },
  },
  emergency: {
    available: true,
    hours: '24/7',
    additionalCharge: true,
    description: 'Emergency AC repair services available round the clock',
  },
} as const;

// Service Pricing (Base rates in INR)
export const SERVICE_PRICING = {
  maintenance: {
    basic: 499,
    premium: 899,
    annual: 4999,
  },
  repair: {
    diagnostic: 199,
    minor: 799,
    major: 1999,
  },
  installation: {
    window: 1999,
    split: 2999,
    central: 9999,
  },
  cleaning: {
    basic: 399,
    deep: 699,
    chemical: 999,
  },
  emergency: {
    callout: 299,
    hourly: 599,
  },
} as const;

// AC Brands Serviced
export const SUPPORTED_AC_BRANDS = [
  'LG',
  'Samsung',
  'Voltas',
  'Hitachi',
  'Daikin',
  'Blue Star',
  'Godrej',
  'Whirlpool',
  'Carrier',
  'O General',
  'Panasonic',
  'Lloyd',
  'Haier',
  'Videocon',
  'IFB',
] as const;

// Emergency Response Time
export const EMERGENCY_RESPONSE = {
  withinPatna: '30 minutes',
  nearbyAreas: '45 minutes',
  farAreas: '60 minutes',
  conditions: 'Subject to traffic and weather conditions',
} as const;
