import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { ProviderQuotationEntity, NewProviderQuotation, UpdateProviderQuotation, IProviderQuotationRepository, ListProviderQuotationParams, ListProviderQuotationResult } from './provider-quotation.types.js';
import { providerQuotationTable } from './provider-quotation.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class ProviderQuotationRepository implements IProviderQuotationRepository {

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
   * @description Find a single ProviderQuotation entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<ProviderQuotationEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(providerQuotationTable)
      .where(
        and(
          eq(providerQuotationTable.id, id),
          isNull(providerQuotationTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of ProviderQuotation entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListProviderQuotationParams, hyperdrive?: Hyperdrive): Promise<ListProviderQuotationResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(providerQuotationTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(providerQuotationTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(providerQuotationTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(providerQuotationTable.createdAt))
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
   * @description Insert a new ProviderQuotation entity into the database and return the created record
   */
  async create(data: NewProviderQuotation, hyperdrive?: Hyperdrive): Promise<ProviderQuotationEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(providerQuotationTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert ProviderQuotation`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing ProviderQuotation entity and return the modified record
   */
  async update(data: UpdateProviderQuotation, hyperdrive?: Hyperdrive): Promise<ProviderQuotationEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(providerQuotationTable)
      .set(updateData as never)
      .where(eq(providerQuotationTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a ProviderQuotation entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(providerQuotationTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(providerQuotationTable.id, id), isNull(providerQuotationTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
