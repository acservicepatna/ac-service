/**
 * Comprehensive Mock Data Store for AC Servicing Application
 * Realistic data for Patna, Bihar AC servicing business
 */

import type {
  Service,
  ServiceCategory,
  ACType,
  TeamMember,
  Technician,
  Testimonial,
  TimeSlot,
  Customer,
  Appointment,
  ServiceArea,
  ACDetails,
  Address,
} from '@/types';

// Service ID counter for unique IDs
let serviceIdCounter = 1;
let customerIdCounter = 1001;
let appointmentIdCounter = 5001;
let feedbackIdCounter = 7001;

/**
 * Complete AC Services Catalog
 */
export const MOCK_SERVICES: Service[] = [
  // Maintenance Services
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Basic AC Maintenance',
    description:
      'Complete AC checkup with filter cleaning, coil inspection, and performance optimization',
    price: { min: 499, currency: 'INR' },
    duration: 60,
    category: 'maintenance' as ServiceCategory,
    features: [
      'Filter cleaning and replacement',
      'Coil inspection and cleaning',
      'Refrigerant level check',
      'Electrical connection check',
      'Performance optimization',
      '30-day service warranty',
    ],
    isEmergency: false,
    availableFor: ['window', 'split', 'tower', 'portable'] as ACType[],
    warranty: {
      duration: 30,
      coverage: 'Service warranty covering all maintenance work performed',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Premium AC Service',
    description:
      'Comprehensive AC maintenance with deep cleaning, chemical wash, and annual maintenance plan',
    price: { min: 899, max: 1299, currency: 'INR' },
    duration: 120,
    category: 'maintenance' as ServiceCategory,
    features: [
      'Complete system deep clean',
      'Chemical coil wash',
      'Filter replacement',
      'Gas pressure check',
      'Thermostat calibration',
      'Drainage system cleaning',
      '90-day service warranty',
      'Annual maintenance plan',
    ],
    isEmergency: false,
    availableFor: ['window', 'split', 'central', 'cassette'] as ACType[],
    warranty: {
      duration: 90,
      coverage: 'Comprehensive warranty covering parts and service',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Annual Maintenance Contract (AMC)',
    description:
      'Complete yearly AC maintenance package with 4 scheduled services and priority support',
    price: { min: 4999, max: 8999, currency: 'INR' },
    duration: 90,
    category: 'maintenance' as ServiceCategory,
    features: [
      '4 scheduled maintenance visits',
      'Priority emergency support',
      '20% discount on repairs',
      'Free filter replacements',
      'Gas top-up included',
      'Extended warranty coverage',
      '24/7 helpline support',
    ],
    isEmergency: false,
    availableFor: [
      'window',
      'split',
      'central',
      'cassette',
      'tower',
    ] as ACType[],
    warranty: {
      duration: 365,
      coverage: 'Annual comprehensive coverage with parts and labor',
    },
  },

  // Cleaning Services
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'AC Deep Cleaning',
    description:
      'Thorough cleaning of AC unit including filters, coils, and internal components',
    price: { min: 699, max: 999, currency: 'INR' },
    duration: 90,
    category: 'cleaning' as ServiceCategory,
    features: [
      'Deep filter cleaning',
      'Evaporator coil cleaning',
      'Condenser coil cleaning',
      'Blower cleaning',
      'Drainage cleaning',
      'Anti-bacterial treatment',
    ],
    isEmergency: false,
    availableFor: ['window', 'split', 'cassette'] as ACType[],
    warranty: {
      duration: 30,
      coverage: 'Cleaning service warranty',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Chemical Wash Service',
    description:
      'Professional chemical cleaning for heavily soiled AC units with specialized equipment',
    price: { min: 999, max: 1499, currency: 'INR' },
    duration: 150,
    category: 'cleaning' as ServiceCategory,
    features: [
      'Chemical coil wash',
      'High-pressure cleaning',
      'Anti-microbial treatment',
      'Complete system sanitization',
      'Performance restoration',
      '60-day warranty',
    ],
    isEmergency: false,
    availableFor: ['split', 'central', 'cassette'] as ACType[],
    warranty: {
      duration: 60,
      coverage: 'Chemical wash service warranty with performance guarantee',
    },
  },

  // Repair Services
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'AC Diagnostic Service',
    description:
      'Complete diagnostic check to identify AC problems with detailed report',
    price: { min: 199, currency: 'INR' },
    duration: 45,
    category: 'repair' as ServiceCategory,
    features: [
      'Complete system diagnosis',
      'Detailed problem report',
      'Repair cost estimation',
      'Performance analysis',
      'Energy efficiency check',
    ],
    isEmergency: false,
    availableFor: [
      'window',
      'split',
      'central',
      'cassette',
      'tower',
      'portable',
    ] as ACType[],
    warranty: {
      duration: 7,
      coverage: 'Diagnostic service warranty',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Minor AC Repair',
    description:
      'Quick fixes for common AC issues like filter problems, minor leaks, and electrical issues',
    price: { min: 799, max: 1299, currency: 'INR' },
    duration: 75,
    category: 'repair' as ServiceCategory,
    features: [
      'Filter replacement',
      'Minor leak repair',
      'Electrical connection fix',
      'Remote control repair',
      'Basic part replacement',
      '30-day parts warranty',
    ],
    isEmergency: false,
    availableFor: ['window', 'split', 'tower', 'portable'] as ACType[],
    warranty: {
      duration: 30,
      coverage: 'Parts and labor warranty for repair work',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Major AC Repair',
    description:
      'Comprehensive repair for complex AC issues including compressor, PCB, and cooling system problems',
    price: { min: 1999, max: 4999, currency: 'INR' },
    duration: 180,
    category: 'repair' as ServiceCategory,
    features: [
      'Compressor repair/replacement',
      'PCB board repair',
      'Cooling system overhaul',
      'Gas charging',
      'Major component replacement',
      '90-day comprehensive warranty',
    ],
    isEmergency: false,
    availableFor: ['window', 'split', 'central', 'cassette'] as ACType[],
    warranty: {
      duration: 90,
      coverage: 'Comprehensive warranty covering all repaired components',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Gas Refilling Service',
    description:
      'Professional refrigerant gas refilling with leak detection and system optimization',
    price: { min: 1299, max: 2499, currency: 'INR' },
    duration: 90,
    category: 'repair' as ServiceCategory,
    features: [
      'Leak detection test',
      'System pressure check',
      'Gas evacuation',
      'Fresh gas filling',
      'Performance testing',
      '60-day gas warranty',
    ],
    isEmergency: false,
    availableFor: ['window', 'split', 'central', 'cassette'] as ACType[],
    warranty: {
      duration: 60,
      coverage: 'Gas refilling warranty with leak protection',
    },
  },

  // Installation Services
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Window AC Installation',
    description:
      'Complete window AC installation with proper mounting, electrical work, and testing',
    price: { min: 1999, max: 2999, currency: 'INR' },
    duration: 120,
    category: 'installation' as ServiceCategory,
    features: [
      'Professional mounting',
      'Electrical wiring',
      'Window bracket installation',
      'Safety testing',
      'Performance check',
      '1-year installation warranty',
    ],
    isEmergency: false,
    availableFor: ['window'] as ACType[],
    warranty: {
      duration: 365,
      coverage: 'Installation warranty covering mounting and electrical work',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Split AC Installation',
    description:
      'Professional split AC installation with copper piping, electrical setup, and commissioning',
    price: { min: 2999, max: 4499, currency: 'INR' },
    duration: 180,
    category: 'installation' as ServiceCategory,
    features: [
      'Indoor unit mounting',
      'Outdoor unit installation',
      'Copper piping work',
      'Electrical connections',
      'Gas charging',
      'System commissioning',
      '2-year installation warranty',
    ],
    isEmergency: false,
    availableFor: ['split'] as ACType[],
    warranty: {
      duration: 730,
      coverage: 'Comprehensive installation warranty',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Central AC Installation',
    description:
      'Complete central AC system installation with ductwork, electrical setup, and commissioning',
    price: { min: 9999, max: 19999, currency: 'INR' },
    duration: 480,
    category: 'installation' as ServiceCategory,
    features: [
      'System design consultation',
      'Ductwork installation',
      'Central unit mounting',
      'Electrical setup',
      'Zoning configuration',
      'Complete commissioning',
      '3-year installation warranty',
    ],
    isEmergency: false,
    availableFor: ['central'] as ACType[],
    warranty: {
      duration: 1095,
      coverage: 'Complete central AC installation warranty',
    },
  },

  // Emergency Services
  {
    id: `srv_${serviceIdCounter++}`,
    name: '24/7 Emergency Repair',
    description:
      'Round-the-clock emergency AC repair service with rapid response team',
    price: { min: 599, max: 1999, currency: 'INR' },
    duration: 60,
    category: 'emergency' as ServiceCategory,
    features: [
      '24/7 availability',
      '30-minute response time',
      'Emergency diagnostic',
      'Immediate repairs',
      'Emergency parts availability',
      'Same-day resolution',
    ],
    isEmergency: true,
    availableFor: [
      'window',
      'split',
      'central',
      'cassette',
      'tower',
      'portable',
    ] as ACType[],
    warranty: {
      duration: 15,
      coverage: 'Emergency repair warranty',
    },
  },
  {
    id: `srv_${serviceIdCounter++}`,
    name: 'Emergency Gas Leak Repair',
    description:
      'Immediate response for AC gas leaks with safety assessment and quick repair',
    price: { min: 899, max: 2499, currency: 'INR' },
    duration: 90,
    category: 'emergency' as ServiceCategory,
    features: [
      'Immediate safety assessment',
      'Leak detection and repair',
      'Emergency gas evacuation',
      'Temporary cooling solution',
      '24/7 priority support',
      'Safety certification',
    ],
    isEmergency: true,
    availableFor: ['split', 'central', 'cassette'] as ACType[],
    warranty: {
      duration: 30,
      coverage: 'Emergency gas leak repair warranty',
    },
  },
];

/**
 * Team Members and Technicians
 */
export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm_001',
    name: 'Rajesh Kumar Singh',
    role: 'Senior Technician',
    experience: 8,
    specializations: [
      'Split AC Installation',
      'Central AC Repair',
      'Gas Refilling',
    ],
    bio: 'Expert in all types of AC installations and repairs with 8 years of experience in Patna. Certified technician specializing in split and central AC systems.',
    image: '/images/team/rajesh-kumar.jpg',
    certifications: [
      'LG Certified Technician',
      'Daikin Installation Expert',
      'Refrigeration License',
    ],
    contactNumber: '+91-9876543210',
  },
  {
    id: 'tm_002',
    name: 'Amit Sharma',
    role: 'Manager',
    experience: 12,
    specializations: ['Team Management', 'Customer Service', 'Quality Control'],
    bio: 'Operations manager with over 12 years in the HVAC industry. Ensures quality service delivery and customer satisfaction across all projects.',
    image: '/images/team/amit-sharma.jpg',
    certifications: [
      'HVAC Management Certificate',
      'Customer Service Excellence',
      'Safety Management',
    ],
    contactNumber: '+91-9876543211',
  },
  {
    id: 'tm_003',
    name: 'Vikash Yadav',
    role: 'Technician',
    experience: 5,
    specializations: ['AC Cleaning', 'Maintenance', 'Minor Repairs'],
    bio: 'Skilled technician specializing in AC maintenance and cleaning services. Known for attention to detail and customer-friendly approach.',
    image: '/images/team/vikash-yadav.jpg',
    certifications: [
      'Basic Refrigeration Course',
      'Chemical Cleaning Specialist',
    ],
    contactNumber: '+91-9876543212',
  },
  {
    id: 'tm_004',
    name: 'Deepak Gupta',
    role: 'Senior Technician',
    experience: 10,
    specializations: [
      'Emergency Services',
      'Complex Repairs',
      'System Diagnostics',
    ],
    bio: 'Emergency service specialist with 10 years of experience handling complex AC repairs and urgent service calls in Patna area.',
    image: '/images/team/deepak-gupta.jpg',
    certifications: [
      'Advanced Diagnostics',
      'Emergency Service Training',
      'Samsung Certified',
    ],
    contactNumber: '+91-9876543213',
  },
  {
    id: 'tm_005',
    name: 'Sunil Kumar',
    role: 'Technician',
    experience: 3,
    specializations: ['Window AC Service', 'Basic Repairs', 'Installation'],
    bio: 'Junior technician with strong foundation in window AC servicing and basic repairs. Rapidly gaining expertise in split AC systems.',
    image: '/images/team/sunil-kumar.jpg',
    certifications: ['Basic HVAC Training', 'Electrical Safety Course'],
    contactNumber: '+91-9876543214',
  },
  {
    id: 'tm_006',
    name: 'Manoj Singh',
    role: 'Supervisor',
    experience: 15,
    specializations: ['Quality Assurance', 'Training', 'Technical Support'],
    bio: 'Technical supervisor with 15 years of experience overseeing AC installation and repair projects. Expert in quality control and team training.',
    image: '/images/team/manoj-singh.jpg',
    certifications: [
      'Supervisor License',
      'Quality Management',
      'Technical Training Certification',
    ],
    contactNumber: '+91-9876543215',
  },
];

/**
 * Detailed Technician Profiles
 */
export const MOCK_TECHNICIANS: Technician[] = [
  {
    id: 'tech_001',
    name: 'Rajesh Kumar Singh',
    phone: '+91-9876543210',
    email: 'rajesh@acservicingpro.com',
    specializations: ['maintenance', 'installation', 'repair'],
    experience: 8,
    certifications: [
      'LG Certified Technician',
      'Daikin Installation Expert',
      'Refrigeration License Grade A',
    ],
    rating: 4.8,
    totalJobs: 1247,
    availableAreas: ['Boring Road', 'Kankarbagh', 'Fraser Road', 'Bailey Road'],
    workingHours: { start: '08:00', end: '18:00' },
    isAvailable: true,
    emergencyAvailable: true,
    profileImage: '/images/technicians/rajesh-kumar.jpg',
  },
  {
    id: 'tech_002',
    name: 'Deepak Gupta',
    phone: '+91-9876543213',
    email: 'deepak@acservicingpro.com',
    specializations: ['emergency', 'repair'],
    experience: 10,
    certifications: [
      'Advanced Diagnostics',
      'Emergency Service Training',
      'Samsung Certified Technician',
    ],
    rating: 4.9,
    totalJobs: 1856,
    availableAreas: ['Patliputra', 'Danapur', 'Rajendra Nagar', 'Kidwaipuri'],
    workingHours: { start: '06:00', end: '22:00' },
    isAvailable: true,
    emergencyAvailable: true,
    profileImage: '/images/technicians/deepak-gupta.jpg',
  },
  {
    id: 'tech_003',
    name: 'Vikash Yadav',
    phone: '+91-9876543212',
    email: 'vikash@acservicingpro.com',
    specializations: ['cleaning', 'maintenance'],
    experience: 5,
    certifications: [
      'Basic Refrigeration Course',
      'Chemical Cleaning Specialist',
      'Safety Training',
    ],
    rating: 4.6,
    totalJobs: 892,
    availableAreas: ['Digha', 'Patrakar Nagar', 'Bailey Road', 'Fraser Road'],
    workingHours: { start: '09:00', end: '17:00' },
    isAvailable: true,
    emergencyAvailable: false,
    profileImage: '/images/technicians/vikash-yadav.jpg',
  },
  {
    id: 'tech_004',
    name: 'Sunil Kumar',
    phone: '+91-9876543214',
    specializations: ['maintenance', 'installation'],
    experience: 3,
    certifications: ['Basic HVAC Training', 'Electrical Safety Course'],
    rating: 4.4,
    totalJobs: 456,
    availableAreas: ['Kankarbagh', 'Boring Road', 'Rajendra Nagar'],
    workingHours: { start: '09:00', end: '18:00' },
    isAvailable: true,
    emergencyAvailable: false,
    profileImage: '/images/technicians/sunil-kumar.jpg',
  },
];

/**
 * Customer Testimonials and Reviews
 */
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: `test_${feedbackIdCounter++}`,
    customerName: 'Mrs. Priya Sharma',
    customerArea: 'Boring Road',
    service: 'Split AC Installation',
    rating: 5,
    comment:
      'Excellent service! Rajesh ji installed my new Daikin split AC perfectly. Very professional work with proper piping and electrical connections. The AC is working efficiently and quietly. Highly recommend AC Servicing Pro.',
    date: new Date('2024-01-15'),
    verified: true,
    image: '/images/customers/priya-sharma.jpg',
  },
  {
    id: `test_${feedbackIdCounter++}`,
    customerName: 'Mr. Anil Kumar',
    customerArea: 'Kankarbagh',
    service: 'Emergency AC Repair',
    rating: 5,
    comment:
      'My AC stopped working on a hot summer evening. Called their emergency service and Deepak ji reached within 30 minutes! Fixed the compressor issue quickly. Great emergency response team.',
    date: new Date('2024-01-20'),
    verified: true,
  },
  {
    id: `test_${feedbackIdCounter++}`,
    customerName: 'Dr. Santosh Singh',
    customerArea: 'Fraser Road',
    service: 'Annual Maintenance Contract',
    rating: 4,
    comment:
      'Very satisfied with their AMC service. Regular maintenance visits keep my office ACs running perfectly. The team is professional and punctual. Good value for money.',
    date: new Date('2024-01-25'),
    verified: true,
  },
  {
    id: `test_${feedbackIdCounter++}`,
    customerName: 'Ms. Neha Gupta',
    customerArea: 'Bailey Road',
    service: 'AC Deep Cleaning',
    rating: 5,
    comment:
      'Amazing deep cleaning service! My 3-year-old split AC was not cooling properly. After their chemical wash service, it works like new. Vikash ji did excellent work.',
    date: new Date('2024-02-01'),
    verified: true,
    image: '/images/customers/neha-gupta.jpg',
  },
  {
    id: `test_${feedbackIdCounter++}`,
    customerName: 'Mr. Rakesh Yadav',
    customerArea: 'Patliputra',
    service: 'Gas Refilling Service',
    rating: 4,
    comment:
      'Professional gas refilling service with proper leak testing. The technician explained everything clearly and provided warranty on the work. AC cooling improved significantly.',
    date: new Date('2024-02-05'),
    verified: true,
  },
  {
    id: `test_${feedbackIdCounter++}`,
    customerName: 'Mrs. Sunita Devi',
    customerArea: 'Rajendra Nagar',
    service: 'Window AC Installation',
    rating: 5,
    comment:
      'Perfect window AC installation in my bedroom. The team arrived on time, completed the work neatly, and cleaned up afterward. Very reasonable pricing too.',
    date: new Date('2024-02-10'),
    verified: true,
  },
  {
    id: `test_${feedbackIdCounter++}`,
    customerName: 'Mr. Vijay Kumar',
    customerArea: 'Digha',
    service: 'Central AC Maintenance',
    rating: 4,
    comment:
      'Regular maintenance of our office central AC system. The team is knowledgeable and ensures minimal disruption to office work. Satisfied with the service quality.',
    date: new Date('2024-02-15'),
    verified: true,
  },
  {
    id: `test_${feedbackIdCounter++}`,
    customerName: 'Mrs. Kavita Singh',
    customerArea: 'Kidwaipuri',
    service: 'AC Diagnostic Service',
    rating: 5,
    comment:
      'My AC had some unusual noise issues. Their diagnostic service identified the problem accurately and provided detailed explanation with cost estimate. Very transparent service.',
    date: new Date('2024-02-18'),
    verified: true,
  },
];

