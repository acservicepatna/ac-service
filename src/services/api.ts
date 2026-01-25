/**
 * Base API Service Configuration
 * Handles API endpoints, error handling, and response formatting
 */

import type { ApiResponse, PaginatedResponse } from '@/types';

// API Base Configuration
export const API_CONFIG = {
  baseUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : '/api',
  timeout: 10000,
  retries: 3,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Services
  SERVICES: '/services',
  SERVICE_BY_ID: (id: string) => `/services/${id}`,
  SERVICE_CATEGORIES: '/services/categories',

  // Bookings
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
  BOOKING_AVAILABILITY: '/bookings/availability',

  // Customers
  CUSTOMERS: '/customers',
  CUSTOMER_BY_ID: (id: string) => `/customers/${id}`,
  CUSTOMER_BOOKINGS: (id: string) => `/customers/${id}/bookings`,

  // Technicians
  TECHNICIANS: '/technicians',
  TECHNICIAN_BY_ID: (id: string) => `/technicians/${id}`,
  TECHNICIAN_AVAILABILITY: (id: string) => `/technicians/${id}/availability`,

  // Service Areas
  SERVICE_AREAS: '/service-areas',
  AREA_AVAILABILITY: (area: string) => `/service-areas/${area}/availability`,

  // Testimonials
  TESTIMONIALS: '/testimonials',

  // Team
  TEAM_MEMBERS: '/team',

  // Emergency
  EMERGENCY_AVAILABILITY: '/emergency/availability',
  EMERGENCY_RESPONSE_TIME: '/emergency/response-time',
} as const;

// Error Types
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Request/Response Interceptors
export const createApiResponse = <T>(
  data: T,
  message: string = 'Success',
  meta?: any
): ApiResponse<T> => ({
  data,
  message,
  success: true,
  meta,
});

export const createErrorResponse = (
  message: string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): ApiResponse<null> => ({
  data: null,
  message,
  success: false,
});

export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): PaginatedResponse<T> => ({
  data,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  },
});

// Utility Functions
export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApiError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  return new ApiError(
    'An unexpected error occurred',
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
};

// Retry mechanism for failed requests
export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = API_CONFIG.retries,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        break;
      }

      // Exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, delay * Math.pow(2, attempt))
      );
    }
  }

  throw lastError!;
};

// Mock delay simulation
export const simulateDelay = (
  min: number = 300,
  max: number = 1500
): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};
