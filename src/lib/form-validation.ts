import * as z from 'zod';

// Centralized validation schemas
export const baseFieldSchemas = {
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),

  email: z.string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),

  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address is too long'),

  service: z.string()
    .min(1, 'Please select a service'),

  area: z.string()
    .min(1, 'Please select your area'),

  urgency: z.enum(['today', 'tomorrow', 'this-week', 'flexible'], {
    required_error: 'Please select your preferred timing',
  }),

  description: z.string()
    .max(500, 'Description is too long')
    .optional(),
};

// Quick booking form schema (3 core fields)
export const quickBookingSchema = z.object({
  name: baseFieldSchemas.name,
  phone: baseFieldSchemas.phone,
  service: baseFieldSchemas.service,
});

// Detailed quote form schema (comprehensive form)
export const detailedQuoteSchema = z.object({
  name: baseFieldSchemas.name,
  phone: baseFieldSchemas.phone,
  email: baseFieldSchemas.email,
  address: baseFieldSchemas.address,
  service: baseFieldSchemas.service,
  area: baseFieldSchemas.area,
  urgency: baseFieldSchemas.urgency,
  description: baseFieldSchemas.description,
});

// Form field configurations
export const FIELD_CONFIGS = {
  name: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    type: 'text' as const,
    icon: 'User',
    mask: null,
  },
  phone: {
    label: 'Mobile Number',
    placeholder: '9876543210',
    type: 'tel' as const,
    icon: 'Phone',
    mask: '999 999 9999',
  },
  email: {
    label: 'Email Address',
    placeholder: 'your.email@example.com',
    type: 'email' as const,
    icon: 'Mail',
    mask: null,
  },
  address: {
    label: 'Complete Address',
    placeholder: 'Enter your complete address with landmark',
    type: 'textarea' as const,
    icon: 'MapPin',
    mask: null,
  },
  service: {
    label: 'Service Required',
    placeholder: 'Select service type',
    type: 'select' as const,
    icon: 'Settings',
    mask: null,
  },
  area: {
    label: 'Service Area',
    placeholder: 'Select your area',
    type: 'select' as const,
    icon: 'MapPin',
    mask: null,
  },
  urgency: {
    label: 'Preferred Timing',
    placeholder: 'When do you need service?',
    type: 'select' as const,
    icon: 'Clock',
    mask: null,
  },
  description: {
    label: 'Additional Details',
    placeholder: 'Any specific requirements or details about the issue...',
    type: 'textarea' as const,
    icon: 'MessageCircle',
    mask: null,
  },
};

// Service options
export const SERVICE_OPTIONS = [
  { value: 'maintenance', label: 'AC Maintenance', price: 'Starting ₹499' },
  { value: 'repair', label: 'AC Repair', price: 'Starting ₹299' },
  { value: 'installation', label: 'AC Installation', price: 'Starting ₹999' },
  { value: 'cleaning', label: 'Deep Cleaning', price: 'Starting ₹399' },
  { value: 'emergency', label: 'Emergency Service', price: 'Starting ₹599' },
  { value: 'gas-refilling', label: 'Gas Refilling', price: 'Starting ₹799' },
];

// Urgency options
export const URGENCY_OPTIONS = [
  { value: 'today', label: 'Today (Emergency)', extra: '+₹200 charge' },
  { value: 'tomorrow', label: 'Tomorrow', extra: 'Next day service' },
  { value: 'this-week', label: 'Within this week', extra: 'Flexible timing' },
  { value: 'flexible', label: 'Flexible timing', extra: 'Best rates' },
];

// Form step configuration
export const FORM_STEPS = {
  DETAILS: 'details',
  CONFIRMATION: 'confirmation',
  SUCCESS: 'success',
} as const;

// Utility functions
export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
};

export const validateField = (fieldName: keyof typeof baseFieldSchemas, value: string) => {
  try {
    baseFieldSchemas[fieldName].parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid value' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export type QuickBookingForm = z.infer<typeof quickBookingSchema>;
export type DetailedQuoteForm = z.infer<typeof detailedQuoteSchema>;
export type FormStep = typeof FORM_STEPS[keyof typeof FORM_STEPS];