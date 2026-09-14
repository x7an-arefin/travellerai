import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { HotelGuestFolioEntity, NewHotelGuestFolio, UpdateHotelGuestFolio, IHotelGuestFolioRepository, ListHotelGuestFolioParams, ListHotelGuestFolioResult } from './hotel-guest-folio.types.js';
import { hotelGuestFolioTable } from './hotel-guest-folio.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class HotelGuestFolioRepository implements IHotelGuestFolioRepository {

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
   * @description Find a single HotelGuestFolio entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<HotelGuestFolioEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelGuestFolioTable)
      .where(
        and(
          eq(hotelGuestFolioTable.id, id),
          isNull(hotelGuestFolioTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of HotelGuestFolio entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListHotelGuestFolioParams, hyperdrive?: Hyperdrive): Promise<ListHotelGuestFolioResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(hotelGuestFolioTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(hotelGuestFolioTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelGuestFolioTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(hotelGuestFolioTable.createdAt))
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
   * @description Insert a new HotelGuestFolio entity into the database and return the created record
   */
  async create(data: NewHotelGuestFolio, hyperdrive?: Hyperdrive): Promise<HotelGuestFolioEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(hotelGuestFolioTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert HotelGuestFolio`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing HotelGuestFolio entity and return the modified record
   */
  async update(data: UpdateHotelGuestFolio, hyperdrive?: Hyperdrive): Promise<HotelGuestFolioEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(hotelGuestFolioTable)
      .set(updateData as never)
      .where(eq(hotelGuestFolioTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a HotelGuestFolio entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(hotelGuestFolioTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(hotelGuestFolioTable.id, id), isNull(hotelGuestFolioTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
