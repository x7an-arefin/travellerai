import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { PropertyAmenityEntity, NewPropertyAmenity, UpdatePropertyAmenity, IPropertyAmenityRepository, ListPropertyAmenityParams, ListPropertyAmenityResult } from './property-amenity.types.js';
import { propertyAmenityTable } from './property-amenity.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class PropertyAmenityRepository implements IPropertyAmenityRepository {

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
   * @description Find a single PropertyAmenity entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<PropertyAmenityEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(propertyAmenityTable)
      .where(
        and(
          eq(propertyAmenityTable.id, id),
          isNull(propertyAmenityTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of PropertyAmenity entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListPropertyAmenityParams, hyperdrive?: Hyperdrive): Promise<ListPropertyAmenityResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(propertyAmenityTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(propertyAmenityTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(propertyAmenityTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(propertyAmenityTable.createdAt))
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
   * @description Insert a new PropertyAmenity entity into the database and return the created record
   */
  async create(data: NewPropertyAmenity, hyperdrive?: Hyperdrive): Promise<PropertyAmenityEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(propertyAmenityTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert PropertyAmenity`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing PropertyAmenity entity and return the modified record
   */
  async update(data: UpdatePropertyAmenity, hyperdrive?: Hyperdrive): Promise<PropertyAmenityEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(propertyAmenityTable)
      .set(updateData as never)
      .where(eq(propertyAmenityTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a PropertyAmenity entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(propertyAmenityTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(propertyAmenityTable.id, id), isNull(propertyAmenityTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
