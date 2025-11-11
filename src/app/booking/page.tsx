'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layouts';
import { useCreateBooking } from '@/hooks/useBookings';
import { PATNA_SERVICE_AREAS, SUPPORTED_AC_BRANDS } from '@/lib/constants';
import type { ACType, TimeSlot } from '@/types';

const timeSlots: TimeSlot[] = [
  { start: '09:00', end: '12:00', label: 'Morning (9 AM - 12 PM)' },
  { start: '12:00', end: '15:00', label: 'Afternoon (12 PM - 3 PM)' },
  { start: '15:00', end: '18:00', label: 'Evening (3 PM - 6 PM)' },
  { start: '18:00', end: '20:00', label: 'Late Evening (6 PM - 8 PM)' },
];

const acTypes: { value: ACType; label: string }[] = [
  { value: 'split', label: 'Split AC' },
  { value: 'window', label: 'Window AC' },
  { value: 'central', label: 'Central AC' },
  { value: 'cassette', label: 'Cassette AC' },
  { value: 'tower', label: 'Tower AC' },
  { value: 'portable', label: 'Portable AC' },
];

const services = [
  {
    id: 'maintenance',
    name: 'AC Maintenance',
    description: 'Regular maintenance and tune-up',
  },
  {
    id: 'repair',
    name: 'AC Repair',
    description: 'Fix AC problems and issues',
  },
  {
    id: 'installation',
    name: 'AC Installation',
    description: 'New AC installation service',
  },
  {
    id: 'cleaning',
    name: 'AC Cleaning',
    description: 'Deep cleaning and sanitization',
  },
  {
    id: 'emergency',
    name: 'Emergency Service',
    description: '24/7 emergency AC repair',
  },
];

export default function BookingPage() {
  const [formData, setFormData] = useState({
    service: '',
    customerName: '',
    phone: '',
    email: '',
    alternatePhone: '',
    addressType: 'home' as 'home' | 'office' | 'other',
    street: '',
    area: '',
    pincode: '',
    landmarks: '',
    serviceArea: '',
    acBrand: '',
    acModel: '',
    acType: 'split' as ACType,
    acCapacity: '',
    acAge: '',
    preferredDate: '',
    preferredTimeSlot: '',
    urgency: 'normal' as 'normal' | 'urgent' | 'emergency',
    issues: '',
    notes: '',
  });

  const createBookingMutation = useCreateBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createBookingMutation.mutateAsync({
        serviceId: formData.service,
        customer: {
          name: formData.customerName,
          phone: formData.phone,
          email: formData.email || undefined,
          alternatePhone: formData.alternatePhone || undefined,
        },
        preferredDate: formData.preferredDate,
        preferredTimeSlot: {
          start:
            timeSlots.find(t => t.label === formData.preferredTimeSlot)
              ?.start || '09:00',
          end:
            timeSlots.find(t => t.label === formData.preferredTimeSlot)?.end ||
            '12:00',
          label: formData.preferredTimeSlot,
        },
        acDetails: {
          brand: formData.acBrand,
          model: formData.acModel || undefined,
          type: formData.acType,
          capacity: formData.acCapacity || '1.5 Ton',
          age: formData.acAge ? parseInt(formData.acAge) : 1,
          warrantyStatus: 'out_of_warranty',
        },
        address: {
          type: formData.addressType,
          street: formData.street,
          area: formData.serviceArea,
          city: 'Patna',
          state: 'Bihar',
          pincode: formData.pincode,
          landmarks: formData.landmarks ? [formData.landmarks] : undefined,
          isDefault: true,
          serviceArea: formData.serviceArea,
        },
        urgency: formData.urgency,
        notes: formData.issues
          ? `Issues: ${formData.issues}\n\nNotes: ${formData.notes || ''}`
          : formData.notes,
        source: 'website',
      });

      alert(
        'Booking request submitted successfully! We will contact you shortly.'
      );

      // Reset form
      setFormData({
        service: '',
        customerName: '',
        phone: '',
        email: '',
        alternatePhone: '',
        addressType: 'home',
        street: '',
        area: '',
        pincode: '',
        landmarks: '',
        serviceArea: '',
        acBrand: '',
        acModel: '',
        acType: 'split',
        acCapacity: '',
        acAge: '',
        preferredDate: '',
        preferredTimeSlot: '',
        urgency: 'normal',
        issues: '',
        notes: '',
      });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error submitting booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your AC Service
            </h1>
            <p className="text-xl text-indigo-100">
              Schedule professional AC service at your convenience
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  1. Select Service
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(service => (
                    <label
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        formData.service === service.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={formData.service === service.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="font-medium text-gray-900">
                        {service.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {service.description}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. Customer Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alternate Phone
                    </label>
                    <input
                      type="tel"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  3. Service Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Type
                    </label>
                    <select
                      name="addressType"
                      value={formData.addressType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="House/Flat Number, Street Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Area *
                      </label>
                      <select
                        name="serviceArea"
                        value={formData.serviceArea}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select Area</option>
                        {PATNA_SERVICE_AREAS.map(area => (
                          <option key={area.name} value={area.name}>
                            {area.name} - {area.pincode}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="800001"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nearby Landmarks
                      </label>
                      <input
                        type="text"
                        name="landmarks"
                        value={formData.landmarks}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Near AIIMS, Gandhi Maidan, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* AC Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  4. AC Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AC Brand *
                    </label>
                    <select
                      name="acBrand"
                      value={formData.acBrand}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Brand</option>
                      {SUPPORTED_AC_BRANDS.map(brand => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AC Type *
                    </label>
                    <select
                      name="acType"
                      value={formData.acType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {acTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AC Model
                    </label>
                    <input
                      type="text"
                      name="acModel"
                      value={formData.acModel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Model number if known"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AC Capacity
                    </label>
                    <select
                      name="acCapacity"
                      value={formData.acCapacity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Capacity</option>
                      <option value="1 Ton">1 Ton</option>
                      <option value="1.5 Ton">1.5 Ton</option>
                      <option value="2 Ton">2 Ton</option>
                      <option value="2.5 Ton">2.5 Ton</option>
                      <option value="3 Ton">3 Ton</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AC Age (in years)
                    </label>
                    <input
                      type="number"
                      name="acAge"
                      value={formData.acAge}
                      onChange={handleInputChange}
                      min="0"
                      max="30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Approximate age of your AC"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  5. Schedule Service
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={today}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time Slot *
                    </label>
                    <select
                      name="preferredTimeSlot"
                      value={formData.preferredTimeSlot}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Time Slot</option>
                      {timeSlots.map(slot => (
                        <option
                          key={`${slot.start}-${slot.end}`}
                          value={slot.label}
                        >
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urgency Level
                    </label>
                    <div className="flex space-x-4">
                      {[
                        { value: 'normal', label: 'Normal' },
                        { value: 'urgent', label: 'Urgent' },
                        { value: 'emergency', label: 'Emergency' },
                      ].map(option => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="urgency"
                            value={option.value}
                            checked={formData.urgency === option.value}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  6. Additional Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AC Issues/Problems
                    </label>
                    <textarea
                      name="issues"
                      value={formData.issues}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Describe any problems with your AC..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Instructions/Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Any special instructions for our technician..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="border-t pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Book Service'}
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  We&apos;ll contact you within 30 minutes to confirm your
                  booking
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
