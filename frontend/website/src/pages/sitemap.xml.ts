import type { APIRoute } from 'astro';
import { MOCK_TOURS } from '@modules/tours/tours.mock';
import { MOCK_HOTELS } from '@modules/hotels/hotels.mock';
import { MOCK_VEHICLES } from '@modules/vehicles/vehicles.mock';
import { MOCK_DESTINATIONS } from '@modules/destinations/destinations.model';
import { MOCK_PROVIDERS } from '@modules/providers/providers.model';
import { MOCK_BLOG_POSTS } from '@modules/blog/blog.model';
import { MOCK_TRANSFERS } from '@modules/transfers/transfers.model';

export const GET: APIRoute = () => {
  const baseUrl = 'https://travellerai.com';

  const staticUrls = [
    '',
    '/destinations',
    '/tours',
    '/tours/category/adventure',
    '/tours/category/cultural',
    '/tours/category/wildlife',
    '/tours/category/luxury',
    '/tours/category/culinary',
    '/tours/destination/swiss-alps',
    '/tours/destination/kyoto',
    '/tours/destination/sylhet',
    '/tours/destination/dolomites',
    '/hotels',
    '/hotels/type/alpine-chalet',
    '/hotels/type/heritage-ryokan',
    '/hotels/type/eco-villa',
    '/hotels/type/boutique-hotel',
    '/hotels/city/zermatt',
    '/hotels/city/kyoto',
    '/hotels/city/sreemangal',
    '/vehicles',
    '/vehicles/category/luxury-suv',
    '/vehicles/category/electric-sedan',
    '/vehicles/category/executive-van',
    '/vehicles/transfers',
    '/providers',
    '/blog',
    '/provider',
    '/about',
    '/contact',
    '/help',
    '/legal/privacy',
    '/legal/terms',
    '/legal/refunds'
  ];

  const tourUrls = MOCK_TOURS.map(t => `/tours/${t.slug}`);
  const hotelUrls = MOCK_HOTELS.flatMap(h => [`/hotels/${h.slug}`, `/hotels/${h.slug}/rooms`]);
  const vehicleUrls = MOCK_VEHICLES.map(v => `/vehicles/${v.slug}`);
  const transferUrls = MOCK_TRANSFERS.map(t => `/vehicles/transfers/${t.slug}`);
  const destinationUrls = MOCK_DESTINATIONS.map(d => `/destinations/${d.slug}`);
  const providerUrls = MOCK_PROVIDERS.map(p => `/providers/${p.slug}`);
  const blogUrls = MOCK_BLOG_POSTS.map(b => `/blog/${b.slug}`);

  const allUrls = [
    ...staticUrls,
    ...tourUrls,
    ...hotelUrls,
    ...vehicleUrls,
    ...transferUrls,
    ...destinationUrls,
    ...providerUrls,
    ...blogUrls
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <changefreq>${url === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/tours') || url.startsWith('/hotels') ? '0.8' : '0.6'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
