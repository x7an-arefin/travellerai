import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { InventoryCalendarEntity, NewInventoryCalendar, UpdateInventoryCalendar, IInventoryCalendarRepository, ListInventoryCalendarParams, ListInventoryCalendarResult } from './inventory-calendar.types.js';
import { inventoryCalendarTable } from './inventory-calendar.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class InventoryCalendarRepository implements IInventoryCalendarRepository {

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
   * @description Find a single InventoryCalendar entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<InventoryCalendarEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(inventoryCalendarTable)
      .where(
        and(
          eq(inventoryCalendarTable.id, id),
          isNull(inventoryCalendarTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of InventoryCalendar entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListInventoryCalendarParams, hyperdrive?: Hyperdrive): Promise<ListInventoryCalendarResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(inventoryCalendarTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(inventoryCalendarTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(inventoryCalendarTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(inventoryCalendarTable.createdAt))
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
   * @description Insert a new InventoryCalendar entity into the database and return the created record
   */
  async create(data: NewInventoryCalendar, hyperdrive?: Hyperdrive): Promise<InventoryCalendarEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(inventoryCalendarTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert InventoryCalendar`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing InventoryCalendar entity and return the modified record
   */
  async update(data: UpdateInventoryCalendar, hyperdrive?: Hyperdrive): Promise<InventoryCalendarEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(inventoryCalendarTable)
      .set(updateData as never)
      .where(eq(inventoryCalendarTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a InventoryCalendar entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(inventoryCalendarTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(inventoryCalendarTable.id, id), isNull(inventoryCalendarTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