/**
 * Available Time Slots
 */
export const MOCK_TIME_SLOTS: TimeSlot[] = [
  { start: '09:00', end: '12:00', label: 'Morning' },
  { start: '12:00', end: '15:00', label: 'Afternoon' },
  { start: '15:00', end: '18:00', label: 'Evening' },
  { start: '18:00', end: '21:00', label: 'Night' },
];

/**
 * Emergency Time Slots (24/7 availability)
 */
export const MOCK_EMERGENCY_TIME_SLOTS: TimeSlot[] = [
  { start: '00:00', end: '06:00', label: 'Late Night' },
  { start: '06:00', end: '09:00', label: 'Early Morning' },
  { start: '09:00', end: '12:00', label: 'Morning' },
  { start: '12:00', end: '15:00', label: 'Afternoon' },
  { start: '15:00', end: '18:00', label: 'Evening' },
  { start: '18:00', end: '21:00', label: 'Night' },
  { start: '21:00', end: '24:00', label: 'Late Night' },
];

/**
 * Enhanced Service Areas with Coverage Details
 */
export const MOCK_SERVICE_AREAS: ServiceArea[] = [
  {
    name: 'Boring Road',
    pincode: '800001',
    landmarks: [
      'AIIMS Patna',
      'Boring Canal',
      'Exhibition Road',
      'Rajiv Nagar',
    ],
    deliveryTime: '20 minutes',
    emergencyAvailable: true,
    additionalCharge: 0,
  },
  {
    name: 'Kankarbagh',
    pincode: '800020',
    landmarks: [
      'Kankarbagh Main Road',
      'Buddha Colony',
      'Anand Puri',
      'West Gandhi Maidan',
    ],
    deliveryTime: '25 minutes',
    emergencyAvailable: true,
    additionalCharge: 0,
  },
  {
    name: 'Fraser Road',
    pincode: '800001',
    landmarks: [
      'Golghar',
      'Gandhi Maidan',
      'Fraser Road Area',
      'Income Tax Office',
    ],
    deliveryTime: '15 minutes',
    emergencyAvailable: true,
    additionalCharge: 0,
  },
  {
    name: 'Patliputra',
    pincode: '800013',
    landmarks: [
      'Patliputra Stadium',
      'Saguna More',
      'ISBT Patna',
      'Collectorate',
    ],
    deliveryTime: '30 minutes',
    emergencyAvailable: true,
    additionalCharge: 50,
  },
  {
    name: 'Bailey Road',
    pincode: '800014',
    landmarks: [
      'Hartali More',
      'Bailey Road Market',
      'Sri Krishna Puri',
      'Hanuman Nagar',
    ],
    deliveryTime: '20 minutes',
    emergencyAvailable: true,
    additionalCharge: 0,
  },
  {
    name: 'Rajendra Nagar',
    pincode: '800016',
    landmarks: [
      'Rajendra Nagar Terminal',
      'IGIMS',
      'Keshri Nagar',
      'Rajendra Nagar Railway Station',
    ],
    deliveryTime: '35 minutes',
    emergencyAvailable: true,
    additionalCharge: 100,
  },
  {
    name: 'Danapur',
    pincode: '801503',
    landmarks: [
      'Danapur Cantonment',
      'Danapur Railway Station',
      'Danapur Nizamat',
    ],
    deliveryTime: '45 minutes',
    emergencyAvailable: true,
    additionalCharge: 150,
  },
  {
    name: 'Digha',
    pincode: '800011',
    landmarks: ['Digha Ghat', 'Ashok Nagar', 'Digha Main Road', 'Bankipur'],
    deliveryTime: '30 minutes',
    emergencyAvailable: true,
    additionalCharge: 50,
  },
  {
    name: 'Kidwaipuri',
    pincode: '800002',
    landmarks: ['Kidwaipuri Main Road', 'Power Grid Corporation', 'Mahendru'],
    deliveryTime: '25 minutes',
    emergencyAvailable: true,
    additionalCharge: 0,
  },
  {
    name: 'Patrakar Nagar',
    pincode: '800013',
    landmarks: ['Press Club', 'Patrakar Nagar Main Road', 'Saguna More'],
    deliveryTime: '30 minutes',
    emergencyAvailable: true,
    additionalCharge: 50,
  },
];

