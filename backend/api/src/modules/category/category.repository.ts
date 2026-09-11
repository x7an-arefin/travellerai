import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { CategoryEntity, NewCategory, UpdateCategory, ICategoryRepository, ListCategoryParams, ListCategoryResult } from './category.types.js';
import { categoryTable } from './category.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class CategoryRepository implements ICategoryRepository {

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
   * @description Find a single Category entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<CategoryEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(categoryTable)
      .where(
        and(
          eq(categoryTable.id, id),
          isNull(categoryTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Category entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListCategoryParams, hyperdrive?: Hyperdrive): Promise<ListCategoryResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(categoryTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(categoryTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(categoryTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(categoryTable.createdAt))
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
   * @description Insert a new Category entity into the database and return the created record
   */
  async create(data: NewCategory, hyperdrive?: Hyperdrive): Promise<CategoryEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(categoryTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Category`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Category entity and return the modified record
   */
  async update(data: UpdateCategory, hyperdrive?: Hyperdrive): Promise<CategoryEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(categoryTable)
      .set(updateData as never)
      .where(eq(categoryTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Category entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(categoryTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(categoryTable.id, id), isNull(categoryTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
