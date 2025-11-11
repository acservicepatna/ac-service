/**
 * Booking System API Functions
 * Handles appointment scheduling, availability checking, and booking management
 */

import type {
  BookingRequest,
  Appointment,
  ApiResponse,
  PaginatedResponse,
  TimeSlot,
  AppointmentStatus,
} from '@/types';
import {
  MOCK_APPOINTMENTS,
  MOCK_TIME_SLOTS,
  MOCK_EMERGENCY_TIME_SLOTS,
  MOCK_BOOKING_AVAILABILITY,
  simulateNetworkDelay,
  generateId,
} from '@/lib/mockData';
import {
  createApiResponse,
  createPaginatedResponse,
  handleApiError,
} from './api';

// In-memory storage for mock appointments
const mockAppointments = [...MOCK_APPOINTMENTS];

export interface BookingFilters {
  status?: AppointmentStatus;
  customerId?: string;
  serviceId?: string;
  technicianId?: string;
  dateFrom?: string;
  dateTo?: string;
  priority?: 'low' | 'medium' | 'high' | 'emergency';
}

export interface BookingListParams {
  page?: number;
  limit?: number;
  filters?: BookingFilters;
  sortBy?: 'scheduledAt' | 'createdAt' | 'priority' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface AvailabilityRequest {
  date: string; // YYYY-MM-DD format
  serviceArea: string;
  isEmergency?: boolean;
  duration?: number; // in minutes
}

export interface AvailabilityResponse {
  date: string;
  timeSlots: (TimeSlot & {
    available: boolean;
    availableSlots: number;
    nextAvailable?: string;
  })[];
  emergencyAvailable: boolean;
  recommendedSlots: TimeSlot[];
}

/**
 * Create a new booking/appointment
 */
export const createBooking = async (
  bookingRequest: BookingRequest
): Promise<ApiResponse<Appointment>> => {
  try {
    await simulateNetworkDelay(800, 1200);

    // Validate booking request
    if (!bookingRequest.serviceId) {
      throw new Error('Service ID is required');
    }

    if (!bookingRequest.customer.phone) {
      throw new Error('Customer phone number is required');
    }

    // Generate customer ID if not provided
    const customerId = bookingRequest.customerId || generateId('cust');

    // Create new appointment
    const newAppointment: Appointment = {
      id: generateId('apt'),
      customerId,
      serviceId: bookingRequest.serviceId,
      scheduledAt: new Date(bookingRequest.preferredDate),
      estimatedDuration: 90, // Default duration, should be fetched from service
      status: 'scheduled',
      priority:
        bookingRequest.urgency === 'emergency'
          ? 'emergency'
          : bookingRequest.urgency === 'urgent'
            ? 'high'
            : 'medium',
      notes: bookingRequest.notes,
      acDetails: bookingRequest.acDetails,
      address: bookingRequest.address,
      pricing: {
        estimated: 999, // Mock price, should be calculated from service pricing
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to mock storage
    mockAppointments.push(newAppointment);

    return createApiResponse(
      newAppointment,
      'Booking created successfully. You will receive a confirmation call shortly.'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get booking by ID
 */
export const getBookingById = async (
  id: string
): Promise<ApiResponse<Appointment | null>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const appointment = mockAppointments.find(apt => apt.id === id);

    if (!appointment) {
      return createApiResponse(null, `Booking with ID ${id} not found`);
    }

    return createApiResponse(appointment, 'Booking retrieved successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get all bookings with filtering and pagination
 */
export const getBookings = async (
  params: BookingListParams = {}
): Promise<PaginatedResponse<Appointment>> => {
  try {
    await simulateNetworkDelay(400, 700);

    const {
      page = 1,
      limit = 10,
      filters = {},
      sortBy = 'scheduledAt',
      sortOrder = 'desc',
    } = params;

    let filteredBookings = [...mockAppointments];

    // Apply filters
    if (filters.status) {
      filteredBookings = filteredBookings.filter(
        booking => booking.status === filters.status
      );
    }

    if (filters.customerId) {
      filteredBookings = filteredBookings.filter(
        booking => booking.customerId === filters.customerId
      );
    }

    if (filters.serviceId) {
      filteredBookings = filteredBookings.filter(
        booking => booking.serviceId === filters.serviceId
      );
    }

    if (filters.technicianId) {
      filteredBookings = filteredBookings.filter(
        booking => booking.technicianId === filters.technicianId
      );
    }

    if (filters.priority) {
      filteredBookings = filteredBookings.filter(
        booking => booking.priority === filters.priority
      );
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filteredBookings = filteredBookings.filter(
        booking => new Date(booking.scheduledAt) >= fromDate
      );
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      filteredBookings = filteredBookings.filter(
        booking => new Date(booking.scheduledAt) <= toDate
      );
    }

    // Apply sorting
    filteredBookings.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'scheduledAt':
          comparison =
            new Date(a.scheduledAt).getTime() -
            new Date(b.scheduledAt).getTime();
          break;
        case 'createdAt':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'priority':
          const priorityOrder = { emergency: 4, high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

    return createPaginatedResponse(
      paginatedBookings,
      page,
      limit,
      filteredBookings.length
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (
  id: string,
  status: AppointmentStatus,
  notes?: string
): Promise<ApiResponse<Appointment>> => {
  try {
    await simulateNetworkDelay(400, 600);

    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === id);

    if (appointmentIndex === -1) {
      throw new Error(`Booking with ID ${id} not found`);
    }

    // Update appointment
    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      status,
      notes: notes || mockAppointments[appointmentIndex].notes,
      updatedAt: new Date(),
    };

    return createApiResponse(
      mockAppointments[appointmentIndex],
      `Booking status updated to ${status}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Cancel booking
 */
export const cancelBooking = async (
  id: string,
  reason?: string
): Promise<ApiResponse<Appointment>> => {
  try {
    await simulateNetworkDelay(500, 700);

    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === id);

    if (appointmentIndex === -1) {
      throw new Error(`Booking with ID ${id} not found`);
    }

    // Update appointment status to cancelled
    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      status: 'cancelled',
      notes: reason ? `Cancelled: ${reason}` : 'Booking cancelled by user',
      updatedAt: new Date(),
    };

    return createApiResponse(
      mockAppointments[appointmentIndex],
      'Booking cancelled successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Reschedule booking
 */
export const rescheduleBooking = async (
  id: string,
  newDate: string,
  newTimeSlot: TimeSlot,
  reason?: string
): Promise<ApiResponse<Appointment>> => {
  try {
    await simulateNetworkDelay(600, 800);

    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === id);

    if (appointmentIndex === -1) {
      throw new Error(`Booking with ID ${id} not found`);
    }

    // Update appointment schedule
    mockAppointments[appointmentIndex] = {
      ...mockAppointments[appointmentIndex],
      scheduledAt: new Date(`${newDate}T${newTimeSlot.start}:00`),
      status: 'rescheduled',
      notes: reason
        ? `Rescheduled: ${reason}`
        : 'Booking rescheduled by request',
      updatedAt: new Date(),
    };

    return createApiResponse(
      mockAppointments[appointmentIndex],
      'Booking rescheduled successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Check availability for a specific date and area
 */
export const checkAvailability = async (
  request: AvailabilityRequest
): Promise<ApiResponse<AvailabilityResponse>> => {
  try {
    await simulateNetworkDelay(300, 600);

    const { date, serviceArea, isEmergency = false, duration = 90 } = request;

    // Get base time slots
    const baseTimeSlots = isEmergency
      ? MOCK_EMERGENCY_TIME_SLOTS
      : MOCK_TIME_SLOTS;

    // Mock availability calculation
    const availabilityData = MOCK_BOOKING_AVAILABILITY[date] || {
      Morning: { available: true, slots: 3 },
      Afternoon: { available: true, slots: 2 },
      Evening: { available: true, slots: 1 },
      Night: { available: isEmergency, slots: isEmergency ? 2 : 0 },
    };

    const timeSlots = baseTimeSlots.map(slot => {
      const availability = availabilityData[slot.label] || {
        available: false,
        slots: 0,
      };
      return {
        ...slot,
        available: availability.available,
        availableSlots: availability.slots,
        nextAvailable: !availability.available ? '2024-03-02' : undefined,
      };
    });

    // Recommend best available slots
    const recommendedSlots = timeSlots
      .filter(slot => slot.available && slot.availableSlots > 0)
      .slice(0, 3);

    const response: AvailabilityResponse = {
      date,
      timeSlots,
      emergencyAvailable: serviceArea !== 'Danapur', // Mock emergency availability
      recommendedSlots,
    };

    return createApiResponse(
      response,
      `Availability checked for ${date} in ${serviceArea}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get upcoming bookings for a customer
 */
export const getCustomerUpcomingBookings = async (
  customerId: string
): Promise<ApiResponse<Appointment[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const now = new Date();
    const upcomingBookings = mockAppointments
      .filter(
        booking =>
          booking.customerId === customerId &&
          new Date(booking.scheduledAt) > now &&
          !['cancelled', 'completed'].includes(booking.status)
      )
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );

    return createApiResponse(
      upcomingBookings,
      `Found ${upcomingBookings.length} upcoming bookings`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get booking history for a customer
 */
export const getCustomerBookingHistory = async (
  customerId: string,
  limit: number = 10
): Promise<ApiResponse<Appointment[]>> => {
  try {
    await simulateNetworkDelay(400, 600);

    const bookingHistory = mockAppointments
      .filter(booking => booking.customerId === customerId)
      .sort(
        (a, b) =>
          new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
      )
      .slice(0, limit);

    return createApiResponse(
      bookingHistory,
      `Retrieved ${bookingHistory.length} booking records`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get technician's daily schedule
 */
export const getTechnicianSchedule = async (
  technicianId: string,
  date: string
): Promise<ApiResponse<Appointment[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const scheduleDate = new Date(date);
    const nextDay = new Date(scheduleDate);
    nextDay.setDate(scheduleDate.getDate() + 1);

    const dailySchedule = mockAppointments
      .filter(
        booking =>
          booking.technicianId === technicianId &&
          new Date(booking.scheduledAt) >= scheduleDate &&
          new Date(booking.scheduledAt) < nextDay &&
          !['cancelled'].includes(booking.status)
      )
      .sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
      );

    return createApiResponse(dailySchedule, `Retrieved schedule for ${date}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get booking statistics
 */
export const getBookingStats = async (
  dateFrom?: string,
  dateTo?: string
): Promise<
  ApiResponse<{
    total: number;
    completed: number;
    cancelled: number;
    pending: number;
    emergency: number;
    averageRating: number;
  }>
> => {
  try {
    await simulateNetworkDelay(400, 600);

    let filteredBookings = [...mockAppointments];

    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredBookings = filteredBookings.filter(
        booking => new Date(booking.createdAt) >= fromDate
      );
    }

    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredBookings = filteredBookings.filter(
        booking => new Date(booking.createdAt) <= toDate
      );
    }

    const stats = {
      total: filteredBookings.length,
      completed: filteredBookings.filter(b => b.status === 'completed').length,
      cancelled: filteredBookings.filter(b => b.status === 'cancelled').length,
      pending: filteredBookings.filter(b =>
        ['scheduled', 'confirmed'].includes(b.status)
      ).length,
      emergency: filteredBookings.filter(b => b.priority === 'emergency')
        .length,
      averageRating: 4.6, // Mock average rating
    };

    return createApiResponse(
      stats,
      'Booking statistics calculated successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};
