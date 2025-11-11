'use client';

import { MainLayout } from '@/components/layouts';
import { ServicesGrid } from '@/components/services';
import { ContactCTA } from '@/components/sections';
import { useServices } from '@/hooks';
import { SUPPORTED_AC_BRANDS } from '@/lib/constants';

export default function ServicesPageClient() {
  const {
    data: servicesResponse,
    isLoading,
    error,
    refetch,
  } = useServices({
    page: 1,
    limit: 20,
  });

  const services = Array.isArray(servicesResponse?.data)
    ? servicesResponse.data
    : [];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional AC Services in Patna
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Complete air conditioning solutions for residential and commercial
              properties. Expert technicians, genuine parts, and guaranteed
              satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our AC Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive AC services with transparent pricing and quality
              guarantee
            </p>
          </div>

          <ServicesGrid
            services={services}
            isLoading={isLoading}
            error={error?.message || null}
            onRefresh={() => refetch()}
          />
        </div>
      </section>

      {/* Supported Brands */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AC Brands We Service
            </h2>
            <p className="text-lg text-gray-600">
              Expert service for all major AC brands with genuine parts
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {SUPPORTED_AC_BRANDS.map(brand => (
              <div
                key={brand}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </MainLayout>
  );
}
