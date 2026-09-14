import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { HotelMaintenanceTicketEntity, NewHotelMaintenanceTicket, UpdateHotelMaintenanceTicket, IHotelMaintenanceTicketRepository, ListHotelMaintenanceTicketParams, ListHotelMaintenanceTicketResult } from './hotel-maintenance-ticket.types.js';
import { hotelMaintenanceTicketTable } from './hotel-maintenance-ticket.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class HotelMaintenanceTicketRepository implements IHotelMaintenanceTicketRepository {

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
   * @description Find a single HotelMaintenanceTicket entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<HotelMaintenanceTicketEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelMaintenanceTicketTable)
      .where(
        and(
          eq(hotelMaintenanceTicketTable.id, id),
          isNull(hotelMaintenanceTicketTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of HotelMaintenanceTicket entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListHotelMaintenanceTicketParams, hyperdrive?: Hyperdrive): Promise<ListHotelMaintenanceTicketResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(hotelMaintenanceTicketTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(hotelMaintenanceTicketTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(hotelMaintenanceTicketTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(hotelMaintenanceTicketTable.createdAt))
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
   * @description Insert a new HotelMaintenanceTicket entity into the database and return the created record
   */
  async create(data: NewHotelMaintenanceTicket, hyperdrive?: Hyperdrive): Promise<HotelMaintenanceTicketEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(hotelMaintenanceTicketTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert HotelMaintenanceTicket`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing HotelMaintenanceTicket entity and return the modified record
   */
  async update(data: UpdateHotelMaintenanceTicket, hyperdrive?: Hyperdrive): Promise<HotelMaintenanceTicketEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(hotelMaintenanceTicketTable)
      .set(updateData as never)
      .where(eq(hotelMaintenanceTicketTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a HotelMaintenanceTicket entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(hotelMaintenanceTicketTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(hotelMaintenanceTicketTable.id, id), isNull(hotelMaintenanceTicketTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
