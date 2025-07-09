import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function SEOHead({ 
  title = 'DraftStox - Learn Investing Through Play',
  description = 'Discover your investing archetype and master the market with fantasy-style portfolio building. No risk, all reward.',
  image = '/og-image.png',
  url = 'https://draftstox.com',
  type = 'website',
  noIndex = false 
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', 'investing, finance, education, quiz, archetype, portfolio, stocks, learning');
    updateMetaTag('author', 'DraftStox');
    
    // Robots
    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', `${url}${image}`, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'DraftStox', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${url}${image}`);
    updateMetaTag('twitter:creator', '@draftstox');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, image, url, type, noIndex]);

  return null;
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