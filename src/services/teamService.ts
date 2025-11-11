/**
 * Team/Technician Management API Functions
 * Handles technician profiles, availability, and team-related operations
 */

import type {
  Technician,
  TeamMember,
  ServiceCategory,
  ApiResponse,
  PaginatedResponse,
} from '@/types';
import {
  MOCK_TECHNICIANS,
  MOCK_TEAM_MEMBERS,
  simulateNetworkDelay,
  generateId,
} from '@/lib/mockData';
import {
  createApiResponse,
  createPaginatedResponse,
  handleApiError,
} from './api';

// In-memory storage for mock technicians
const mockTechnicians = [...MOCK_TECHNICIANS];
const mockTeamMembers = [...MOCK_TEAM_MEMBERS];

export interface TechnicianFilters {
  specialization?: ServiceCategory;
  area?: string;
  isAvailable?: boolean;
  emergencyAvailable?: boolean;
  minRating?: number;
  minExperience?: number;
}

export interface TechnicianListParams {
  page?: number;
  limit?: number;
  filters?: TechnicianFilters;
  sortBy?: 'name' | 'rating' | 'experience' | 'totalJobs';
  sortOrder?: 'asc' | 'desc';
}

export interface TechnicianAvailabilityRequest {
  date: string; // YYYY-MM-DD format
  timeSlot: string; // HH:MM-HH:MM format
  area: string;
  isEmergency?: boolean;
}

export interface TechnicianSchedule {
  date: string;
  timeSlots: {
    start: string;
    end: string;
    status: 'available' | 'booked' | 'break';
    appointmentId?: string;
    customerName?: string;
    service?: string;
  }[];
}

/**
 * Get all technicians with filtering and pagination
 */
