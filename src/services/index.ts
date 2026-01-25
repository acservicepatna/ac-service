/**
 * API Services Index
 * Central export point for all API service functions
 */

// Base API configuration and utilities
export * from './api';

// Service Management
export * from './serviceService';

// Booking System
export * from './bookingService';

// Customer Management
export * from './customerService';

// Team/Technician Management
export * from './teamService';

// Testimonials and Reviews
export * from './testimonialService';

// Re-export types for convenience
export type {
  ApiResponse,
  PaginatedResponse,
  Service,
  ServiceCategory,
  BookingRequest,
  Appointment,
  Customer,
  Technician,
  TeamMember,
  Testimonial,
  TimeSlot,
  ServiceArea,
} from '@/types';
