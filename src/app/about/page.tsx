import type { Metadata } from 'next';
import Link from 'next/link';
import { User, Target, Handshake, Zap, Star, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import MainLayout from '@/components/layouts/MainLayout';

import type { TeamMember, Testimonial } from '@/types';

export const metadata: Metadata = {
  title: 'About Us | AC Servicing Pro Patna | Expert AC Technicians & Company',
  description:
    'Learn about AC Servicing Pro - Patna&apos;s trusted AC service provider. Meet our certified technicians with 10+ years experience. Professional AC repair, maintenance, and installation services across Patna.',
  keywords:
    'about AC Servicing Pro, AC technicians Patna, professional AC service team, certified AC repair experts Patna, AC installation specialists Bihar, experienced AC maintenance team',
  openGraph: {
    title: 'About AC Servicing Pro | Expert AC Service Team in Patna',
    description:
      'Professional AC service team with 10+ years experience in Patna. Certified technicians for all AC brands with guaranteed quality service.',
    type: 'website',
  },
};

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Senior Technician',
    experience: 12,
    specializations: ['Split AC', 'Central AC', 'Installation'],
    bio: 'Senior technician with over 12 years of experience in AC installation and repair. Specializes in commercial HVAC systems and complex troubleshooting.',
    certifications: [
      'HVAC Certification',
      'Refrigeration Expert',
      'Safety Training',
    ],
    contactNumber: '+91-9876543211',
  },
  {
    id: '2',
    name: 'Amit Singh',
    role: 'Technician',
    experience: 8,
    specializations: ['Window AC', 'Split AC', 'Maintenance'],
    bio: 'Expert in AC maintenance and repair with focus on residential services. Known for quick diagnostics and customer satisfaction.',
    certifications: ['AC Repair Specialist', 'Customer Service Excellence'],
    contactNumber: '+91-9876543212',
  },
  {
    id: '3',
    name: 'Pradeep Sharma',
    role: 'Supervisor',
    experience: 15,
    specializations: ['All AC Types', 'Team Management', 'Quality Control'],
    bio: 'Operations supervisor ensuring quality standards and customer satisfaction across all service calls. Former HVAC engineer with extensive field experience.',
    certifications: ['HVAC Engineer', 'Quality Management', 'Team Leadership'],
    contactNumber: '+91-9876543213',
  },
  {
    id: '4',
    name: 'Sanjay Gupta',
    role: 'Technician',
    experience: 6,
    specializations: ['Emergency Repair', 'Cleaning Services', 'Split AC'],
    bio: 'Specialist in emergency AC repairs and deep cleaning services. Available for urgent service calls and known for quick problem resolution.',
    certifications: ['Emergency Response', 'AC Cleaning Specialist'],
    contactNumber: '+91-9876543214',
  },
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    customerName: 'Suresh Prasad',
    customerArea: 'Boring Road',
    service: 'AC Repair',
    rating: 5,
    comment:
      'Excellent service! My AC was not cooling properly for weeks. Rajesh Kumar diagnosed the issue quickly and fixed it within 2 hours. Very professional and reasonable pricing.',
    date: new Date('2024-01-15'),
    verified: true,
  },
  {
    id: '2',
    customerName: 'Anita Kumari',
    customerArea: 'Kankarbagh',
    service: 'AC Installation',
    rating: 5,
    comment:
      'Had my new split AC installed by AC Servicing Pro. The installation was clean, professional, and completed on time. The technician explained everything clearly.',
    date: new Date('2024-01-10'),
    verified: true,
  },
  {
    id: '3',
    customerName: 'Dr. Rakesh Singh',
    customerArea: 'Fraser Road',
    service: 'Emergency Service',
    rating: 5,
    comment:
      'Called them at 11 PM for emergency AC repair in summer. They came within 45 minutes and fixed the problem. Truly 24/7 service as promised.',
    date: new Date('2024-01-08'),
    verified: true,
  },
  {
    id: '4',
    customerName: 'Meera Devi',
    customerArea: 'Patliputra',
    service: 'AC Maintenance',
    rating: 4,
    comment:
      'Regular maintenance service is very good. They clean the AC thoroughly and explain what needs attention. Fair pricing and honest service.',
    date: new Date('2024-01-05'),
    verified: true,
  },
];

const companyStats = [
  { label: 'Years of Experience', value: '10+' },
  { label: 'Happy Customers', value: '5,000+' },
  { label: 'Service Areas', value: '15+' },
  { label: 'Expert Technicians', value: '8+' },
];

export default function AboutPage() {
  return (
    <MainLayout>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About AC Servicing Pro
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Your trusted partner for professional AC services in Patna. Over a
              decade of experience in keeping homes and businesses comfortable.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  AC Servicing Pro was founded in 2014 with a simple mission: to
                  provide reliable, professional AC services to the people of
                  Patna. What started as a small team of 2 technicians has grown
                  into Patna&apos;s most trusted AC service provider.
                </p>
                <p>
                  We understand the importance of a comfortable home and
                  workspace, especially in Bihar&apos;s hot climate. Our team of
                  certified technicians brings years of experience and technical
                  expertise to every service call, ensuring your AC systems run
                  efficiently and reliably.
                </p>
                <p>
                  From emergency repairs to routine maintenance, from new
                  installations to deep cleaning services, we&apos;ve built our
                  reputation on quality workmanship, transparent pricing, and
                  exceptional customer service.
                </p>
              </div>
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">
                  Company Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {companyStats.map(stat => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Quality First
                </h3>
                <p className="text-muted-foreground">
                  We never compromise on quality. Every service call is performed
                  with precision and attention to detail.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Customer Trust
                </h3>
                <p className="text-muted-foreground">
                  Building lasting relationships through transparent pricing,
                  honest communication, and reliable service.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Quick Response
                </h3>
                <p className="text-muted-foreground">
                  Fast, efficient service when you need it most. Emergency support
                  available 24/7 across Patna.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Certified technicians with years of experience and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <Badge variant="secondary" className="mt-1">
                      {member.experience} years experience
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        Specializations:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {member.specializations.join(', ')}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        Certifications:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {member.certifications.join(', ')}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real feedback from satisfied customers across Patna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    {testimonial.verified && (
                      <Badge variant="default" className="ml-2 bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    &quot;{testimonial.comment}&quot;
                  </p>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div>
                      <div className="font-medium text-foreground">
                        {testimonial.customerName}
                      </div>
                      <div>
                        {testimonial.customerArea} • {testimonial.service}
                      </div>
                    </div>
                    <div>{testimonial.date.toLocaleDateString('en-IN')}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Experience Professional AC Service?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers across Patna. Book your
            service today and experience the AC Servicing Pro difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/booking">
                Book Service Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
