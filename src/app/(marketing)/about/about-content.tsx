'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Phone, ArrowRight, Award, Shield, Users, Heart, Globe, CheckCircle, Star, Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const credentials = {
  en: [
    { label: 'NMLS #', value: '2592627' },
    { label: 'Company', value: 'Matador Lending NMLS #1871433' },
    { label: 'Specialties', value: 'FHA, ITIN, DPA, VA, Conventional' },
    { label: 'Languages', value: 'English & Spanish' },
    { label: 'Service Area', value: 'Greater Houston & Texas' },
  ],
  es: [
    { label: 'NMLS #', value: '2592627' },
    { label: 'Compañía', value: 'Matador Lending NMLS #1871433' },
    { label: 'Especialidades', value: 'FHA, ITIN, DPA, VA, Convencional' },
    { label: 'Idiomas', value: 'Inglés y Español' },
    { label: 'Área de Servicio', value: 'Houston y Texas' },
  ],
};

const promises = {
  en: [
    { icon: Heart, title: 'Clarity', desc: "I'll explain everything in plain language — no confusing jargon." },
    { icon: Shield, title: 'Honesty', desc: "I'll always tell you the truth, even when it's not what you want to hear." },
    { icon: Users, title: 'Patience', desc: 'I understand this is a big decision. Take your time — I\'m here for you.' },
    { icon: Globe, title: 'Accessibility', desc: 'Available in English and Spanish, evenings and weekends when you need me.' },
  ],
  es: [
    { icon: Heart, title: 'Claridad', desc: 'Te explicaré todo en lenguaje simple — sin jerga confusa.' },
    { icon: Shield, title: 'Honestidad', desc: 'Siempre te diré la verdad, incluso cuando no sea lo que quieres escuchar.' },
    { icon: Users, title: 'Paciencia', desc: 'Entiendo que esta es una gran decisión. Toma tu tiempo — estoy aquí para ti.' },
    { icon: Globe, title: 'Accesibilidad', desc: 'Disponible en inglés y español, noches y fines de semana cuando me necesites.' },
  ],
};

const testimonials = {
  en: [
    { name: 'Maria G.', text: 'Daisy made our dream of homeownership possible. She explained everything in Spanish and never made us feel rushed.', type: 'First-Time Buyer' },
    { name: 'Carlos & Ana R.', text: 'We thought buying a home with an ITIN was impossible. Daisy proved us wrong and guided us every step of the way.', type: 'ITIN Loan' },
    { name: 'Jennifer M.', text: "As a single mom, I was nervous about the process. Daisy's patience and expertise made all the difference.", type: 'DPA Program' },
  ],
  es: [
    { name: 'Maria G.', text: 'Daisy hizo posible nuestro sueño de ser propietarios. Explicó todo en español y nunca nos hizo sentir apurados.', type: 'Compradora Primeriza' },
    { name: 'Carlos & Ana R.', text: 'Pensábamos que comprar una casa con ITIN era imposible. Daisy nos demostró lo contrario y nos guió en cada paso.', type: 'Préstamo ITIN' },
    { name: 'Jennifer M.', text: 'Como madre soltera, estaba nerviosa por el proceso. La paciencia y experiencia de Daisy marcaron la diferencia.', type: 'Programa DPA' },
  ],
};

function JsonLdSchema() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daisy Castro',
    jobTitle: 'Mortgage Loan Officer',
    worksFor: { '@type': 'Organization', name: 'Matador Lending' },
    description: 'Bilingual mortgage loan officer in Houston, Texas specializing in first-time buyers, ITIN loans, and down payment assistance programs.',
    telephone: '832-894-7676',
    email: 'Daisy@matadorlending.com',
    address: { '@type': 'PostalAddress', streetAddress: '5718 Westheimer Rd Suite 1000', addressLocality: 'Houston', addressRegion: 'TX', postalCode: '77057' },
    knowsLanguage: ['English', 'Spanish'],
    sameAs: [],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />;
}

