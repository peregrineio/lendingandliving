'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { TrustBar } from '@/components/shared/TrustBar';

const VideoBackground = memo(function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    playVideo();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
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
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <VideoBackground />

      <div className="absolute inset-0 bg-gradient-to-r from-dark-footer/85 via-deep-brown/60 to-deep-brown/20 pointer-events-none hidden md:block" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-footer/90 via-deep-brown/75 to-deep-brown/50 pointer-events-none md:hidden" />

      <div className="relative z-10 section-container py-20 md:py-0">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center min-h-[calc(100vh-320px)] pb-8 md:pb-12">

          <div className="space-y-8 text-center lg:text-left">
            <motion.p variants={fadeIn} initial="hidden" animate="visible" custom={0.1}
              className="font-accent text-xl md:text-2xl italic text-gold-accent">
              Houston, Texas
            </motion.p>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              className="text-display-xl text-cream leading-tight">
              {t('hero.headline')}
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
              className="text-lg md:text-xl text-warm-taupe max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero.subheadline')}
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                {t('hero.cta_primary')}
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4 border-cream/30 text-cream hover:bg-cream/10">
                {t('hero.cta_secondary')}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="pt-4">
              <TrustBar className="justify-center lg:justify-start text-warm-taupe" />
            </motion.div>
          </div>

          <motion.div variants={scaleIn} initial="hidden" animate="visible" custom={0.2}
            className="relative flex justify-center lg:justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden w-[240px] md:w-[280px]">
              <div className="relative aspect-square">
                <Image
                  src="/images/headshot.png"
                  alt="Daisy Castro — Houston Mortgage Loan Officer"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="p-4 text-center bg-white">
                <p className="font-display text-xl text-deep-brown">Daisy Castro</p>
                <p className="text-sm text-text-muted">NMLS #2592627</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={scrollToContent}
        className="absolute bottom-24 md:bottom-28 left-8 z-10 flex items-center gap-2 text-warm-taupe hover:text-gold-accent transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-sm font-medium">{isSpanish ? 'Conoce Más' : 'Learn More'}</span>
      </motion.button>

      {/* Banner — v4 forces fresh load, bypasses Next.js image cache */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/bannerimage.png?v=4"
          alt="My Texas Lender Daisy — Your trusted mortgage advisor in Texas"
          className="w-full h-auto block"
        />
      </div>

    </section>
    </>
  );
}
