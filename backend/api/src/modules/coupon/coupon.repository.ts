import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { CouponEntity, NewCoupon, UpdateCoupon, ICouponRepository, ListCouponParams, ListCouponResult } from './coupon.types.js';
import { couponTable } from './coupon.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class CouponRepository implements ICouponRepository {

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
   * @description Find a single Coupon entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<CouponEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(couponTable)
      .where(
        and(
          eq(couponTable.id, id),
          isNull(couponTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of Coupon entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListCouponParams, hyperdrive?: Hyperdrive): Promise<ListCouponResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(couponTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(couponTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(couponTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(couponTable.createdAt))
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
   * @description Insert a new Coupon entity into the database and return the created record
   */
  async create(data: NewCoupon, hyperdrive?: Hyperdrive): Promise<CouponEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(couponTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert Coupon`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing Coupon entity and return the modified record
   */
  async update(data: UpdateCoupon, hyperdrive?: Hyperdrive): Promise<CouponEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(couponTable)
      .set(updateData as never)
      .where(eq(couponTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a Coupon entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(couponTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(couponTable.id, id), isNull(couponTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
