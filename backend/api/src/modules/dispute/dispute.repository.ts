import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { DisputeEntity, NewDispute, UpdateDispute, IDisputeRepository, ListDisputeParams, ListDisputeResult } from './dispute.types.js';
import { disputeTable } from './dispute.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class DisputeRepository implements IDisputeRepository {

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
   * @description Find a single Dispute entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<DisputeEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(disputeTable)
      .where(
        and(
          eq(disputeTable.id, id),
          isNull(disputeTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Dispute entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListDisputeParams, hyperdrive?: Hyperdrive): Promise<ListDisputeResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(disputeTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(disputeTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(disputeTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(disputeTable.createdAt))
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
   * @description Insert a new Dispute entity into the database and return the created record
   */
  async create(data: NewDispute, hyperdrive?: Hyperdrive): Promise<DisputeEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(disputeTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Dispute`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Dispute entity and return the modified record
   */
  async update(data: UpdateDispute, hyperdrive?: Hyperdrive): Promise<DisputeEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(disputeTable)
      .set(updateData as never)
      .where(eq(disputeTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Dispute entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(disputeTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(disputeTable.id, id), isNull(disputeTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