/**
 * AC Brands and Models Database
 */
export const MOCK_AC_BRANDS_MODELS = {
  LG: [
    'Dual Cool',
    'Convertible 4-in-1',
    'AI ThinQ',
    'Artcool Gallery',
    'Mega Ahista',
  ],
  Samsung: [
    'WindFree',
    'Convertible 5-in-1',
    'Digital Inverter',
    'AR9000',
    'Triangle AC',
  ],
  Daikin: [
    'Inverter Split',
    'Super Multi NX-II',
    'VRV IV',
    'FTKP Series',
    'FTXM Series',
  ],
  Voltas: [
    'Inverter Split',
    'Fixed Speed',
    'Vectra Elite',
    'Maha Adjustable',
    'All Weather',
  ],
  Hitachi: [
    'Kashikoi 5400i',
    'Merai 3100s',
    'Toushi 3100s',
    'Inverter Split',
    'Window AC',
  ],
  'Blue Star': [
    'Inverter Split',
    'Fixed Speed Split',
    'Cassette AC',
    'VRF Systems',
    'Precision AC',
  ],
  Godrej: [
    'Inverter Split',
    'Fixed Speed',
    'Green Inverter',
    'NXW Series',
    'GIC Series',
  ],
  Carrier: [
    'Inverter Split',
    'Fixed Speed',
    'Cassette AC',
    'VRF',
    'Ductable AC',
  ],
  'O General': [
    'Inverter Split',
    'Fixed Speed Split',
    'Cassette AC',
    'ASGG Series',
    'ASGA Series',
  ],
  Whirlpool: [
    'Inverter Split',
    'Fixed Speed',
    'Magicool',
    'Fantasia',
    'Supreme Cool',
  ],
};

