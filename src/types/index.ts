/**
 * Common type definitions for the AC Servicing application
 */

// Service-related types
export interface Service {
  id: string;
  name: string;
  description: string;
  price: {
    min: number;
    max?: number;
    currency: 'INR';
  };
  duration: number; // in minutes
  category: ServiceCategory;
  features: string[];
  isEmergency: boolean;
  availableFor: ACType[];
  warranty?: {
    duration: number; // in days
    coverage: string;
  };
}

export type ServiceCategory =
  | 'maintenance'
  | 'repair'
  | 'installation'
  | 'cleaning'
  | 'emergency';

export type ACType =
  | 'window'
  | 'split'
  | 'central'
  | 'cassette'
  | 'tower'
  | 'portable';

// Booking and Appointment types
export interface BookingRequest {
  serviceId: string;
  customerId?: string; // Optional for new customers
  customer: CustomerDetails;
  preferredDate: string; // ISO date string
  preferredTimeSlot: TimeSlot;
  acDetails: ACDetails;
  address: Address;
  urgency: 'normal' | 'urgent' | 'emergency';
  notes?: string;
  source: 'website' | 'phone' | 'whatsapp' | 'referral';
}

export interface Appointment {
  id: string;
  customerId: string;
  serviceId: string;
  scheduledAt: Date;
  estimatedDuration: number; // in minutes
  status: AppointmentStatus;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  notes?: string;
  technicianId?: string;
  acDetails: ACDetails;
  address: Address;
  pricing: {
    estimated: number;
    actual?: number;
    additionalCharges?: AdditionalCharge[];
  };
  feedback?: CustomerFeedback;
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'technician_assigned'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rescheduled';

export interface TimeSlot {
  start: string; // HH:MM format
  end: string; // HH:MM format
  label: string; // e.g., "Morning", "Afternoon", "Evening"
}

// Customer-related types
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  alternatePhone?: string;
  addresses: Address[];
  customerType: 'residential' | 'commercial';
  loyaltyPoints?: number;
  totalBookings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerDetails {
  name: string;
  email?: string;
  phone: string;
  alternatePhone?: string;
}

export interface Address {
  id?: string;
  type: 'home' | 'office' | 'other';
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmarks?: string[];
  isDefault: boolean;
  serviceArea: string; // From PATNA_SERVICE_AREAS
}

// AC and Equipment types
export interface ACDetails {
  brand: string;
  model?: string;
  type: ACType;
  capacity: string; // e.g., "1.5 Ton", "2 Ton"
  age: number; // in years
  lastServiceDate?: Date;
  warrantyStatus: 'in_warranty' | 'out_of_warranty' | 'extended_warranty';
  issues?: string[];
  installationDate?: Date;
}

// Team and Technician types
export interface Technician {
  id: string;
  name: string;
  phone: string;
  email?: string;
  specializations: ServiceCategory[];
  experience: number; // in years
  certifications: string[];
  rating: number;
  totalJobs: number;
  availableAreas: string[]; // Service areas they cover
  workingHours: {
    start: string;
    end: string;
  };
  isAvailable: boolean;
  emergencyAvailable: boolean;
  profileImage?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'Technician' | 'Senior Technician' | 'Supervisor' | 'Manager';
  experience: number;
  specializations: string[];
  bio: string;
  image?: string;
  certifications: string[];
  contactNumber?: string;
}

// Feedback and Review types
export interface CustomerFeedback {
  id: string;
  appointmentId: string;
  customerId: string;
  rating: number; // 1-5
  comment?: string;
  aspects: {
    punctuality: number;
    workQuality: number;
    behavior: number;
    pricing: number;
  };
  wouldRecommend: boolean;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerArea: string;
  service: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
  image?: string;
}

// Pricing and Payment types
export interface AdditionalCharge {
  description: string;
  amount: number;
  type: 'parts' | 'extra_service' | 'emergency_fee' | 'travel_charge';
}

export interface Invoice {
  id: string;
  appointmentId: string;
  customerId: string;
  items: InvoiceItem[];
  subtotal: number;
  taxes: number;
  discount?: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  dueDate: Date;
  paidAt?: Date;
  createdAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type PaymentStatus = 'pending' | 'paid' | 'partially_paid' | 'overdue';
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'bank_transfer';

// Service Area types
export interface ServiceArea {
  name: string;
  pincode: string;
  landmarks: string[];
  deliveryTime: string; // e.g., "30 minutes"
  emergencyAvailable: boolean;
  additionalCharge?: number;
}

// Utility types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isLoading: boolean;
  isSubmitting: boolean;
}

// Navigation and UI types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface MetaData {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogImage?: string;
}
