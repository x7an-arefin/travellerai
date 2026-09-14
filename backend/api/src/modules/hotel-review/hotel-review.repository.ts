import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { HotelReviewEntity, NewHotelReview, UpdateHotelReview, IHotelReviewRepository, ListHotelReviewParams, ListHotelReviewResult } from './hotel-review.types.js';
import { hotelReviewTable } from './hotel-review.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class HotelReviewRepository implements IHotelReviewRepository {

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
   * @description Find a single HotelReview entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<HotelReviewEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelReviewTable)
      .where(
        and(
          eq(hotelReviewTable.id, id),
          isNull(hotelReviewTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of HotelReview entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListHotelReviewParams, hyperdrive?: Hyperdrive): Promise<ListHotelReviewResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(hotelReviewTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(hotelReviewTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelReviewTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(hotelReviewTable.createdAt))
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
   * @description Insert a new HotelReview entity into the database and return the created record
   */
  async create(data: NewHotelReview, hyperdrive?: Hyperdrive): Promise<HotelReviewEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(hotelReviewTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert HotelReview`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing HotelReview entity and return the modified record
   */
  async update(data: UpdateHotelReview, hyperdrive?: Hyperdrive): Promise<HotelReviewEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(hotelReviewTable)
      .set(updateData as never)
      .where(eq(hotelReviewTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a HotelReview entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(hotelReviewTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(hotelReviewTable.id, id), isNull(hotelReviewTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
