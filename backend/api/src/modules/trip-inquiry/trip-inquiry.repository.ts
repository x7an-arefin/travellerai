import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { TripInquiryEntity, NewTripInquiry, UpdateTripInquiry, ITripInquiryRepository, ListTripInquiryParams, ListTripInquiryResult } from './trip-inquiry.types.js';
import { tripInquiryTable } from './trip-inquiry.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class TripInquiryRepository implements ITripInquiryRepository {

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
   * @description Find a single TripInquiry entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<TripInquiryEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(tripInquiryTable)
      .where(
        and(
          eq(tripInquiryTable.id, id),
          isNull(tripInquiryTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of TripInquiry entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListTripInquiryParams, hyperdrive?: Hyperdrive): Promise<ListTripInquiryResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(tripInquiryTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(tripInquiryTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(tripInquiryTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(tripInquiryTable.createdAt))
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
   * @description Insert a new TripInquiry entity into the database and return the created record
   */
  async create(data: NewTripInquiry, hyperdrive?: Hyperdrive): Promise<TripInquiryEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(tripInquiryTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert TripInquiry`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing TripInquiry entity and return the modified record
   */
  async update(data: UpdateTripInquiry, hyperdrive?: Hyperdrive): Promise<TripInquiryEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(tripInquiryTable)
      .set(updateData as never)
      .where(eq(tripInquiryTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a TripInquiry entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(tripInquiryTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(tripInquiryTable.id, id), isNull(tripInquiryTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
