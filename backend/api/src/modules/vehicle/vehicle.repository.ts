import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { VehicleEntity, NewVehicle, UpdateVehicle, IVehicleRepository, ListVehicleParams, ListVehicleResult } from './vehicle.types.js';
import { vehicleTable } from './vehicle.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class VehicleRepository implements IVehicleRepository {

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
   * @description Find a single Vehicle entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<VehicleEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleTable)
      .where(
        and(
          eq(vehicleTable.id, id),
          isNull(vehicleTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Vehicle entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListVehicleParams, hyperdrive?: Hyperdrive): Promise<ListVehicleResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(vehicleTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(vehicleTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(vehicleTable.createdAt))
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
   * @description Insert a new Vehicle entity into the database and return the created record
   */
  async create(data: NewVehicle, hyperdrive?: Hyperdrive): Promise<VehicleEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(vehicleTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Vehicle`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Vehicle entity and return the modified record
   */
  async update(data: UpdateVehicle, hyperdrive?: Hyperdrive): Promise<VehicleEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(vehicleTable)
      .set(updateData as never)
      .where(eq(vehicleTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Vehicle entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(vehicleTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(vehicleTable.id, id), isNull(vehicleTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
