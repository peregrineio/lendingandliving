'use client';

import { useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Clock, ArrowLeft, ArrowRight, Phone, User, Tag, List } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPost, BlogPostMeta, categories } from '@/lib/blog-types';

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
}

// Custom MDX components
const mdxComponents = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display text-2xl text-deep-brown mt-10 mb-4" id={String(children).toLowerCase().replace(/\s+/g, '-')} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display text-xl text-deep-brown mt-8 mb-3" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-text-muted mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-text-muted mb-4 space-y-2 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-text-muted mb-4 space-y-2 ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-text-muted" {...props}>
      {children}
    </li>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} className="text-gold-accent hover:underline" {...props}>
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gold-accent pl-4 italic text-text-muted my-6 bg-cream/50 py-3 pr-4 rounded-r-lg" {...props}>
      {children}
    </blockquote>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-deep-brown" {...props}>
      {children}
    </strong>
  ),
};

function extractHeadings(content: string): { text: string; id: string }[] {
  const headingRegex = /^## (.+)$/gm;
  const headings: { text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      text: match[1],
      id: match[1].toLowerCase().replace(/\s+/g, '-'),
    });
  }

  return headings;
}

function TableOfContents({ headings }: { headings: { text: string; id: string }[] }) {
  const { isSpanish } = useLanguage();

  if (headings.length === 0) return null;

  return (
    <div className="bg-cream rounded-xl p-5 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <List className="w-4 h-4 text-gold-accent" />
        <h3 className="font-display text-sm text-deep-brown">
          {isSpanish ? 'Contenido' : 'Table of Contents'}
        </h3>
      </div>
      <nav>
        <ol className="space-y-2 text-sm">
          {headings.map((heading, index) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className="text-text-muted hover:text-gold-accent transition-colors flex items-start gap-2"
              >
                <span className="text-gold-accent/60">{index + 1}.</span>
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

function AuthorBox() {
  const { isSpanish } = useLanguage();

  return (
    <div className="bg-cream rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <div className="w-20 h-20 rounded-full bg-warm-taupe/30 flex-shrink-0 flex items-center justify-center">
        <User className="w-8 h-8 text-gold-accent" />
      </div>
      <div className="text-center sm:text-left">
        <h3 className="font-display text-lg text-deep-brown mb-1">Daisy Castro-Shahin</h3>
        <p className="text-gold-accent text-sm mb-2">
          {isSpanish ? 'Oficial de Préstamos Hipotecarios' : 'Mortgage Loan Officer'}
        </p>
        <p className="text-text-muted text-sm">
          {isSpanish
            ? 'Ayudo a familias en Houston a convertirse en propietarios. Hablo inglés y español.'
            : 'I help Houston families become homeowners. I speak English and Spanish.'}
        </p>
        <p className="text-xs text-text-muted mt-2">NMLS #2592627 | Matador Lending</p>
      </div>
    </div>
  );
}

function RelatedPostCard({ post }: { post: BlogPostMeta }) {
  const { isSpanish } = useLanguage();
  const title = isSpanish ? post.titleEs : post.title;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="bg-white rounded-xl border border-brand-border p-4 hover:border-gold-accent/30 hover:shadow-md transition-all">
        <span className="text-xs text-gold-accent font-medium">
          {categories.find((c) => c.value === post.category)?.[isSpanish ? 'labelEs' : 'label']}
        </span>
        <h4 className="font-display text-deep-brown group-hover:text-gold-accent transition-colors mt-1 line-clamp-2">
          {title}
        </h4>
        <div className="flex items-center gap-2 mt-2 text-xs text-text-muted">
          <Clock className="w-3 h-3" />
          {post.readTime}
        </div>
      </div>
    </Link>
  );
}

function MidPostCTA() {
  const { isSpanish } = useLanguage();

  return (
    <div className="bg-deep-brown rounded-xl p-6 my-8 text-center">
      <h3 className="font-display text-xl text-cream mb-2">
        {isSpanish ? '¿Tienes preguntas?' : 'Have questions?'}
      </h3>
      <p className="text-warm-taupe/80 text-sm mb-4">
        {isSpanish
          ? 'Llámame para una consulta gratuita'
          : 'Call me for a free consultation'}
      </p>
      <a
        href="tel:8328947676"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-accent text-dark-footer rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors"
      >
        <Phone className="w-4 h-4" />
        832-894-7676
      </a>
    </div>
  );
}

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const { isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const title = isSpanish ? post.titleEs : post.title;
  const description = isSpanish ? post.descriptionEs : post.description;
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  const formattedDate = new Date(post.date).toLocaleDateString(isSpanish ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const categoryLabel = categories.find((c) => c.value === post.category);
  const categoryDisplay = isSpanish ? categoryLabel?.labelEs : categoryLabel?.label;

  // Check if content has FAQ section
  const hasFAQ = post.content.includes('## FAQ') || post.content.includes('## Preguntas Frecuentes');

  // Generate FAQ Schema if applicable
  const faqSchema = hasFAQ ? generateFAQSchema(post.content) : null;

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
              jobTitle: 'Mortgage Loan Officer',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Lending & Living',
            },
          }),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="pt-20 md:pt-24">
        {/* Hero */}
        <section ref={heroRef} className="bg-cream py-10 md:py-14">
          <div className="section-container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-text-muted hover:text-gold-accent transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                {isSpanish ? 'Volver al Blog' : 'Back to Blog'}
              </Link>

              <span className="inline-block px-3 py-1 bg-gold-accent/20 text-gold-accent text-xs font-semibold rounded-full mb-4">
                {categoryDisplay}
              </span>

              <h1 className="text-display-lg md:text-display-xl text-deep-brown mb-4">{title}</h1>

              <p className="text-lg text-text-muted mb-6">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gold-accent" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold-accent" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold-accent" />
                  {post.readTime} {isSpanish ? 'de lectura' : 'read'}
                </span>
              </div>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-warm-taupe/20 text-text-muted text-xs rounded"
                    >
                      <Tag className="w-3 h-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-[1fr_280px] gap-8">
                {/* Main Content */}
                <article className="bg-white rounded-2xl p-6 md:p-8 border border-brand-border">
                  <TableOfContents headings={headings} />

                  <div className="prose prose-lg max-w-none">
                    <MDXRemote source={post.content} components={mdxComponents} />
                  </div>

                  <MidPostCTA />

                  {/* Author Box */}
                  <div className="mt-10 pt-8 border-t border-brand-border">
                    <AuthorBox />
                  </div>
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                  {/* Contact CTA */}
                  <div className="bg-deep-brown rounded-xl p-5 sticky top-24">
                    <h3 className="font-display text-lg text-cream mb-2">
                      {isSpanish ? '¿Listo para empezar?' : 'Ready to get started?'}
                    </h3>
                    <p className="text-warm-taupe/80 text-sm mb-4">
                      {isSpanish
                        ? 'Hablemos sobre tus opciones de préstamo'
                        : "Let's talk about your loan options"}
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full text-center px-4 py-2.5 bg-gold-accent text-dark-footer rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors text-sm"
                    >
                      {isSpanish ? 'Contactar a Daisy' : 'Contact Daisy'}
                    </Link>
                    <a
                      href="tel:8328947676"
                      className="block w-full text-center px-4 py-2 text-cream mt-2 text-sm hover:text-gold-accent transition-colors"
                    >
                      832-894-7676
                    </a>
                  </div>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div>
                      <h3 className="font-display text-lg text-deep-brown mb-4">
                        {isSpanish ? 'Artículos Relacionados' : 'Related Articles'}
                      </h3>
                      <div className="space-y-3">
                        {relatedPosts.map((relatedPost) => (
                          <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                        ))}
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-cream py-12">
          <div className="section-container text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl text-deep-brown mb-4">
              {isSpanish ? '¿Te gustó este artículo?' : 'Enjoyed this article?'}
            </h2>
            <p className="text-text-muted mb-6">
              {isSpanish
                ? 'Explora más guías y recursos para compradores de casa en Houston'
                : 'Explore more guides and resources for Houston homebuyers'}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-accent text-dark-footer rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors"
            >
              {isSpanish ? 'Ver Todos los Artículos' : 'View All Articles'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function generateFAQSchema(content: string) {
  // Simple FAQ extraction from content
  const faqSection = content.split(/## FAQ|## Preguntas Frecuentes/)[1];
  if (!faqSection) return null;

  const qaPairs: { question: string; answer: string }[] = [];
  // Use line-by-line parsing instead of 's' flag regex
  const lines = faqSection.split('\n');
  let currentQuestion = '';
  let currentAnswer = '';

  for (const line of lines) {
    const questionMatch = line.match(/\*\*Q: (.+?)\*\*/);
    if (questionMatch) {
      if (currentQuestion && currentAnswer) {
        qaPairs.push({
          question: currentQuestion.trim(),
          answer: currentAnswer.trim(),
        });
      }
      currentQuestion = questionMatch[1];
      currentAnswer = '';
    } else if (currentQuestion && line.trim()) {
      currentAnswer += line + ' ';
    }
  }

  // Add last Q&A pair
  if (currentQuestion && currentAnswer) {
    qaPairs.push({
      question: currentQuestion.trim(),
      answer: currentAnswer.trim(),
    });
  }

  if (qaPairs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qaPairs.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  };
}
