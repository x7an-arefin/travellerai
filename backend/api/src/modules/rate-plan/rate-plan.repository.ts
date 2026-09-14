import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { RatePlanEntity, NewRatePlan, UpdateRatePlan, IRatePlanRepository, ListRatePlanParams, ListRatePlanResult } from './rate-plan.types.js';
import { ratePlanTable } from './rate-plan.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class RatePlanRepository implements IRatePlanRepository {

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
   * @description Find a single RatePlan entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<RatePlanEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(ratePlanTable)
      .where(
        and(
          eq(ratePlanTable.id, id),
          isNull(ratePlanTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of RatePlan entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListRatePlanParams, hyperdrive?: Hyperdrive): Promise<ListRatePlanResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(ratePlanTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(ratePlanTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(ratePlanTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(ratePlanTable.createdAt))
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
   * @description Insert a new RatePlan entity into the database and return the created record
   */
  async create(data: NewRatePlan, hyperdrive?: Hyperdrive): Promise<RatePlanEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(ratePlanTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert RatePlan`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing RatePlan entity and return the modified record
   */
  async update(data: UpdateRatePlan, hyperdrive?: Hyperdrive): Promise<RatePlanEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(ratePlanTable)
      .set(updateData as never)
      .where(eq(ratePlanTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a RatePlan entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(ratePlanTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(ratePlanTable.id, id), isNull(ratePlanTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
