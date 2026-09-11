import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { ReviewEntity, NewReview, UpdateReview, IReviewRepository, ListReviewParams, ListReviewResult } from './review.types.js';
import { reviewTable } from './review.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class ReviewRepository implements IReviewRepository {

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
   * @description Find a single Review entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<ReviewEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(reviewTable)
      .where(
        and(
          eq(reviewTable.id, id),
          isNull(reviewTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Review entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListReviewParams, hyperdrive?: Hyperdrive): Promise<ListReviewResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(reviewTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(reviewTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(reviewTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(reviewTable.createdAt))
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
   * @description Insert a new Review entity into the database and return the created record
   */
  async create(data: NewReview, hyperdrive?: Hyperdrive): Promise<ReviewEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(reviewTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Review`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Review entity and return the modified record
   */
  async update(data: UpdateReview, hyperdrive?: Hyperdrive): Promise<ReviewEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(reviewTable)
      .set(updateData as never)
      .where(eq(reviewTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Review entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(reviewTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(reviewTable.id, id), isNull(reviewTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
