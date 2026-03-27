'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Testimonials data
const testimonials = {
  en: [
    {
      name: 'Maria G.',
      stars: 5,
      text: "Daisy helped me buy my first home with an ITIN loan. I didn't think it was possible. She made it happen!",
      type: 'ITIN Loan',
    },
    {
      name: 'James T.',
      stars: 5,
      text: 'Best loan officer in Houston. She explained every step clearly and got us a great rate.',
      type: 'FHA Loan',
    },
    {
      name: 'Rosa M.',
      stars: 5,
      text: 'She spoke to us in Spanish the whole time and got us into our dream home.',
      type: 'DPA Program',
    },
  ],
  es: [
    {
      name: 'Maria G.',
      stars: 5,
      text: 'Daisy me ayudó a comprar mi primera casa con un préstamo ITIN. ¡No creía que fuera posible!',
      type: 'Préstamo ITIN',
    },
    {
      name: 'James T.',
      stars: 5,
      text: 'La mejor oficial de préstamos en Houston. Explicó cada paso claramente.',
      type: 'Préstamo FHA',
    },
    {
      name: 'Rosa M.',
      stars: 5,
      text: '¡Gracias Daisy! Nos habló en español todo el tiempo y nos metió a nuestra casa soñada.',
      type: 'Programa DPA',
    },
  ],
};

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentTestimonials = testimonials[language];

  // Auto-rotate on mobile
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentTestimonials.length]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
  };

  return (
    <section ref={sectionRef} className="bg-cream section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-display-lg text-deep-brown">
            {t('testimonials.headline')}
          </h2>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:grid md:grid-cols-3 gap-8"
        >
          {currentTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard testimonial={currentTestimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={goToPrev}
              className="p-2 rounded-full bg-warm-white border border-brand-border hover:border-gold-accent transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-deep-brown" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {currentTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-gold-accent w-6' : 'bg-warm-taupe/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-warm-white border border-brand-border hover:border-gold-accent transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-deep-brown" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonial Card Component
interface TestimonialCardProps {
  testimonial: {
    name: string;
    stars: number;
    text: string;
    type: string;
  };
  delay?: number;
}

function TestimonialCard({ testimonial, delay = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-warm-white rounded-xl p-6 border border-brand-border relative"
    >
      {/* Quote icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-gold-accent/20" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold-accent text-gold-accent" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-text-body italic leading-relaxed mb-6">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center justify-between">
        <p className="font-medium text-deep-brown">{testimonial.name}</p>
        <span className="text-xs px-3 py-1 bg-gold-accent/10 text-gold-accent rounded-full font-medium">
          {testimonial.type}
        </span>
      </div>
    </motion.div>
  );
}
