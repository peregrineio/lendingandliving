'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Search, Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPostMeta, categories } from '@/lib/blog-types';

interface BlogContentProps {
  initialPosts: BlogPostMeta[];
}

function BlogCard({ post, index }: { post: BlogPostMeta; index: number }) {
  const { isSpanish } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const title = isSpanish ? post.titleEs : post.title;
  const description = isSpanish ? post.descriptionEs : post.description;

  const categoryLabel = categories.find((c) => c.value === post.category);
  const categoryDisplay = isSpanish ? categoryLabel?.labelEs : categoryLabel?.label;

  const formattedDate = new Date(post.date).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="bg-white rounded-2xl border border-brand-border overflow-hidden hover:shadow-lg hover:border-gold-accent/30 transition-all duration-300">
          {/* Placeholder Image */}
          <div className="h-48 bg-gradient-to-br from-cream to-warm-taupe/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-deep-brown/5 group-hover:bg-deep-brown/10 transition-colors" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-gold-accent/90 text-dark-footer text-xs font-semibold rounded-full">
                {categoryDisplay}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h2 className="font-display text-xl text-deep-brown mb-2 group-hover:text-gold-accent transition-colors line-clamp-2">
              {title}
            </h2>

            <p className="text-text-muted text-sm line-clamp-3 mb-4">{description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </div>
              <span className="flex items-center gap-1 text-gold-accent text-sm font-medium group-hover:gap-2 transition-all">
                {isSpanish ? 'Leer más' : 'Read more'}
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

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section ref={heroRef} className="bg-cream py-12 md:py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h1 className="text-display-xl text-deep-brown mb-4">
              {isSpanish ? 'Blog de Hipotecas' : 'Mortgage Blog'}
            </h1>
            <p className="text-lg text-text-muted">
              {isSpanish
                ? 'Consejos, guías y recursos para ayudarte a comprar tu casa en Houston'
                : 'Tips, guides, and resources to help you buy your home in Houston'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-warm-white py-8 border-b border-brand-border">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.value
                      ? 'bg-gold-accent text-dark-footer'
                      : 'bg-cream text-text-muted hover:bg-warm-taupe/20'
                  }`}
                >
                  {isSpanish ? category.labelEs : category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder={isSpanish ? 'Buscar artículos...' : 'Search articles...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-brand-border bg-white focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-warm-white">
        <div className="section-container">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Tag className="w-12 h-12 text-warm-taupe mx-auto mb-4" />
              <h3 className="font-display text-xl text-deep-brown mb-2">
                {isSpanish ? 'No se encontraron artículos' : 'No articles found'}
              </h3>
              <p className="text-text-muted">
                {isSpanish
                  ? 'Intenta con diferentes filtros o términos de búsqueda'
                  : 'Try different filters or search terms'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-deep-brown py-12">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl text-cream mb-4">
            {isSpanish ? '¿Tienes preguntas sobre hipotecas?' : 'Have mortgage questions?'}
          </h2>
          <p className="text-warm-taupe/80 mb-6 max-w-xl mx-auto">
            {isSpanish
              ? 'Agenda una llamada gratuita y déjame ayudarte a entender tus opciones'
              : "Schedule a free call and let me help you understand your options"}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold-accent text-dark-footer rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors"
          >
            {isSpanish ? 'Contactar a Daisy' : 'Contact Daisy'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
