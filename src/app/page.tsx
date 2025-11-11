import { MainLayout } from '@/components/layouts';
import {
  HeroSection,
  EnhancedFeaturedServices,
  ServiceAreasMarquee,
  AMCComparisonSlice,
  TestimonialsSection,
  WhyChooseUs,
  ContactCTA,
} from '@/components/sections';

export default function Home() {
  return (
    <MainLayout showBreadcrumbs={false}>
      {/* Hero Section */}
      <HeroSection />

      {/* Service Areas Marquee */}
      <ServiceAreasMarquee />

      {/* Enhanced Featured Services */}
      <EnhancedFeaturedServices />

      {/* AMC vs One-time Comparison */}
      <AMCComparisonSlice />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Contact CTA */}
      <ContactCTA />
    </MainLayout>
  );
}