export function AboutContent() {
  const { language, isSpanish } = useLanguage();
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const bilingualRef = useRef(null);
  const credentialsRef = useRef(null);
  const promiseRef = useRef(null);
  const galleryRef = useRef(null);
  const testimonialsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const storyInView = useInView(storyRef, { once: true, margin: '-100px' });
  const bilingualInView = useInView(bilingualRef, { once: true, margin: '-100px' });
  const credentialsInView = useInView(credentialsRef, { once: true, margin: '-100px' });
  const promiseInView = useInView(promiseRef, { once: true, margin: '-100px' });
  const galleryInView = useInView(galleryRef, { once: true, margin: '-100px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

  return (
    <>
      <JsonLdSchema />
      <div className="pt-20 md:pt-24">
        {/* Hero Banner */}
        <section ref={heroRef} className="bg-cream relative overflow-hidden">
          <div className="section-container py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
                <p className="text-gold-accent font-cormorant italic text-lg mb-2">{isSpanish ? 'Conoce a Tu Oficial de Préstamos' : 'Meet Your Loan Officer'}</p>
                <h1 className="text-display-xl text-deep-brown mb-6">Daisy Castro</h1>
                <p className="text-lg text-text-muted mb-8">
                  {isSpanish
                    ? 'Oficial de Préstamos Hipotecarios Bilingüe en Houston, TX. Especializada en compradores primerizos, préstamos ITIN, y programas de ayuda para el enganche.'
                    : 'Bilingual Mortgage Loan Officer in Houston, TX. Specializing in first-time buyers, ITIN loans, and down payment assistance programs.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="btn-primary flex items-center justify-center gap-2">
                    {isSpanish ? 'Empecemos Tu Viaje' : "Let's Start Your Journey"}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="tel:8328947676" className="btn-secondary flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    832-894-7676
                  </a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/Daisy.png"
                    alt="Daisy Castro — Houston Mortgage Loan Officer"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-footer/80 to-transparent p-6">
                    <h2 className="font-playfair text-white text-3xl">Daisy Castro</h2>
                    <p className="font-dm text-warm-taupe text-sm">Mortgage Loan Officer | NMLS #2592627</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gold-accent text-dark-footer px-4 py-2 rounded-lg font-display text-sm">
                  NMLS #2592627
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* My Story */}
        <section ref={storyRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
                <h2 className="text-display-lg text-deep-brown mb-8 text-center">{isSpanish ? 'Mi Historia' : 'My Story'}</h2>
                <div className="prose prose-lg text-text-muted mx-auto">
                  {isSpanish ? (
                    <>
                      <p>Hola, soy Daisy. Como mamá de dos hijos, entiendo lo que significa una casa para una familia. No es solo un techo sobre tu cabeza — es donde tus hijos crecen, donde se hacen los recuerdos, y donde construyes tu futuro.</p>
                      <p>Crecí en la comunidad hispana de Houston y vi de primera mano cuántas familias trabajadoras soñaban con ser propietarias pero no sabían por dónde empezar. Peor aún, muchos fueron rechazados o ignorados por prestamistas que no entendían sus situaciones únicas.</p>
                      <p>Por eso me convertí en oficial de préstamos hipotecarios. Quería ser la persona que yo hubiera querido tener cuando mi familia necesitaba ayuda — alguien que hablara nuestro idioma, entendiera nuestra cultura, y genuinamente se preocupara por ayudarnos a tener éxito.</p>
                      <p>Hoy, me especializo en ayudar a compradores primerizos, familias inmigrantes con ITINs, y cualquiera que haya sido rechazado en otro lugar. Si tienes un sueño de ser propietario, quiero ayudarte a hacerlo realidad.</p>
                    </>
                  ) : (
                    <>
                      <p>Hi, I&apos;m Daisy. As a mom of two, I understand what a home means to a family. It&apos;s not just a roof over your head — it&apos;s where your children grow up, where memories are made, and where you build your future.</p>
                      <p>I grew up in Houston&apos;s Hispanic community and saw firsthand how many hardworking families dreamed of homeownership but didn&apos;t know where to start. Worse, many were turned away or ignored by lenders who didn&apos;t understand their unique situations.</p>
                      <p>That&apos;s why I became a mortgage loan officer. I wanted to be the person I wish my family had when we needed help — someone who spoke our language, understood our culture, and genuinely cared about helping us succeed.</p>
                      <p>Today, I specialize in helping first-time buyers, immigrant families with ITINs, and anyone who&apos;s been turned away elsewhere. If you have a dream of homeownership, I want to help you make it happen.</p>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Bilingual Matters */}
        <section ref={bilingualRef} className="section-padding bg-deep-brown">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={bilingualInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
              <Globe className="w-12 h-12 text-gold-accent mx-auto mb-6" />
              <h2 className="text-display-lg text-cream mb-6">{isSpanish ? 'Por Qué Ser Bilingüe Importa' : 'Why Bilingual Matters'}</h2>
              <p className="text-warm-taupe/90 text-lg leading-relaxed">
                {isSpanish
                  ? 'Comprar una casa es una de las decisiones financieras más importantes de tu vida. Mereces entender cada detalle, cada documento, y cada opción — en el idioma con el que te sientas más cómodo. Cuando trabajas conmigo, nunca te sentirás perdido en la traducción. Puedo explicar términos complejos de hipotecas, revisar documentos contigo, y responder todas tus preguntas en español o inglés. Tu comodidad y comprensión son mi prioridad.'
                  : "Buying a home is one of the most important financial decisions of your life. You deserve to understand every detail, every document, and every option — in the language you're most comfortable with. When you work with me, you'll never feel lost in translation. I can explain complex mortgage terms, review documents with you, and answer all your questions in Spanish or English. Your comfort and understanding are my priority."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Credentials */}
        <section ref={credentialsRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={credentialsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Mis Credenciales' : 'My Credentials'}</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={credentialsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-brand-border overflow-hidden">
                {credentials[language].map((item, index) => (
                  <div key={index} className={`flex justify-between items-center px-6 py-4 ${index !== credentials[language].length - 1 ? 'border-b border-brand-border' : ''}`}>
                    <span className="text-text-muted">{item.label}</span>
                    <span className="font-semibold text-deep-brown">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-text-muted">
                <Shield className="w-4 h-4 text-gold-accent" />
                <span>{isSpanish ? 'Licenciada y Regulada • Oportunidad de Vivienda Igualitaria' : 'Licensed & Regulated • Equal Housing Opportunity'}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* My Promise */}
        <section ref={promiseRef} className="section-padding bg-warm-white">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={promiseInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Mi Promesa para Ti' : 'My Promise to You'}</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {promises[language].map((promise, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={promiseInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-cream rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold-accent/10 flex items-center justify-center mx-auto mb-4">
                    <promise.icon className="w-6 h-6 text-gold-accent" />
                  </div>
                  <h3 className="font-display text-lg text-deep-brown mb-2">{promise.title}</h3>
                  <p className="text-sm text-text-muted">{promise.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section ref={galleryRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={galleryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Galería' : 'Gallery'}</h2>
            </motion.div>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={galleryInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0 }} className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/DSC00179.png"
                  alt="Daisy Castro — Mortgage Loan Officer Houston"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={galleryInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/DSC00185.jpg"
                  alt="Daisy Castro — Houston TX"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Video Embed Placeholder */}
        <section className="section-padding bg-warm-white">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              <div className="aspect-video bg-deep-brown/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold-accent/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gold-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <p className="text-text-muted">{isSpanish ? 'Video de Introducción - Próximamente' : 'Intro Video - Coming Soon'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialsRef} className="section-padding bg-cream">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={testimonialsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
              <h2 className="text-display-lg text-deep-brown mb-4">{isSpanish ? 'Lo Que Dicen Mis Clientes' : 'What My Clients Say'}</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials[language].map((testimonial, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={testimonialsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-xl p-6 border border-brand-border">
                  <Quote className="w-8 h-8 text-gold-accent/30 mb-4" />
                  <p className="text-text-muted mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-deep-brown">{testimonial.name}</p>
                      <p className="text-xs text-gold-accent">{testimonial.type}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-accent text-gold-accent" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-deep-brown">
          <div className="section-container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-display-lg text-cream mb-4">{isSpanish ? 'Empecemos Tu Viaje' : "Let's Start Your Journey"}</h2>
              <p className="text-warm-taupe/80 text-lg mb-8">
                {isSpanish
                  ? 'Ya sea que estés comprando tu primera casa, refinanciando, o explorando opciones de préstamos ITIN — estoy aquí para ayudar.'
                  : "Whether you're buying your first home, refinancing, or exploring ITIN loan options — I'm here to help."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 py-3 px-8 bg-gold-accent text-dark-footer rounded-xl font-semibold hover:bg-gold-accent/90 transition-colors">
                  {isSpanish ? 'Contáctame' : 'Contact Me'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:8328947676" className="inline-flex items-center gap-2 py-3 px-8 border border-cream/30 text-cream rounded-xl font-semibold hover:bg-cream/10 transition-colors">
                  <Phone className="w-4 h-4" />
                  832-894-7676
                </a>
              </div>
              <p className="text-sm text-warm-taupe/60 mt-6">{isSpanish ? 'Hablamos Español • Consulta Gratuita' : 'Se Habla Español • Free Consultation'}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
