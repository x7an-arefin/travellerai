import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { PackageEntity, NewPackage, UpdatePackage, IPackageRepository, ListPackageParams, ListPackageResult } from './package.types.js';
import { packageTable } from './package.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class PackageRepository implements IPackageRepository {

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
   * @description Find a single Package entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<PackageEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(packageTable)
      .where(
        and(
          eq(packageTable.id, id),
          isNull(packageTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Package entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListPackageParams, hyperdrive?: Hyperdrive): Promise<ListPackageResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(packageTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(packageTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(packageTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(packageTable.createdAt))
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
   * @description Insert a new Package entity into the database and return the created record
   */
  async create(data: NewPackage, hyperdrive?: Hyperdrive): Promise<PackageEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(packageTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Package`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Package entity and return the modified record
   */
  async update(data: UpdatePackage, hyperdrive?: Hyperdrive): Promise<PackageEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(packageTable)
      .set(updateData as never)
      .where(eq(packageTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Package entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(packageTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(packageTable.id, id), isNull(packageTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
