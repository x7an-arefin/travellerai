import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { VehicleProtectionPlanEntity, NewVehicleProtectionPlan, UpdateVehicleProtectionPlan, IVehicleProtectionPlanRepository, ListVehicleProtectionPlanParams, ListVehicleProtectionPlanResult } from './vehicle-protection-plan.types.js';
import { vehicleProtectionPlanTable } from './vehicle-protection-plan.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class VehicleProtectionPlanRepository implements IVehicleProtectionPlanRepository {

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
   * @description Find a single VehicleProtectionPlan entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<VehicleProtectionPlanEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleProtectionPlanTable)
      .where(
        and(
          eq(vehicleProtectionPlanTable.id, id),
          isNull(vehicleProtectionPlanTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of VehicleProtectionPlan entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListVehicleProtectionPlanParams, hyperdrive?: Hyperdrive): Promise<ListVehicleProtectionPlanResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(vehicleProtectionPlanTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(vehicleProtectionPlanTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleProtectionPlanTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(vehicleProtectionPlanTable.createdAt))
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
   * @description Insert a new VehicleProtectionPlan entity into the database and return the created record
   */
  async create(data: NewVehicleProtectionPlan, hyperdrive?: Hyperdrive): Promise<VehicleProtectionPlanEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(vehicleProtectionPlanTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert VehicleProtectionPlan`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing VehicleProtectionPlan entity and return the modified record
   */
  async update(data: UpdateVehicleProtectionPlan, hyperdrive?: Hyperdrive): Promise<VehicleProtectionPlanEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(vehicleProtectionPlanTable)
      .set(updateData as never)
      .where(eq(vehicleProtectionPlanTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a VehicleProtectionPlan entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(vehicleProtectionPlanTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(vehicleProtectionPlanTable.id, id), isNull(vehicleProtectionPlanTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
