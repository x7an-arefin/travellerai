import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { KycDocumentEntity, NewKycDocument, UpdateKycDocument, IKycDocumentRepository, ListKycDocumentParams, ListKycDocumentResult } from './kyc-document.types.js';
import { kycDocumentTable } from './kyc-document.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class KycDocumentRepository implements IKycDocumentRepository {

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
   * @description Find a single KycDocument entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<KycDocumentEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(kycDocumentTable)
      .where(
        and(
          eq(kycDocumentTable.id, id),
          isNull(kycDocumentTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of KycDocument entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListKycDocumentParams, hyperdrive?: Hyperdrive): Promise<ListKycDocumentResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(kycDocumentTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(kycDocumentTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(kycDocumentTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(kycDocumentTable.createdAt))
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
   * @description Insert a new KycDocument entity into the database and return the created record
   */
  async create(data: NewKycDocument, hyperdrive?: Hyperdrive): Promise<KycDocumentEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(kycDocumentTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert KycDocument`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing KycDocument entity and return the modified record
   */
  async update(data: UpdateKycDocument, hyperdrive?: Hyperdrive): Promise<KycDocumentEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(kycDocumentTable)
      .set(updateData as never)
      .where(eq(kycDocumentTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a KycDocument entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(kycDocumentTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(kycDocumentTable.id, id), isNull(kycDocumentTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
