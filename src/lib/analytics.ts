// Type declarations for window globals
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Google Analytics tracking
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Meta Pixel tracking
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Page view tracking
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_ID) {
    window.gtag?.('config', GA_ID, {
      page_path: url,
    });
  }
};

// Generic event tracking
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (GA_ID) {
      window.gtag?.('event', eventName, params);
    }

    // Meta Pixel
    if (META_PIXEL_ID) {
      window.fbq?.('track', eventName, params);
    }
  }
};

// Specific event tracking functions
export const trackFormSubmit = (purpose: string, language: string) => {
  trackEvent('form_submit', {
    form_type: 'contact',
    purpose,
    language,
  });

  // Also track as Meta standard event
  if (typeof window !== 'undefined' && META_PIXEL_ID) {
    window.fbq?.('track', 'Lead', {
      content_name: purpose,
      language,
    });
  }
};

export const trackCtaClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location,
  });
};

export const trackPhoneClick = (phoneNumber: string, location: string) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
    location,
  });

  // Also track as Meta standard event
  if (typeof window !== 'undefined' && META_PIXEL_ID) {
    window.fbq?.('track', 'Contact', {
      content_name: 'Phone Call',
      location,
    });
  }
};

export const trackLanguageToggle = (newLanguage: string) => {
  trackEvent('language_toggle', {
    new_language: newLanguage,
    event_category: 'engagement',
  });
};

export const trackCalculatorUse = (calculatorType: string) => {
  trackEvent('calculator_use', {
    calculator_type: calculatorType,
  });
};

export const trackBlogRead = (slug: string, category: string) => {
  trackEvent('blog_read', {
    slug,
    category,
    event_category: 'content',
  });
};

export const trackServicePageView = (serviceName: string) => {
  trackEvent('service_page_view', {
    service_name: serviceName,
    event_category: 'engagement',
  });
};