/**
 * Mock Customer Database
 */
export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: `cust_${customerIdCounter++}`,
    name: 'Mrs. Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543201',
    addresses: [
      {
        id: 'addr_001',
        type: 'home',
        street: '123, Boring Road',
        area: 'Boring Road',
        city: 'Patna',
        state: 'Bihar',
        pincode: '800001',
        landmarks: ['Near AIIMS Patna'],
        isDefault: true,
        serviceArea: 'Boring Road',
      },
    ],
    customerType: 'residential',
    loyaltyPoints: 150,
    totalBookings: 3,
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: `cust_${customerIdCounter++}`,
    name: 'Mr. Anil Kumar',
    email: 'anil.kumar@email.com',
    phone: '+91-9876543202',
    addresses: [
      {
        id: 'addr_002',
        type: 'home',
        street: '45, Buddha Colony',
        area: 'Kankarbagh',
        city: 'Patna',
        state: 'Bihar',
        pincode: '800020',
        landmarks: ['Near Kankarbagh Main Road'],
        isDefault: true,
        serviceArea: 'Kankarbagh',
      },
    ],
    customerType: 'residential',
    loyaltyPoints: 200,
    totalBookings: 4,
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: `cust_${customerIdCounter++}`,
    name: 'Dr. Santosh Singh',
    phone: '+91-9876543203',
    addresses: [
      {
        id: 'addr_003',
        type: 'office',
        street: 'Singh Clinic, Fraser Road',
        area: 'Fraser Road',
        city: 'Patna',
        state: 'Bihar',
        pincode: '800001',
        landmarks: ['Near Golghar'],
        isDefault: true,
        serviceArea: 'Fraser Road',
      },
    ],
    customerType: 'commercial',
    loyaltyPoints: 500,
    totalBookings: 8,
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2024-01-25'),
  },
];

