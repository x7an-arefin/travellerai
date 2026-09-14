import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { DriverEntity, NewDriver, UpdateDriver, IDriverRepository, ListDriverParams, ListDriverResult } from './driver.types.js';
import { driverTable } from './driver.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class DriverRepository implements IDriverRepository {

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
   * @description Find a single Driver entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<DriverEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(driverTable)
      .where(
        and(
          eq(driverTable.id, id),
          isNull(driverTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Driver entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListDriverParams, hyperdrive?: Hyperdrive): Promise<ListDriverResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(driverTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(driverTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(driverTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(driverTable.createdAt))
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
   * @description Insert a new Driver entity into the database and return the created record
   */
  async create(data: NewDriver, hyperdrive?: Hyperdrive): Promise<DriverEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(driverTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Driver`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Driver entity and return the modified record
   */
  async update(data: UpdateDriver, hyperdrive?: Hyperdrive): Promise<DriverEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(driverTable)
      .set(updateData as never)
      .where(eq(driverTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Driver entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(driverTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(driverTable.id, id), isNull(driverTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
