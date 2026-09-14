import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { HotelBookingEntity, NewHotelBooking, UpdateHotelBooking, IHotelBookingRepository, ListHotelBookingParams, ListHotelBookingResult } from './hotel-booking.types.js';
import { hotelBookingTable } from './hotel-booking.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class HotelBookingRepository implements IHotelBookingRepository {

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
   * @description Find a single HotelBooking entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<HotelBookingEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelBookingTable)
      .where(
        and(
          eq(hotelBookingTable.id, id),
          isNull(hotelBookingTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of HotelBooking entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListHotelBookingParams, hyperdrive?: Hyperdrive): Promise<ListHotelBookingResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(hotelBookingTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(hotelBookingTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelBookingTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(hotelBookingTable.createdAt))
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
   * @description Insert a new HotelBooking entity into the database and return the created record
   */
  async create(data: NewHotelBooking, hyperdrive?: Hyperdrive): Promise<HotelBookingEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(hotelBookingTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert HotelBooking`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing HotelBooking entity and return the modified record
   */
  async update(data: UpdateHotelBooking, hyperdrive?: Hyperdrive): Promise<HotelBookingEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(hotelBookingTable)
      .set(updateData as never)
      .where(eq(hotelBookingTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a HotelBooking entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(hotelBookingTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(hotelBookingTable.id, id), isNull(hotelBookingTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
