import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { VehicleMaintenanceLogEntity, NewVehicleMaintenanceLog, UpdateVehicleMaintenanceLog, IVehicleMaintenanceLogRepository, ListVehicleMaintenanceLogParams, ListVehicleMaintenanceLogResult } from './vehicle-maintenance-log.types.js';
import { vehicleMaintenanceLogTable } from './vehicle-maintenance-log.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class VehicleMaintenanceLogRepository implements IVehicleMaintenanceLogRepository {

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
   * @description Find a single VehicleMaintenanceLog entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<VehicleMaintenanceLogEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleMaintenanceLogTable)
      .where(
        and(
          eq(vehicleMaintenanceLogTable.id, id),
          isNull(vehicleMaintenanceLogTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of VehicleMaintenanceLog entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListVehicleMaintenanceLogParams, hyperdrive?: Hyperdrive): Promise<ListVehicleMaintenanceLogResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(vehicleMaintenanceLogTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(vehicleMaintenanceLogTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleMaintenanceLogTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(vehicleMaintenanceLogTable.createdAt))
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
   * @description Insert a new VehicleMaintenanceLog entity into the database and return the created record
   */
  async create(data: NewVehicleMaintenanceLog, hyperdrive?: Hyperdrive): Promise<VehicleMaintenanceLogEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(vehicleMaintenanceLogTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert VehicleMaintenanceLog`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing VehicleMaintenanceLog entity and return the modified record
   */
  async update(data: UpdateVehicleMaintenanceLog, hyperdrive?: Hyperdrive): Promise<VehicleMaintenanceLogEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(vehicleMaintenanceLogTable)
      .set(updateData as never)
      .where(eq(vehicleMaintenanceLogTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a VehicleMaintenanceLog entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(vehicleMaintenanceLogTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(vehicleMaintenanceLogTable.id, id), isNull(vehicleMaintenanceLogTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
