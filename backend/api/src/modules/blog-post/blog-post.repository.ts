import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { BlogPostEntity, NewBlogPost, UpdateBlogPost, IBlogPostRepository, ListBlogPostParams, ListBlogPostResult } from './blog-post.types.js';
import { blogPostTable } from './blog-post.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class BlogPostRepository implements IBlogPostRepository {

  /**
   * @author arefin
   * @description Get a Drizzle database client from the Cloudflare Hyperdrive connection
   */
  private getDb(hyperdrive?: Hyperdrive): ReturnType<typeof drizzle> {
    if (!hyperdrive?.connectionString) {
      throw new AppError('MISSING_BINDING', 'Hyperdrive binding is required. Ensure HYPERDRIVE is configured in wrangler.jsonc.', 500);
    }
    return drizzle(hyperdrive.connectionString, { logger: false });
  }

  /**
   * @author arefin
   * @description Find a single BlogPost entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<BlogPostEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(blogPostTable)
      .where(
        and(
          eq(blogPostTable.id, id),
          isNull(blogPostTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of BlogPost entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListBlogPostParams, hyperdrive?: Hyperdrive): Promise<ListBlogPostResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(blogPostTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(blogPostTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(blogPostTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(blogPostTable.createdAt))
      .limit(limit + 1);

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;
    const lastItem = items[items.length - 1] as Record<string, unknown> | undefined;
    const nextCursor = hasMore && lastItem?.['createdAt'] instanceof Date
      ? (lastItem['createdAt'] as Date).toISOString()
      : null;

    return { items, nextCursor, hasMore };
  }

  /**
   * @author arefin
   * @description Insert a new BlogPost entity into the database and return the created record
   */
  async create(data: NewBlogPost, hyperdrive?: Hyperdrive): Promise<BlogPostEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(blogPostTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert BlogPost`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing BlogPost entity and return the modified record
   */
  async update(data: UpdateBlogPost, hyperdrive?: Hyperdrive): Promise<BlogPostEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(blogPostTable)
      .set(updateData as never)
      .where(eq(blogPostTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a BlogPost entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(blogPostTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(blogPostTable.id, id), isNull(blogPostTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
