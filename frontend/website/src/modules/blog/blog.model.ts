export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Alpine Dispatch' | 'Cultural Guide' | 'Sustainability' | 'Marketplace News';
  author: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  featuredImage: string;
  content: string[];
}

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-01',
    slug: 'swiss-alps-off-peak-guide',
    title: 'The High Valais in Autumn: Solitude on the Glacier Express',
    subtitle: 'Why September and October offer pristine alpine light, uncrowded mountain railways, and crisp summit visibility.',
    category: 'Alpine Dispatch',
    author: 'Markus Vogel',
    authorRole: 'IFMGA Mountain Guide',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    publishedAt: 'September 12, 2026',
    readTime: '6 min read',
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    content: [
      'While summer crowds descend upon Interlaken and winter skiers pack Zermatt, the brief window between late September and mid-November represents the Swiss Alps in their purest form.',
      'Larch forests turn a luminous gold across the Valais, glacier air sharpens to crystal clarity, and boutique alpine refuges offer unhurried warmth.',
      'By booking directly with local guides rather than through commercial mass aggregators, travelers ensure that 100% of their spend remains within the high-mountain communities maintaining the trails.'
    ]
  },
  {
    id: 'post-02',
    slug: 'kyoto-ryokan-etiquette',
    title: 'An Architect’s Guide to the Classical Japanese Ryokan',
    subtitle: 'Understanding tatami proportions, natural cedar onsens, and the philosophical grace of seasonal Kaiseki.',
    category: 'Cultural Guide',
    author: 'Keiko Tanaka',
    authorRole: 'Cultural Heritage Curator',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    publishedAt: 'August 28, 2026',
    readTime: '8 min read',
    featuredImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    content: [
      'A true ryokan is not merely a hotel with traditional styling; it is an architectural living instrument constructed to harmonize interior human contemplation with the natural courtyard world outside.',
      'From the aroma of fresh igusa grass in woven tatami mats to the steaming mineral waters of a private Hinoki cypress bath, every element is designed to lower cognitive noise.',
      'At TravellerAI, our heritage partners in Kyoto maintain strict reservations policies to protect this tranquil atmosphere for every honored guest.'
    ]
  },
  {
    id: 'post-03',
    slug: 'zero-commission-revolution',
    title: 'Why We Eliminated the 25% Middleman Fee for Travel Guides',
    subtitle: 'How transparent marketplace infrastructure empowers independent travel operators to thrive.',
    category: 'Marketplace News',
    author: 'Sultanul Arefin',
    authorRole: 'Founder, TravellerAI',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    publishedAt: 'August 15, 2026',
    readTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
    content: [
      'For the last two decades, corporate travel aggregators have extracted up to 35% in take rates from independent operators, choking the margins of the very individuals who deliver authentic experiences.',
      'TravellerAI replaces that extractive model with a modern, high-speed open marketplace. Direct pricing, instant financial clearing, and verified operator credibility.'
    ]
  }
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  return MOCK_BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return MOCK_BLOG_POSTS.find(p => p.slug === slug) || MOCK_BLOG_POSTS[0];
}
