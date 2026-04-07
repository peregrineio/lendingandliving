'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Home, Globe, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Card data with icons
const cards = [
  { icon: Home, titleKey: 'card1_title', descKey: 'card1_desc' },
  { icon: Globe, titleKey: 'card2_title', descKey: 'card2_desc' },
  { icon: FileText, titleKey: 'card3_title', descKey: 'card3_desc' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function WhyDaisySection() {
  const { t, isSpanish } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="bg-warm-white section-padding">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-display-lg text-deep-brown mb-6">
            {t('whyDaisy.headline')}
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            {t('whyDaisy.subheadline')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="card-base card-hover relative overflow-hidden"
            >
              {/* Gold top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold-accent" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gold-accent/10 flex items-center justify-center mb-6">
                <card.icon className="w-7 h-7 text-gold-accent" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl text-deep-brown mb-3">
                {t(`whyDaisy.${card.titleKey}`)}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {t(`whyDaisy.${card.descKey}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-cream rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo placeholder */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-warm-taupe/50 border-4 border-gold-accent/20 flex items-center justify-center overflow-hidden">
                {/* Placeholder - replace with actual image */}
                <span className="text-6xl">👩🏻</span>
                {/* <Image
                  src="/images/daisy-headshot.jpg"
                  alt="Daisy Castro"
                  width={160}
                  height={160}
                  className="object-cover"
                /> */}
              </div>
            </div>

            {/* Bio text */}
            <div className="text-center md:text-left">
              <blockquote className="text-lg md:text-xl text-deep-brown leading-relaxed mb-4">
                &ldquo;{t('whyDaisy.bio')}&rdquo;
              </blockquote>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <p className="font-display text-lg text-gold-accent font-semibold">
                  Daisy Castro
                </p>
                <span className="hidden md:block text-warm-taupe">|</span>
                <p className="text-sm text-text-muted">
                  {isSpanish ? 'Oficial de Préstamos Hipotecarios' : 'Mortgage Loan Officer'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
