'use client';

import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  WhyDaisySection,
  ServicesPreview,
  DPASpotlight,
  HowItWorksSection,
  TestimonialsSection,
  FooterCTA,
} from '@/components/home';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Why Daisy Section */}
        <WhyDaisySection />

        {/* Services Preview */}
        <ServicesPreview />

        {/* DPA Spotlight */}
        <DPASpotlight />

        {/* How It Works */}
        <HowItWorksSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Footer CTA */}
        <FooterCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
