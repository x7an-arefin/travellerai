import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { HotelBookingRoomEntity, NewHotelBookingRoom, UpdateHotelBookingRoom, IHotelBookingRoomRepository, ListHotelBookingRoomParams, ListHotelBookingRoomResult } from './hotel-booking-room.types.js';
import { hotelBookingRoomTable } from './hotel-booking-room.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class HotelBookingRoomRepository implements IHotelBookingRoomRepository {

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
   * @description Find a single HotelBookingRoom entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<HotelBookingRoomEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelBookingRoomTable)
      .where(
        and(
          eq(hotelBookingRoomTable.id, id),
          isNull(hotelBookingRoomTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of HotelBookingRoom entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListHotelBookingRoomParams, hyperdrive?: Hyperdrive): Promise<ListHotelBookingRoomResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(hotelBookingRoomTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(hotelBookingRoomTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelBookingRoomTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(hotelBookingRoomTable.createdAt))
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
   * @description Insert a new HotelBookingRoom entity into the database and return the created record
   */
  async create(data: NewHotelBookingRoom, hyperdrive?: Hyperdrive): Promise<HotelBookingRoomEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(hotelBookingRoomTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert HotelBookingRoom`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing HotelBookingRoom entity and return the modified record
   */
  async update(data: UpdateHotelBookingRoom, hyperdrive?: Hyperdrive): Promise<HotelBookingRoomEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(hotelBookingRoomTable)
      .set(updateData as never)
      .where(eq(hotelBookingRoomTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a HotelBookingRoom entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(hotelBookingRoomTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(hotelBookingRoomTable.id, id), isNull(hotelBookingRoomTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
