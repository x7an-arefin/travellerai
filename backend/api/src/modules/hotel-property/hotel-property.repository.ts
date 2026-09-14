import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { HotelPropertyEntity, NewHotelProperty, UpdateHotelProperty, IHotelPropertyRepository, ListHotelPropertyParams, ListHotelPropertyResult } from './hotel-property.types.js';
import { hotelPropertyTable } from './hotel-property.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class HotelPropertyRepository implements IHotelPropertyRepository {

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
   * @description Find a single HotelProperty entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<HotelPropertyEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelPropertyTable)
      .where(
        and(
          eq(hotelPropertyTable.id, id),
          isNull(hotelPropertyTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of HotelProperty entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListHotelPropertyParams, hyperdrive?: Hyperdrive): Promise<ListHotelPropertyResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(hotelPropertyTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(hotelPropertyTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelPropertyTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(hotelPropertyTable.createdAt))
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
   * @description Insert a new HotelProperty entity into the database and return the created record
   */
  async create(data: NewHotelProperty, hyperdrive?: Hyperdrive): Promise<HotelPropertyEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(hotelPropertyTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert HotelProperty`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing HotelProperty entity and return the modified record
   */
  async update(data: UpdateHotelProperty, hyperdrive?: Hyperdrive): Promise<HotelPropertyEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(hotelPropertyTable)
      .set(updateData as never)
      .where(eq(hotelPropertyTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a HotelProperty entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(hotelPropertyTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(hotelPropertyTable.id, id), isNull(hotelPropertyTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
