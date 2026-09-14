import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { VehicleInspectionEntity, NewVehicleInspection, UpdateVehicleInspection, IVehicleInspectionRepository, ListVehicleInspectionParams, ListVehicleInspectionResult } from './vehicle-inspection.types.js';
import { vehicleInspectionTable } from './vehicle-inspection.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class VehicleInspectionRepository implements IVehicleInspectionRepository {

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
   * @description Find a single VehicleInspection entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<VehicleInspectionEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleInspectionTable)
      .where(
        and(
          eq(vehicleInspectionTable.id, id),
          isNull(vehicleInspectionTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of VehicleInspection entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListVehicleInspectionParams, hyperdrive?: Hyperdrive): Promise<ListVehicleInspectionResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(vehicleInspectionTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(vehicleInspectionTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleInspectionTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(vehicleInspectionTable.createdAt))
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
   * @description Insert a new VehicleInspection entity into the database and return the created record
   */
  async create(data: NewVehicleInspection, hyperdrive?: Hyperdrive): Promise<VehicleInspectionEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(vehicleInspectionTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert VehicleInspection`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing VehicleInspection entity and return the modified record
   */
  async update(data: UpdateVehicleInspection, hyperdrive?: Hyperdrive): Promise<VehicleInspectionEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(vehicleInspectionTable)
      .set(updateData as never)
      .where(eq(vehicleInspectionTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a VehicleInspection entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(vehicleInspectionTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(vehicleInspectionTable.id, id), isNull(vehicleInspectionTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
