import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { VehiclePricingPlanEntity, NewVehiclePricingPlan, UpdateVehiclePricingPlan, IVehiclePricingPlanRepository, ListVehiclePricingPlanParams, ListVehiclePricingPlanResult } from './vehicle-pricing-plan.types.js';
import { vehiclePricingPlanTable } from './vehicle-pricing-plan.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class VehiclePricingPlanRepository implements IVehiclePricingPlanRepository {

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
   * @description Find a single VehiclePricingPlan entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<VehiclePricingPlanEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehiclePricingPlanTable)
      .where(
        and(
          eq(vehiclePricingPlanTable.id, id),
          isNull(vehiclePricingPlanTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of VehiclePricingPlan entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListVehiclePricingPlanParams, hyperdrive?: Hyperdrive): Promise<ListVehiclePricingPlanResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(vehiclePricingPlanTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(vehiclePricingPlanTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehiclePricingPlanTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(vehiclePricingPlanTable.createdAt))
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
   * @description Insert a new VehiclePricingPlan entity into the database and return the created record
   */
  async create(data: NewVehiclePricingPlan, hyperdrive?: Hyperdrive): Promise<VehiclePricingPlanEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(vehiclePricingPlanTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert VehiclePricingPlan`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing VehiclePricingPlan entity and return the modified record
   */
  async update(data: UpdateVehiclePricingPlan, hyperdrive?: Hyperdrive): Promise<VehiclePricingPlanEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(vehiclePricingPlanTable)
      .set(updateData as never)
      .where(eq(vehiclePricingPlanTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a VehiclePricingPlan entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(vehiclePricingPlanTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(vehiclePricingPlanTable.id, id), isNull(vehiclePricingPlanTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
