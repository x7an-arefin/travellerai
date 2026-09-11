import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { BookingEntity, NewBooking, UpdateBooking, IBookingRepository, ListBookingParams, ListBookingResult } from './booking.types.js';
import { bookingTable } from './booking.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class BookingRepository implements IBookingRepository {

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
   * @description Find a single Booking entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<BookingEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(bookingTable)
      .where(
        and(
          eq(bookingTable.id, id),
          isNull(bookingTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Booking entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListBookingParams, hyperdrive?: Hyperdrive): Promise<ListBookingResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(bookingTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(bookingTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(bookingTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(bookingTable.createdAt))
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
   * @description Insert a new Booking entity into the database and return the created record
   */
  async create(data: NewBooking, hyperdrive?: Hyperdrive): Promise<BookingEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(bookingTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Booking`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Booking entity and return the modified record
   */
  async update(data: UpdateBooking, hyperdrive?: Hyperdrive): Promise<BookingEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(bookingTable)
      .set(updateData as never)
      .where(eq(bookingTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Booking entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(bookingTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(bookingTable.id, id), isNull(bookingTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
