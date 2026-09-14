import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { VehicleComplianceDocEntity, NewVehicleComplianceDoc, UpdateVehicleComplianceDoc, IVehicleComplianceDocRepository, ListVehicleComplianceDocParams, ListVehicleComplianceDocResult } from './vehicle-compliance-doc.types.js';
import { vehicleComplianceDocTable } from './vehicle-compliance-doc.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class VehicleComplianceDocRepository implements IVehicleComplianceDocRepository {

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
   * @description Find a single VehicleComplianceDoc entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<VehicleComplianceDocEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleComplianceDocTable)
      .where(
        and(
          eq(vehicleComplianceDocTable.id, id),
          isNull(vehicleComplianceDocTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of VehicleComplianceDoc entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListVehicleComplianceDocParams, hyperdrive?: Hyperdrive): Promise<ListVehicleComplianceDocResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(vehicleComplianceDocTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(vehicleComplianceDocTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleComplianceDocTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(vehicleComplianceDocTable.createdAt))
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
   * @description Insert a new VehicleComplianceDoc entity into the database and return the created record
   */
  async create(data: NewVehicleComplianceDoc, hyperdrive?: Hyperdrive): Promise<VehicleComplianceDocEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(vehicleComplianceDocTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert VehicleComplianceDoc`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing VehicleComplianceDoc entity and return the modified record
   */
  async update(data: UpdateVehicleComplianceDoc, hyperdrive?: Hyperdrive): Promise<VehicleComplianceDocEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(vehicleComplianceDocTable)
      .set(updateData as never)
      .where(eq(vehicleComplianceDocTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a VehicleComplianceDoc entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(vehicleComplianceDocTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(vehicleComplianceDocTable.id, id), isNull(vehicleComplianceDocTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
