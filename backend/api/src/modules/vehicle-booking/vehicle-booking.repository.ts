import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { VehicleBookingEntity, NewVehicleBooking, UpdateVehicleBooking, IVehicleBookingRepository, ListVehicleBookingParams, ListVehicleBookingResult } from './vehicle-booking.types.js';
import { vehicleBookingTable } from './vehicle-booking.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class VehicleBookingRepository implements IVehicleBookingRepository {

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
   * @description Find a single VehicleBooking entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<VehicleBookingEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleBookingTable)
      .where(
        and(
          eq(vehicleBookingTable.id, id),
          isNull(vehicleBookingTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of VehicleBooking entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListVehicleBookingParams, hyperdrive?: Hyperdrive): Promise<ListVehicleBookingResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(vehicleBookingTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(vehicleBookingTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(vehicleBookingTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(vehicleBookingTable.createdAt))
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
   * @description Insert a new VehicleBooking entity into the database and return the created record
   */
  async create(data: NewVehicleBooking, hyperdrive?: Hyperdrive): Promise<VehicleBookingEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(vehicleBookingTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert VehicleBooking`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing VehicleBooking entity and return the modified record
   */
  async update(data: UpdateVehicleBooking, hyperdrive?: Hyperdrive): Promise<VehicleBookingEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(vehicleBookingTable)
      .set(updateData as never)
      .where(eq(vehicleBookingTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a VehicleBooking entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(vehicleBookingTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(vehicleBookingTable.id, id), isNull(vehicleBookingTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
