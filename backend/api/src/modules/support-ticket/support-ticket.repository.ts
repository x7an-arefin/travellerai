import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { SupportTicketEntity, NewSupportTicket, UpdateSupportTicket, ISupportTicketRepository, ListSupportTicketParams, ListSupportTicketResult } from './support-ticket.types.js';
import { supportTicketTable } from './support-ticket.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class SupportTicketRepository implements ISupportTicketRepository {

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
   * @description Find a single SupportTicket entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<SupportTicketEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(supportTicketTable)
      .where(
        and(
          eq(supportTicketTable.id, id),
          isNull(supportTicketTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of SupportTicket entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListSupportTicketParams, hyperdrive?: Hyperdrive): Promise<ListSupportTicketResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(supportTicketTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(supportTicketTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(supportTicketTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(supportTicketTable.createdAt))
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
   * @description Insert a new SupportTicket entity into the database and return the created record
   */
  async create(data: NewSupportTicket, hyperdrive?: Hyperdrive): Promise<SupportTicketEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(supportTicketTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert SupportTicket`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing SupportTicket entity and return the modified record
   */
  async update(data: UpdateSupportTicket, hyperdrive?: Hyperdrive): Promise<SupportTicketEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(supportTicketTable)
      .set(updateData as never)
      .where(eq(supportTicketTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a SupportTicket entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(supportTicketTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(supportTicketTable.id, id), isNull(supportTicketTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
