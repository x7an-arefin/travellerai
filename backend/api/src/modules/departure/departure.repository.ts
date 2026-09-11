import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { DepartureEntity, NewDeparture, UpdateDeparture, IDepartureRepository, ListDepartureParams, ListDepartureResult } from './departure.types.js';
import { departureTable } from './departure.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class DepartureRepository implements IDepartureRepository {

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
   * @description Find a single Departure entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<DepartureEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(departureTable)
      .where(
        and(
          eq(departureTable.id, id),
          isNull(departureTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Departure entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListDepartureParams, hyperdrive?: Hyperdrive): Promise<ListDepartureResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(departureTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(departureTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(departureTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(departureTable.createdAt))
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
   * @description Insert a new Departure entity into the database and return the created record
   */
  async create(data: NewDeparture, hyperdrive?: Hyperdrive): Promise<DepartureEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(departureTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Departure`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Departure entity and return the modified record
   */
  async update(data: UpdateDeparture, hyperdrive?: Hyperdrive): Promise<DepartureEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(departureTable)
      .set(updateData as never)
      .where(eq(departureTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Departure entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(departureTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(departureTable.id, id), isNull(departureTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
