'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Clock, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPostMeta, categories, blogImages } from '@/lib/blog-types';

interface BlogContentProps {
  initialPosts: BlogPostMeta[];
}

// Featured Post Card - Large hero style
function FeaturedPostCard({ post }: { post: BlogPostMeta }) {
  const { isSpanish } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const title = isSpanish ? post.titleEs : post.title;
  const description = isSpanish ? post.descriptionEs : post.description;
  const categoryLabel = categories.find((c) => c.value === post.category);
  const categoryDisplay = isSpanish ? categoryLabel?.labelEs : categoryLabel?.label;
  const imageUrl = blogImages[post.slug] || '/images/blog/first-time-homebuyer.jpg';

  const formattedDate = new Date(post.date).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <Link
        href={`/blog/${post.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <div className="relative overflow-hidden rounded-3xl bg-deep-brown aspect-[16/9] md:aspect-[21/9]">
          {/* Background Image */}
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-deep-brown/60 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-accent text-dark-footer text-xs font-semibold rounded-full">
                <Sparkles className="w-3 h-3" />
                {isSpanish ? 'Destacado' : 'Featured'}
              </span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                {categoryDisplay}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-white mb-4 max-w-4xl leading-tight">
              {title}
            </h2>

            {/* Description */}
            <p className="text-warm-taupe/90 text-base md:text-lg max-w-2xl mb-6 line-clamp-2">
              {description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-warm-taupe/70 text-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gold-accent/30">
                  <Image
                    src="/images/Daisy.png"
                    alt="Daisy Castro"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span>{post.author}</span>
              </div>
              <span className="flex items-center gap-1.5 text-warm-taupe/70 text-sm">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5 text-warm-taupe/70 text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="ml-auto flex items-center gap-2 text-gold-accent font-medium group-hover:gap-3 transition-all">
                {isSpanish ? 'Leer artículo' : 'Read article'}
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Standard Blog Card - Compact elegant style
function BlogCard({ post, index, variant = 'default' }: { post: BlogPostMeta; index: number; variant?: 'default' | 'horizontal' }) {
  const { isSpanish } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const title = isSpanish ? post.titleEs : post.title;
  const description = isSpanish ? post.descriptionEs : post.description;
  const categoryLabel = categories.find((c) => c.value === post.category);
  const categoryDisplay = isSpanish ? categoryLabel?.labelEs : categoryLabel?.label;
  const imageUrl = blogImages[post.slug] || '/images/blog/first-time-homebuyer.jpg';

  const formattedDate = new Date(post.date).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (variant === 'horizontal') {
    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link
          href={`/blog/${post.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex gap-4 p-4 rounded-2xl bg-white border border-brand-border hover:border-gold-accent/30 hover:shadow-lg transition-all duration-300"
        >
          {/* Image */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span className="text-xs text-gold-accent font-medium">{categoryDisplay}</span>
            <h3 className="font-display text-base text-deep-brown mt-1 mb-1 line-clamp-2 group-hover:text-gold-accent transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
      >
        <div className="bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-xl hover:border-gold-accent/30 transition-all duration-500 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-deep-brown text-xs font-semibold rounded-full shadow-sm">
                {categoryDisplay}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-text-muted/50" />
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-xl text-deep-brown mb-3 group-hover:text-gold-accent transition-colors duration-300 line-clamp-2 flex-shrink-0">
              {title}
            </h2>

            {/* Description */}
            <p className="text-text-muted text-sm line-clamp-2 mb-4 flex-1">{description}</p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-brand-border/50">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gold-accent/20">
                  <Image
                    src="/images/Daisy.png"
                    alt="Daisy Castro"
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
                {post.author}
              </div>
              <span className="flex items-center gap-1 text-gold-accent text-sm font-medium group-hover:gap-2 transition-all">
                {isSpanish ? 'Leer' : 'Read'}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogContent({ initialPosts }: BlogContentProps) {
  const { isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let posts = initialPosts;

    if (selectedCategory !== 'all') {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter((post) => {
        const title = isSpanish ? post.titleEs : post.title;
        const description = isSpanish ? post.descriptionEs : post.description;
        return (
          title.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    return posts;
  }, [initialPosts, selectedCategory, searchQuery, isSpanish]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section ref={heroRef} className="bg-cream py-12 md:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1.5 bg-gold-accent/10 text-gold-accent text-sm font-medium rounded-full mb-4"
            >
              {isSpanish ? 'Recursos & Guías' : 'Resources & Guides'}
            </motion.span>

            <h1 className="text-display-xl text-deep-brown mb-4">
              {isSpanish ? 'El Blog de Daisy' : "Daisy's Blog"}
            </h1>
            <p className="text-lg text-text-muted">
              {isSpanish
                ? 'Consejos expertos, guías detalladas y recursos para hacer realidad tu sueño de ser propietario en Houston'
                : 'Expert tips, detailed guides, and resources to make your Houston homeownership dream a reality'}
            </p>
          </motion.div>

          {/* Filters & Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-brand-border"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-deep-brown text-cream shadow-md'
                      : 'bg-cream text-text-muted hover:bg-warm-taupe/20 hover:text-deep-brown'
                  }`}
                >
                  {isSpanish ? category.labelEs : category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder={isSpanish ? 'Buscar artículos...' : 'Search articles...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-brand-border bg-cream/50 focus:bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all text-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          {filteredPosts.length > 0 ? (
            <div className="space-y-12">
              {/* Featured Post */}
              {featuredPost && <FeaturedPostCard post={featuredPost} />}

              {/* Remaining Posts Grid */}
              {remainingPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {remainingPosts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-warm-taupe/20 flex items-center justify-center mx-auto mb-6">
                <Tag className="w-10 h-10 text-warm-taupe" />
              </div>
              <h3 className="font-display text-2xl text-deep-brown mb-3">
                {isSpanish ? 'No se encontraron artículos' : 'No articles found'}
              </h3>
              <p className="text-text-muted max-w-md mx-auto">
                {isSpanish
                  ? 'Intenta con diferentes filtros o términos de búsqueda'
                  : 'Try different filters or search terms'}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/blog/first-time-homebuyer.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-deep-brown/90" />
        </div>

        <div className="relative section-container py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-gold-accent/20 text-gold-accent text-sm font-medium rounded-full mb-4">
              {isSpanish ? 'Consulta Gratis' : 'Free Consultation'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
              {isSpanish ? '¿Tienes preguntas sobre hipotecas?' : 'Have mortgage questions?'}
            </h2>
            <p className="text-warm-taupe/80 text-lg mb-8">
              {isSpanish
                ? 'Agenda una llamada gratuita y déjame ayudarte a entender tus opciones de financiamiento'
                : "Schedule a free call and let me help you understand your financing options"}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-accent text-dark-footer rounded-xl font-semibold text-lg hover:bg-gold-accent/90 hover:shadow-lg hover:shadow-gold-accent/20 transition-all duration-300"
            >
              {isSpanish ? 'Contactar a Daisy' : 'Contact Daisy'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
