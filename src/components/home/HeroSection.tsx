'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TrustBar } from '@/components/shared/TrustBar';

// Memoized video background to prevent re-renders on language change
const VideoBackground = memo(function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video plays on mount and after any visibility changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay may be blocked, that's ok
        });
      }
    };

    // Play on mount
    playVideo();

    // Re-play when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Also listen for any focus events that might pause the video
    window.addEventListener('focus', playVideo);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', playVideo);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
    </video>
  );
});

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export function HeroSection() {
  const { t, isSpanish } = useLanguage();

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video - Memoized to prevent re-renders on language change */}
      <VideoBackground />

      {/* Warm brand overlay - Desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-footer/85 via-deep-brown/60 to-deep-brown/20 pointer-events-none hidden md:block" />

      {/* Warm brand overlay - Mobile (stronger for readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-footer/90 via-deep-brown/75 to-deep-brown/50 pointer-events-none md:hidden" />

      {/* Content Container - z-10 to sit above video */}
      <div className="relative z-10 section-container py-20 md:py-0">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center min-h-[calc(100vh-160px)]">
          {/* Left Side - Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.p
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-accent text-xl md:text-2xl italic text-gold-accent"
            >
              Houston, Texas
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-display-xl text-cream leading-tight"
            >
              {t('hero.headline')}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="text-lg md:text-xl text-warm-taupe max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t('hero.subheadline')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                {t('hero.cta_primary')}
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4 border-cream/30 text-cream hover:bg-cream/10">
                {t('hero.cta_secondary')}
              </Link>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
              className="pt-4"
            >
              <TrustBar className="justify-center lg:justify-start text-warm-taupe" />
            </motion.div>
          </div>

          {/* Right Side - Photo */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative elements behind photo */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-gold-accent/20" />
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-cream/30" />

              {/* Photo container */}
              <div className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[500px] rounded-2xl overflow-hidden border-2 border-gold-accent/40 shadow-[0_0_60px_rgba(201,146,42,0.25)]">
                {/* Placeholder - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-warm-taupe to-warm-taupe/80 flex items-center justify-center">
                  <div className="text-center text-deep-brown/60">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-cream/50 flex items-center justify-center">
                      <span className="text-4xl">👩🏻</span>
                    </div>
                    <p className="font-display text-lg">Daisy Castro-Shahin</p>
                    <p className="text-sm mt-1">NMLS #2461273</p>
                  </div>
                </div>

                {/* Uncomment when real photo is available */}
                {/* <Image
                  src="/images/daisy-portrait.jpg"
                  alt="Daisy Castro-Shahin - Houston Mortgage Loan Officer"
                  fill
                  className="object-cover"
                  priority
                /> */}
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -left-6 bottom-20 bg-white rounded-xl shadow-lg p-4 border border-brand-border"
              >
                <p className="font-display text-2xl text-gold-accent font-bold">100+</p>
                <p className="text-xs text-text-muted">
                  {isSpanish ? 'Familias Ayudadas' : 'Families Helped'}
                </p>
              </motion.div>

              {/* Second floating badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -right-4 top-20 bg-white rounded-xl shadow-lg p-4 border border-brand-border"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🗣️</span>
                  <div>
                    <p className="font-medium text-deep-brown text-sm">Bilingual</p>
                    <p className="text-xs text-text-muted">EN | ES</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-warm-taupe hover:text-gold-accent transition-colors group"
        aria-label="Scroll to content"
      >
        <span className="text-sm font-medium">
          {isSpanish ? 'Conoce Más' : 'Learn More'}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
