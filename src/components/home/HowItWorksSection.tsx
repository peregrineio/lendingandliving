'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Search, CheckCircle, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Steps data
const steps = [
  { icon: FileText, stepKey: 'step1', descKey: 'step1_desc' },
  { icon: Search, stepKey: 'step2', descKey: 'step2_desc' },
  { icon: CheckCircle, stepKey: 'step3', descKey: 'step3_desc' },
  { icon: Home, stepKey: 'step4', descKey: 'step4_desc' },
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

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function HowItWorksSection() {
  const { t } = useLanguage();
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
          className="text-center mb-16"
        >
          <h2 className="text-display-lg text-deep-brown">
            {t('howItWorks.headline')}
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-4 gap-8 relative"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gold-accent/20 via-gold-accent to-gold-accent/20" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative text-center"
            >
              {/* Step number circle */}
              <div className="relative inline-flex mb-6">
                <div className="w-24 h-24 rounded-full bg-gold-accent/10 flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-gold-accent" />
                </div>
                {/* Number badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold-accent text-white flex items-center justify-center font-display font-bold text-lg shadow-md">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl text-deep-brown mb-3">
                {t(`howItWorks.${step.stepKey}`)}
              </h3>
              <p className="text-text-muted leading-relaxed max-w-xs mx-auto">
                {t(`howItWorks.${step.descKey}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
