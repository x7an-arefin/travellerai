import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { RoomTypeEntity, NewRoomType, UpdateRoomType, IRoomTypeRepository, ListRoomTypeParams, ListRoomTypeResult } from './room-type.types.js';
import { roomTypeTable } from './room-type.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class RoomTypeRepository implements IRoomTypeRepository {

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
   * @description Find a single RoomType entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<RoomTypeEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(roomTypeTable)
      .where(
        and(
          eq(roomTypeTable.id, id),
          isNull(roomTypeTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of RoomType entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListRoomTypeParams, hyperdrive?: Hyperdrive): Promise<ListRoomTypeResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(roomTypeTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(roomTypeTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(roomTypeTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(roomTypeTable.createdAt))
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
   * @description Insert a new RoomType entity into the database and return the created record
   */
  async create(data: NewRoomType, hyperdrive?: Hyperdrive): Promise<RoomTypeEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(roomTypeTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert RoomType`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing RoomType entity and return the modified record
   */
  async update(data: UpdateRoomType, hyperdrive?: Hyperdrive): Promise<RoomTypeEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(roomTypeTable)
      .set(updateData as never)
      .where(eq(roomTypeTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a RoomType entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(roomTypeTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(roomTypeTable.id, id), isNull(roomTypeTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
