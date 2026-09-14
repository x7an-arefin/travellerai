import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { RoomUnitEntity, NewRoomUnit, UpdateRoomUnit, IRoomUnitRepository, ListRoomUnitParams, ListRoomUnitResult } from './room-unit.types.js';
import { roomUnitTable } from './room-unit.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class RoomUnitRepository implements IRoomUnitRepository {

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
   * @description Find a single RoomUnit entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<RoomUnitEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(roomUnitTable)
      .where(
        and(
          eq(roomUnitTable.id, id),
          isNull(roomUnitTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of RoomUnit entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListRoomUnitParams, hyperdrive?: Hyperdrive): Promise<ListRoomUnitResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(roomUnitTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(roomUnitTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(roomUnitTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(roomUnitTable.createdAt))
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
   * @description Insert a new RoomUnit entity into the database and return the created record
   */
  async create(data: NewRoomUnit, hyperdrive?: Hyperdrive): Promise<RoomUnitEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(roomUnitTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert RoomUnit`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing RoomUnit entity and return the modified record
   */
  async update(data: UpdateRoomUnit, hyperdrive?: Hyperdrive): Promise<RoomUnitEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(roomUnitTable)
      .set(updateData as never)
      .where(eq(roomUnitTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a RoomUnit entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(roomUnitTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(roomUnitTable.id, id), isNull(roomUnitTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