export const getTechnicians = async (
  params: TechnicianListParams = {}
): Promise<PaginatedResponse<Technician>> => {
  try {
    await simulateNetworkDelay(400, 700);

    const {
      page = 1,
      limit = 10,
      filters = {},
      sortBy = 'rating',
      sortOrder = 'desc',
    } = params;

    let filteredTechnicians = [...mockTechnicians];

    // Apply filters
    if (filters.specialization) {
      filteredTechnicians = filteredTechnicians.filter(technician =>
        technician.specializations.includes(filters.specialization!)
      );
    }

    if (filters.area) {
      filteredTechnicians = filteredTechnicians.filter(technician =>
        technician.availableAreas.some(area =>
          area.toLowerCase().includes(filters.area!.toLowerCase())
        )
      );
    }

    if (filters.isAvailable !== undefined) {
      filteredTechnicians = filteredTechnicians.filter(
        technician => technician.isAvailable === filters.isAvailable
      );
    }

    if (filters.emergencyAvailable !== undefined) {
      filteredTechnicians = filteredTechnicians.filter(
        technician =>
          technician.emergencyAvailable === filters.emergencyAvailable
      );
    }

    if (filters.minRating) {
      filteredTechnicians = filteredTechnicians.filter(
        technician => technician.rating >= filters.minRating!
      );
    }

    if (filters.minExperience) {
      filteredTechnicians = filteredTechnicians.filter(
        technician => technician.experience >= filters.minExperience!
      );
    }

    // Apply sorting
    filteredTechnicians.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'experience':
          comparison = a.experience - b.experience;
          break;
        case 'totalJobs':
          comparison = a.totalJobs - b.totalJobs;
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTechnicians = filteredTechnicians.slice(
      startIndex,
      endIndex
    );

    return createPaginatedResponse(
      paginatedTechnicians,
      page,
      limit,
      filteredTechnicians.length
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get technician by ID
 */
export const getTechnicianById = async (
  id: string
): Promise<ApiResponse<Technician | null>> => {
  try {
    await simulateNetworkDelay(200, 400);

    const technician = mockTechnicians.find(tech => tech.id === id);

    if (!technician) {
      return createApiResponse(null, `Technician with ID ${id} not found`);
    }

    return createApiResponse(technician, 'Technician retrieved successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get available technicians for a specific service and area
 */
export const getAvailableTechnicians = async (
  serviceCategory: ServiceCategory,
  area: string,
  date: string,
  timeSlot: string
): Promise<ApiResponse<Technician[]>> => {
  try {
    await simulateNetworkDelay(400, 600);

    const availableTechnicians = mockTechnicians.filter(technician => {
      // Check if technician specializes in the service category
      const hasSpecialization =
        technician.specializations.includes(serviceCategory);

      // Check if technician covers the area
      const coversArea = technician.availableAreas.some(
        techArea => techArea.toLowerCase() === area.toLowerCase()
      );

      // Check if technician is generally available
      const isAvailable = technician.isAvailable;

      return hasSpecialization && coversArea && isAvailable;
    });

    // Sort by rating and experience
    availableTechnicians.sort((a, b) => {
      const ratingDiff = b.rating - a.rating;
      return ratingDiff !== 0 ? ratingDiff : b.experience - a.experience;
    });

    return createApiResponse(
      availableTechnicians,
      `Found ${availableTechnicians.length} available technicians for ${serviceCategory} in ${area}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get emergency technicians
 */
export const getEmergencyTechnicians = async (
  area: string
): Promise<ApiResponse<Technician[]>> => {
  try {
    await simulateNetworkDelay(200, 400);

    const emergencyTechnicians = mockTechnicians.filter(technician => {
      const isEmergencyAvailable = technician.emergencyAvailable;
      const coversArea = technician.availableAreas.some(
        techArea => techArea.toLowerCase() === area.toLowerCase()
      );
      const isAvailable = technician.isAvailable;

      return isEmergencyAvailable && coversArea && isAvailable;
    });

    // Sort by rating for emergency services
    emergencyTechnicians.sort((a, b) => b.rating - a.rating);

    return createApiResponse(
      emergencyTechnicians,
      `Found ${emergencyTechnicians.length} emergency technicians in ${area}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Check technician availability
 */
export const checkTechnicianAvailability = async (
  technicianId: string,
  request: TechnicianAvailabilityRequest
): Promise<
  ApiResponse<{
    available: boolean;
    reason?: string;
    nextAvailable?: string;
    alternativeSlots?: string[];
  }>
> => {
  try {
    await simulateNetworkDelay(300, 500);

    const technician = mockTechnicians.find(tech => tech.id === technicianId);

    if (!technician) {
      throw new Error(`Technician with ID ${technicianId} not found`);
    }

    // Mock availability logic
    const { date, timeSlot, area, isEmergency = false } = request;

    // Check if technician covers the area
    const coversArea = technician.availableAreas.some(
      techArea => techArea.toLowerCase() === area.toLowerCase()
    );

    if (!coversArea) {
      return createApiResponse(
        {
          available: false,
          reason: `Technician does not cover ${area} area`,
        },
        'Technician not available for the requested area'
      );
    }

    // Check if technician is available for emergency
    if (isEmergency && !technician.emergencyAvailable) {
      return createApiResponse(
        {
          available: false,
          reason: 'Technician not available for emergency services',
        },
        'Technician not available for emergency'
      );
    }

    // Check working hours
    const [startTime] = timeSlot.split('-');
    const requestedHour = parseInt(startTime.split(':')[0]);
    const workingStartHour = parseInt(
      technician.workingHours.start.split(':')[0]
    );
    const workingEndHour = parseInt(technician.workingHours.end.split(':')[0]);

    if (requestedHour < workingStartHour || requestedHour >= workingEndHour) {
      return createApiResponse(
        {
          available: false,
          reason: `Technician works from ${technician.workingHours.start} to ${technician.workingHours.end}`,
          alternativeSlots: [
            `${technician.workingHours.start}-${workingStartHour + 3}:00`,
          ],
        },
        'Requested time is outside technician working hours'
      );
    }

    // Mock availability (80% chance of being available)
    const isAvailable = Math.random() > 0.2;

    return createApiResponse(
      {
        available: isAvailable,
        reason: isAvailable
          ? undefined
          : 'Technician already booked for this slot',
        nextAvailable: isAvailable ? undefined : '2024-03-02',
        alternativeSlots: isAvailable
          ? undefined
          : ['10:00-13:00', '15:00-18:00'],
      },
      isAvailable ? 'Technician is available' : 'Technician is not available'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get technician's schedule for a specific date
 */
export const getTechnicianSchedule = async (
  technicianId: string,
  date: string
): Promise<ApiResponse<TechnicianSchedule>> => {
  try {
    await simulateNetworkDelay(400, 600);

    const technician = mockTechnicians.find(tech => tech.id === technicianId);

    if (!technician) {
      throw new Error(`Technician with ID ${technicianId} not found`);
    }

    // Mock schedule generation
    const workingStart = parseInt(technician.workingHours.start.split(':')[0]);
    const workingEnd = parseInt(technician.workingHours.end.split(':')[0]);

    const timeSlots = [];
    for (let hour = workingStart; hour < workingEnd; hour += 3) {
      const start = `${hour.toString().padStart(2, '0')}:00`;
      const end = `${Math.min(hour + 3, workingEnd)
        .toString()
        .padStart(2, '0')}:00`;

      // Mock some booked slots
      const isBooked = Math.random() > 0.6;
      const isBreak = hour === 12; // Lunch break

      let status: 'available' | 'booked' | 'break' = 'available';
      let appointmentData = {};

      if (isBreak) {
        status = 'break';
      } else if (isBooked) {
        status = 'booked';
        appointmentData = {
          appointmentId: generateId('apt'),
          customerName: 'John Doe',
          service: 'AC Maintenance',
        };
      }

      timeSlots.push({
        start,
        end,
        status,
        ...appointmentData,
      });
    }

    const schedule: TechnicianSchedule = {
      date,
      timeSlots,
    };

    return createApiResponse(schedule, `Schedule retrieved for ${date}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get all team members
 */
export const getTeamMembers = async (): Promise<ApiResponse<TeamMember[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    return createApiResponse(
      mockTeamMembers,
      `Retrieved ${mockTeamMembers.length} team members`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get team member by ID
 */
export const getTeamMemberById = async (
  id: string
): Promise<ApiResponse<TeamMember | null>> => {
  try {
    await simulateNetworkDelay(200, 400);

    const teamMember = mockTeamMembers.find(member => member.id === id);

    if (!teamMember) {
      return createApiResponse(null, `Team member with ID ${id} not found`);
    }

    return createApiResponse(teamMember, 'Team member retrieved successfully');
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get technicians by specialization
 */
export const getTechniciansBySpecialization = async (
  specialization: ServiceCategory
): Promise<ApiResponse<Technician[]>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const specialists = mockTechnicians.filter(technician =>
      technician.specializations.includes(specialization)
    );

    // Sort by rating and experience
    specialists.sort((a, b) => {
      const ratingDiff = b.rating - a.rating;
      return ratingDiff !== 0 ? ratingDiff : b.experience - a.experience;
    });

    return createApiResponse(
      specialists,
      `Found ${specialists.length} technicians specializing in ${specialization}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Get technician statistics
 */
export const getTechnicianStats = async (): Promise<
  ApiResponse<{
    total: number;
    available: number;
    emergencyAvailable: number;
    averageRating: number;
    averageExperience: number;
    specializations: { [key in ServiceCategory]: number };
    areasCovered: { area: string; technicianCount: number }[];
  }>
> => {
  try {
    await simulateNetworkDelay(400, 600);

    const total = mockTechnicians.length;
    const available = mockTechnicians.filter(tech => tech.isAvailable).length;
    const emergencyAvailable = mockTechnicians.filter(
      tech => tech.emergencyAvailable
    ).length;

    const averageRating =
      mockTechnicians.reduce((sum, tech) => sum + tech.rating, 0) / total;
    const averageExperience =
      mockTechnicians.reduce((sum, tech) => sum + tech.experience, 0) / total;

    // Count specializations
    const specializations: { [key in ServiceCategory]: number } = {
      maintenance: 0,
      repair: 0,
      installation: 0,
      cleaning: 0,
      emergency: 0,
    };

    mockTechnicians.forEach(tech => {
      tech.specializations.forEach(spec => {
        specializations[spec]++;
      });
    });

    // Count area coverage
    const areaCounts: Record<string, number> = {};
    mockTechnicians.forEach(tech => {
      tech.availableAreas.forEach(area => {
        areaCounts[area] = (areaCounts[area] || 0) + 1;
      });
    });

    const areasCovered = Object.entries(areaCounts)
      .map(([area, technicianCount]) => ({ area, technicianCount }))
      .sort((a, b) => b.technicianCount - a.technicianCount);

    const stats = {
      total,
      available,
      emergencyAvailable,
      averageRating: Math.round(averageRating * 10) / 10,
      averageExperience: Math.round(averageExperience * 10) / 10,
      specializations,
      areasCovered,
    };

    return createApiResponse(
      stats,
      'Technician statistics calculated successfully'
    );
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Update technician availability
 */
export const updateTechnicianAvailability = async (
  technicianId: string,
  isAvailable: boolean,
  reason?: string
): Promise<ApiResponse<Technician>> => {
  try {
    await simulateNetworkDelay(300, 500);

    const technicianIndex = mockTechnicians.findIndex(
      tech => tech.id === technicianId
    );

    if (technicianIndex === -1) {
      throw new Error(`Technician with ID ${technicianId} not found`);
    }

    mockTechnicians[technicianIndex].isAvailable = isAvailable;

    return createApiResponse(
      mockTechnicians[technicianIndex],
      `Technician availability updated to ${isAvailable ? 'available' : 'unavailable'}${reason ? `: ${reason}` : ''}`
    );
  } catch (error) {
    throw handleApiError(error);
  }
};
