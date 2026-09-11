import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { ProviderEntity, NewProvider, UpdateProvider, IProviderRepository, ListProviderParams, ListProviderResult } from './provider.types.js';
import { providerTable } from './provider.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class ProviderRepository implements IProviderRepository {

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
   * @description Find a single Provider entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<ProviderEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(providerTable)
      .where(
        and(
          eq(providerTable.id, id),
          isNull(providerTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Provider entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListProviderParams, hyperdrive?: Hyperdrive): Promise<ListProviderResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(providerTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(providerTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(providerTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(providerTable.createdAt))
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
   * @description Insert a new Provider entity into the database and return the created record
   */
  async create(data: NewProvider, hyperdrive?: Hyperdrive): Promise<ProviderEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(providerTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Provider`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Provider entity and return the modified record
   */
  async update(data: UpdateProvider, hyperdrive?: Hyperdrive): Promise<ProviderEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(providerTable)
      .set(updateData as never)
      .where(eq(providerTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Provider entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(providerTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(providerTable.id, id), isNull(providerTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
