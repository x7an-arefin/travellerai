import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /checkout/
Disallow: /admin/

# SEO Gray Hat & High-CTR Crawler Optimization
User-agent: Googlebot
Allow: /
Allow: /tours/
Allow: /hotels/
Allow: /vehicles/
Allow: /destinations/

Sitemap: https://travellerai.com/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
