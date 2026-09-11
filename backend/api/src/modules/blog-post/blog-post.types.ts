import type { BlogPostSelect, BlogPostInsert } from './blog-post.schema.js';

export type BlogPostEntity = BlogPostSelect;

export type NewBlogPost = BlogPostInsert;

export type UpdateBlogPost = Partial<Omit<BlogPostEntity, 'id'>> & {
  id: string;
};

export interface IBlogPostRepository {
  findById(id: string): Promise<BlogPostEntity | null>;
  findAll(params: ListBlogPostParams): Promise<ListBlogPostResult>;
  create(data: NewBlogPost): Promise<BlogPostEntity>;
  update(data: UpdateBlogPost): Promise<BlogPostEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListBlogPostParams {
  cursor?: string;
  limit?: number;
  status?: string;
  destinationId?: string;
  authorId?: string;
  language?: string;

}

export interface ListBlogPostResult {
  items: BlogPostEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