/**
 * Mock Appointments Database
 */
export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: `apt_${appointmentIdCounter++}`,
    customerId: 'cust_1001',
    serviceId: 'srv_10',
    scheduledAt: new Date('2024-02-28T10:00:00'),
    estimatedDuration: 180,
    status: 'confirmed',
    priority: 'medium',
    notes:
      'Customer preferred morning slot. Split AC in bedroom needs installation.',
    technicianId: 'tech_001',
    acDetails: {
      brand: 'Daikin',
      model: 'FTKP Series',
      type: 'split',
      capacity: '1.5 Ton',
      age: 0,
      warrantyStatus: 'in_warranty',
    } as ACDetails,
    address: {
      type: 'home',
      street: '123, Boring Road',
      area: 'Boring Road',
      city: 'Patna',
      state: 'Bihar',
      pincode: '800001',
      landmarks: ['Near AIIMS Patna'],
      isDefault: true,
      serviceArea: 'Boring Road',
    } as Address,
    pricing: {
      estimated: 2999,
      actual: 2999,
    },
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-27'),
  },
  {
    id: `apt_${appointmentIdCounter++}`,
    customerId: 'cust_1002',
    serviceId: 'srv_12',
    scheduledAt: new Date('2024-02-29T19:30:00'),
    estimatedDuration: 90,
    status: 'completed',
    priority: 'emergency',
    notes: 'Emergency service call - AC not cooling',
    technicianId: 'tech_002',
    acDetails: {
      brand: 'LG',
      model: 'Dual Cool',
      type: 'split',
      capacity: '1 Ton',
      age: 2,
      warrantyStatus: 'out_of_warranty',
      issues: ['Not cooling', 'Strange noise'],
    } as ACDetails,
    address: {
      type: 'home',
      street: '45, Buddha Colony',
      area: 'Kankarbagh',
      city: 'Patna',
      state: 'Bihar',
      pincode: '800020',
      landmarks: ['Near Kankarbagh Main Road'],
      isDefault: true,
      serviceArea: 'Kankarbagh',
    } as Address,
    pricing: {
      estimated: 899,
      actual: 1299,
      additionalCharges: [
        {
          description: 'Emergency service charge',
          amount: 400,
          type: 'emergency_fee',
        },
      ],
    },
    createdAt: new Date('2024-02-29'),
    updatedAt: new Date('2024-02-29'),
  },
];

