import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { GiftCardEntity, NewGiftCard, UpdateGiftCard, IGiftCardRepository, ListGiftCardParams, ListGiftCardResult } from './gift-card.types.js';
import { giftCardTable } from './gift-card.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class GiftCardRepository implements IGiftCardRepository {

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
   * @description Find a single GiftCard entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<GiftCardEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(giftCardTable)
      .where(
        and(
          eq(giftCardTable.id, id),
          isNull(giftCardTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of GiftCard entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListGiftCardParams, hyperdrive?: Hyperdrive): Promise<ListGiftCardResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(giftCardTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(giftCardTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(giftCardTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(giftCardTable.createdAt))
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
   * @description Insert a new GiftCard entity into the database and return the created record
   */
  async create(data: NewGiftCard, hyperdrive?: Hyperdrive): Promise<GiftCardEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(giftCardTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert GiftCard`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing GiftCard entity and return the modified record
   */
  async update(data: UpdateGiftCard, hyperdrive?: Hyperdrive): Promise<GiftCardEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(giftCardTable)
      .set(updateData as never)
      .where(eq(giftCardTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a GiftCard entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(giftCardTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(giftCardTable.id, id), isNull(giftCardTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
