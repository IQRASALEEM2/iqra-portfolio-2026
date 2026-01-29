import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component for injecting head tags.
 *
 * Props:
 * - title: string
 * - description: string
 * - keywords: string (comma-separated) OR string[]
 * - url: canonical URL
 */
const SEO = ({ title, description, keywords, url }) => {
  const finalTitle = title || '';
  const finalDescription = description || '';
  const finalKeywords = Array.isArray(keywords) ? keywords.filter(Boolean).join(', ') : (keywords || '');
  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {finalTitle ? <title>{finalTitle}</title> : null}
      {finalDescription ? <meta name="description" content={finalDescription} /> : null}
      {finalKeywords ? <meta name="keywords" content={finalKeywords} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      {finalTitle ? <meta property="og:title" content={finalTitle} /> : null}
      {finalDescription ? <meta property="og:description" content={finalDescription} /> : null}
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      <meta property="og:type" content="article" />

      {finalTitle ? <meta name="twitter:title" content={finalTitle} /> : null}
      {finalDescription ? <meta name="twitter:description" content={finalDescription} /> : null}
    </Helmet>
  );
};

export default SEO;

