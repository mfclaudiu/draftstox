import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEOHead({
  title = 'DraftStox - Fantasy Stock Trading Game',
  description = 'Learn investing through play with our fantasy stock trading platform. Build your portfolio, earn XP, and compete with others - no risk, all reward.',
  keywords = 'fantasy trading, stock market game, investment learning, portfolio simulator',
  image = '/og-image.jpg',
  url = 'https://draftstox.netlify.app',
  type = 'website'
}: SEOHeadProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DraftStox',
    description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'DraftStox',
      url
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="DraftStox" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#4F46E5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* PWA Tags */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon-192x192.png" />

      {/* Preconnect to External Resources */}
      <link rel="preconnect" href="https://www.alphavantage.co" />
      <link rel="preconnect" href="https://query1.finance.yahoo.com" />
    </Helmet>
  );
}

// Predefined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: 'DraftStox - Learn Investing Through Play',
    description: 'Discover your investing archetype and master the market with fantasy-style portfolio building. No risk, all reward.',
    url: 'https://draftstox.com',
  },
  
  quiz: {
    title: 'Investment Archetype Quiz - DraftStox',
    description: 'Take our 2-minute quiz to discover your investing personality and get personalized investment recommendations.',
    url: 'https://draftstox.com/quiz',
  },

  // Dynamic result pages
  result: (archetype: string) => ({
    title: `I'm ${archetype} - DraftStox`,
    description: `I just discovered my investing archetype: ${archetype}. Take the quiz to find your investing personality!`,
    url: 'https://draftstox.com/quiz',
    image: `/og-${archetype.toLowerCase().replace(/\s+/g, '-')}.png`,
  }),
}; 