/**
 * Emergency Response Data
 */
export const MOCK_EMERGENCY_DATA = {
  responseTime: {
    'Boring Road': 20,
    'Fraser Road': 15,
    'Bailey Road': 20,
    Kankarbagh: 25,
    Kidwaipuri: 25,
    Digha: 30,
    'Patrakar Nagar': 30,
    Patliputra: 30,
    'Rajendra Nagar': 35,
    Danapur: 45,
  },
  emergencyCharges: {
    night_hours: 300, // 9 PM to 6 AM
    weekend: 200, // Saturday after 6 PM, Sunday
    holiday: 400, // National holidays
    same_day: 150, // Same day service
  },
  availableTechnicians: [
    {
      id: 'tech_001',
      name: 'Rajesh Kumar Singh',
      areas: ['Boring Road', 'Kankarbagh', 'Fraser Road', 'Bailey Road'],
    },
    {
      id: 'tech_002',
      name: 'Deepak Gupta',
      areas: ['Patliputra', 'Danapur', 'Rajendra Nagar', 'Kidwaipuri'],
    },
  ],
  emergencyEquipment: [
    { name: 'Portable Compressor', available: true },
    { name: 'Gas Charging Kit', available: true },
    { name: 'Emergency Cooling Unit', available: false },
    { name: 'Diagnostic Tools', available: true },
  ],
};

