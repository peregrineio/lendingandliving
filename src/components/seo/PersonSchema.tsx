export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daisy Castro',
    jobTitle: 'Mortgage Loan Officer',
    worksFor: {
      '@type': 'Organization',
      name: 'Matador Lending',
      sameAs: 'https://matadorlending.com',
    },
    telephone: '832-894-7676',
    email: 'Daisy@matadorlending.com',
    url: 'https://lendingandliving.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5718 Westheimer Rd Suite 1000',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      postalCode: '77057',
      addressCountry: 'US',
    },
    knowsLanguage: ['English', 'Spanish'],
    description: "Houston's bilingual mortgage loan officer specializing in ITIN loans, FHA loans, down payment assistance, and first-time homebuyer programs.",
    sameAs: [
      'https://lendingandliving.com/about',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
