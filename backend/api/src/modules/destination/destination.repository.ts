import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { DestinationEntity, NewDestination, UpdateDestination, IDestinationRepository, ListDestinationParams, ListDestinationResult } from './destination.types.js';
import { destinationTable } from './destination.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class DestinationRepository implements IDestinationRepository {

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
   * @description Find a single Destination entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<DestinationEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(destinationTable)
      .where(
        and(
          eq(destinationTable.id, id),
          isNull(destinationTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Destination entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListDestinationParams, hyperdrive?: Hyperdrive): Promise<ListDestinationResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(destinationTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(destinationTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(destinationTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(destinationTable.createdAt))
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
   * @description Insert a new Destination entity into the database and return the created record
   */
  async create(data: NewDestination, hyperdrive?: Hyperdrive): Promise<DestinationEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(destinationTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Destination`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Destination entity and return the modified record
   */
  async update(data: UpdateDestination, hyperdrive?: Hyperdrive): Promise<DestinationEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(destinationTable)
      .set(updateData as never)
      .where(eq(destinationTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Destination entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(destinationTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(destinationTable.id, id), isNull(destinationTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
