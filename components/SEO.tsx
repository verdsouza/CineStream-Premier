import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../services/store';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'video.movie' | 'video.tv_show';
  schema?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  schema 
}) => {
  const config = Store.getConfig();
  
  const siteName = config.siteName;
  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Streaming`;
  const metaDescription = description || config.seoDescription;
  const metaKeywords = keywords ? `${keywords}, ${config.globalKeywords}` : config.globalKeywords;
  const currentUrl = window.location.href;
  const metaImage = image || 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Google Search Console Verification */}
      {config.searchConsoleVerification && (
        <meta name="google-site-verification" content={config.searchConsoleVerification} />
      )}

      {/* Structured Data (Schema.org) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {/* Google Analytics Injection */}
      {config.googleAnalyticsId && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`} />
      )}
      {config.googleAnalyticsId && (
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.googleAnalyticsId}');
          `}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;