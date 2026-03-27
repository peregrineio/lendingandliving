export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Lending & Living - Daisy Castro-Shahin',
    description: "Houston's bilingual mortgage loan officer. FHA, ITIN, down payment assistance, VA, USDA, and refinance loans.",
    url: 'https://lendingandliving.com',
    telephone: '832-894-7676',
    email: 'Daisy@matadorlending.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5718 Westheimer Rd Suite 1000',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77057',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.7372,
      longitude: -95.4702,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Check, Credit Card',
    areaServed: {
      '@type': 'City',
      name: 'Houston',
      containedInPlace: {
        '@type': 'State',
        name: 'Texas',
      },
    },
    serviceType: [
      'Mortgage Loans',
      'ITIN Loans',
      'FHA Loans',
      'VA Loans',
      'USDA Loans',
      'Down Payment Assistance',
      'Refinancing',
      'First-Time Homebuyer Assistance',
    ],
    knowsLanguage: ['English', 'Spanish'],
    sameAs: [
      'https://lendingandliving.com',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
