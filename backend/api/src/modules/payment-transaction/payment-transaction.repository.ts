import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { PaymentTransactionEntity, NewPaymentTransaction, UpdatePaymentTransaction, IPaymentTransactionRepository, ListPaymentTransactionParams, ListPaymentTransactionResult } from './payment-transaction.types.js';
import { paymentTransactionTable } from './payment-transaction.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class PaymentTransactionRepository implements IPaymentTransactionRepository {

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
   * @description Find a single PaymentTransaction entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<PaymentTransactionEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(paymentTransactionTable)
      .where(
        and(
          eq(paymentTransactionTable.id, id),
          isNull(paymentTransactionTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of PaymentTransaction entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListPaymentTransactionParams, hyperdrive?: Hyperdrive): Promise<ListPaymentTransactionResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(paymentTransactionTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(paymentTransactionTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(paymentTransactionTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(paymentTransactionTable.createdAt))
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
   * @description Insert a new PaymentTransaction entity into the database and return the created record
   */
  async create(data: NewPaymentTransaction, hyperdrive?: Hyperdrive): Promise<PaymentTransactionEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(paymentTransactionTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert PaymentTransaction`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing PaymentTransaction entity and return the modified record
   */
  async update(data: UpdatePaymentTransaction, hyperdrive?: Hyperdrive): Promise<PaymentTransactionEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(paymentTransactionTable)
      .set(updateData as never)
      .where(eq(paymentTransactionTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a PaymentTransaction entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(paymentTransactionTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(paymentTransactionTable.id, id), isNull(paymentTransactionTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
