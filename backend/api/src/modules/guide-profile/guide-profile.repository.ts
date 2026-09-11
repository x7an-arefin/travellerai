import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { GuideProfileEntity, NewGuideProfile, UpdateGuideProfile, IGuideProfileRepository, ListGuideProfileParams, ListGuideProfileResult } from './guide-profile.types.js';
import { guideProfileTable } from './guide-profile.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class GuideProfileRepository implements IGuideProfileRepository {

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
   * @description Find a single GuideProfile entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<GuideProfileEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(guideProfileTable)
      .where(
        and(
          eq(guideProfileTable.id, id),
          isNull(guideProfileTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of GuideProfile entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListGuideProfileParams, hyperdrive?: Hyperdrive): Promise<ListGuideProfileResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(guideProfileTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(guideProfileTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(guideProfileTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(guideProfileTable.createdAt))
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
   * @description Insert a new GuideProfile entity into the database and return the created record
   */
  async create(data: NewGuideProfile, hyperdrive?: Hyperdrive): Promise<GuideProfileEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(guideProfileTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert GuideProfile`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing GuideProfile entity and return the modified record
   */
  async update(data: UpdateGuideProfile, hyperdrive?: Hyperdrive): Promise<GuideProfileEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(guideProfileTable)
      .set(updateData as never)
      .where(eq(guideProfileTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a GuideProfile entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(guideProfileTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(guideProfileTable.id, id), isNull(guideProfileTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
