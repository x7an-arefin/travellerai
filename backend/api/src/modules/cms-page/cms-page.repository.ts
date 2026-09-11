import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { CmsPageEntity, NewCmsPage, UpdateCmsPage, ICmsPageRepository, ListCmsPageParams, ListCmsPageResult } from './cms-page.types.js';
import { cmsPageTable } from './cms-page.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class CmsPageRepository implements ICmsPageRepository {

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
   * @description Find a single CmsPage entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<CmsPageEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(cmsPageTable)
      .where(
        and(
          eq(cmsPageTable.id, id),
          isNull(cmsPageTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of CmsPage entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListCmsPageParams, hyperdrive?: Hyperdrive): Promise<ListCmsPageResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(cmsPageTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(cmsPageTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(cmsPageTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(cmsPageTable.createdAt))
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
   * @description Insert a new CmsPage entity into the database and return the created record
   */
  async create(data: NewCmsPage, hyperdrive?: Hyperdrive): Promise<CmsPageEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(cmsPageTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert CmsPage`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing CmsPage entity and return the modified record
   */
  async update(data: UpdateCmsPage, hyperdrive?: Hyperdrive): Promise<CmsPageEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(cmsPageTable)
      .set(updateData as never)
      .where(eq(cmsPageTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a CmsPage entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(cmsPageTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(cmsPageTable.id, id), isNull(cmsPageTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
