import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { ProviderPayoutAccountEntity, NewProviderPayoutAccount, UpdateProviderPayoutAccount, IProviderPayoutAccountRepository, ListProviderPayoutAccountParams, ListProviderPayoutAccountResult } from './provider-payout-account.types.js';
import { providerPayoutAccountTable } from './provider-payout-account.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class ProviderPayoutAccountRepository implements IProviderPayoutAccountRepository {

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
   * @description Find a single ProviderPayoutAccount entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<ProviderPayoutAccountEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(providerPayoutAccountTable)
      .where(
        and(
          eq(providerPayoutAccountTable.id, id),
          isNull(providerPayoutAccountTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of ProviderPayoutAccount entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListProviderPayoutAccountParams, hyperdrive?: Hyperdrive): Promise<ListProviderPayoutAccountResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(providerPayoutAccountTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(providerPayoutAccountTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(providerPayoutAccountTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(providerPayoutAccountTable.createdAt))
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
   * @description Insert a new ProviderPayoutAccount entity into the database and return the created record
   */
  async create(data: NewProviderPayoutAccount, hyperdrive?: Hyperdrive): Promise<ProviderPayoutAccountEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(providerPayoutAccountTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert ProviderPayoutAccount`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing ProviderPayoutAccount entity and return the modified record
   */
  async update(data: UpdateProviderPayoutAccount, hyperdrive?: Hyperdrive): Promise<ProviderPayoutAccountEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(providerPayoutAccountTable)
      .set(updateData as never)
      .where(eq(providerPayoutAccountTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a ProviderPayoutAccount entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(providerPayoutAccountTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(providerPayoutAccountTable.id, id), isNull(providerPayoutAccountTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