/**
 * Booking Availability Data
 */
export const MOCK_BOOKING_AVAILABILITY = {
  '2024-03-01': {
    Morning: { available: true, slots: 2 },
    Afternoon: { available: true, slots: 1 },
    Evening: { available: false, slots: 0 },
    Night: { available: true, slots: 3 },
  },
  '2024-03-02': {
    Morning: { available: false, slots: 0 },
    Afternoon: { available: true, slots: 2 },
    Evening: { available: true, slots: 2 },
    Night: { available: true, slots: 1 },
  },
  '2024-03-03': {
    Morning: { available: true, slots: 3 },
    Afternoon: { available: true, slots: 3 },
    Evening: { available: true, slots: 2 },
    Night: { available: true, slots: 1 },
  },
};

/**
 * Utility Functions for Mock Data
 */

// Generate random delay to simulate network latency
export const simulateNetworkDelay = (min = 300, max = 1500): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Generate unique IDs
export const generateId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get random items from array
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Calculate service area additional charge
export const calculateServiceAreaCharge = (areaName: string): number => {
  const area = MOCK_SERVICE_AREAS.find(a => a.name === areaName);
  return area?.additionalCharge || 0;
};

// Check if emergency service is available in area
export const isEmergencyAvailable = (areaName: string): boolean => {
  const area = MOCK_SERVICE_AREAS.find(a => a.name === areaName);
  return area?.emergencyAvailable || false;
};

// Get estimated response time for area
export const getEstimatedResponseTime = (areaName: string): string => {
  const area = MOCK_SERVICE_AREAS.find(a => a.name === areaName);
  return area?.deliveryTime || '45 minutes';
};
