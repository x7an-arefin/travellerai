import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { VehicleBookingExtraEntity, NewVehicleBookingExtra, UpdateVehicleBookingExtra, IVehicleBookingExtraRepository, ListVehicleBookingExtraParams, ListVehicleBookingExtraResult } from './vehicle-booking-extra.types.js';
import { vehicleBookingExtraTable } from './vehicle-booking-extra.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class VehicleBookingExtraRepository implements IVehicleBookingExtraRepository {

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
   * @description Find a single VehicleBookingExtra entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<VehicleBookingExtraEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleBookingExtraTable)
      .where(
        and(
          eq(vehicleBookingExtraTable.id, id),
          isNull(vehicleBookingExtraTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of VehicleBookingExtra entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListVehicleBookingExtraParams, hyperdrive?: Hyperdrive): Promise<ListVehicleBookingExtraResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(vehicleBookingExtraTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(vehicleBookingExtraTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleBookingExtraTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(vehicleBookingExtraTable.createdAt))
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
   * @description Insert a new VehicleBookingExtra entity into the database and return the created record
   */
  async create(data: NewVehicleBookingExtra, hyperdrive?: Hyperdrive): Promise<VehicleBookingExtraEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(vehicleBookingExtraTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert VehicleBookingExtra`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing VehicleBookingExtra entity and return the modified record
   */
  async update(data: UpdateVehicleBookingExtra, hyperdrive?: Hyperdrive): Promise<VehicleBookingExtraEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(vehicleBookingExtraTable)
      .set(updateData as never)
      .where(eq(vehicleBookingExtraTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a VehicleBookingExtra entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(vehicleBookingExtraTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(vehicleBookingExtraTable.id, id), isNull(vehicleBookingExtraTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
