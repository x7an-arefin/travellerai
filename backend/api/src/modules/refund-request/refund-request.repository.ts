import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { RefundRequestEntity, NewRefundRequest, UpdateRefundRequest, IRefundRequestRepository, ListRefundRequestParams, ListRefundRequestResult } from './refund-request.types.js';
import { refundRequestTable } from './refund-request.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class RefundRequestRepository implements IRefundRequestRepository {

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
   * @description Find a single RefundRequest entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<RefundRequestEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(refundRequestTable)
      .where(
        and(
          eq(refundRequestTable.id, id),
          isNull(refundRequestTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of RefundRequest entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListRefundRequestParams, hyperdrive?: Hyperdrive): Promise<ListRefundRequestResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(refundRequestTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(refundRequestTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(refundRequestTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(refundRequestTable.createdAt))
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
   * @description Insert a new RefundRequest entity into the database and return the created record
   */
  async create(data: NewRefundRequest, hyperdrive?: Hyperdrive): Promise<RefundRequestEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(refundRequestTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert RefundRequest`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing RefundRequest entity and return the modified record
   */
  async update(data: UpdateRefundRequest, hyperdrive?: Hyperdrive): Promise<RefundRequestEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(refundRequestTable)
      .set(updateData as never)
      .where(eq(refundRequestTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a RefundRequest entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(refundRequestTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(refundRequestTable.id, id), isNull(refundRequestTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
