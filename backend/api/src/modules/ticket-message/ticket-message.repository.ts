import { Service } from 'honestjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import { eq, and, lt, desc, isNull } from 'drizzle-orm';
import type { TicketMessageEntity, NewTicketMessage, UpdateTicketMessage, ITicketMessageRepository, ListTicketMessageParams, ListTicketMessageResult } from './ticket-message.types.js';
import { ticketMessageTable } from './ticket-message.schema.js';
import { AppError } from '@core/errors/application-error.js';

@Service()
export class TicketMessageRepository implements ITicketMessageRepository {

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
   * @description Find a single TicketMessage entity by its unique identifier
   */
  async findById(id: string, hyperdrive?: Hyperdrive): Promise<TicketMessageEntity | null> {
    const rows = await this.getDb(hyperdrive)
      .select()
      .from(ticketMessageTable)
      .where(
        and(
          eq(ticketMessageTable.id, id),
          isNull(ticketMessageTable.deletedAt)
        )
      )
      .limit(1);
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Retrieve a paginated list of TicketMessage entities with cursor-based pagination on createdAt
   */
  async findAll(params: ListTicketMessageParams, hyperdrive?: Hyperdrive): Promise<ListTicketMessageResult> {
    const limit = Math.min(params.limit ?? 20, 100);
    const conditions = [];


    conditions.push(isNull(ticketMessageTable.deletedAt));

    if (params.cursor) {
      conditions.push(lt(ticketMessageTable.createdAt, new Date(params.cursor)));
    }

    const rows = await this.getDb(hyperdrive)
      .select()
      .from(ticketMessageTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(ticketMessageTable.createdAt))
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
   * @description Insert a new TicketMessage entity into the database and return the created record
   */
  async create(data: NewTicketMessage, hyperdrive?: Hyperdrive): Promise<TicketMessageEntity> {
    const rows = await this.getDb(hyperdrive)
      .insert(ticketMessageTable)
      .values(data as never)
      .returning();
    const row = rows[0];
    if (!row) throw new AppError('DB_INSERT_FAILED', `Failed to insert TicketMessage`, 500);
    return row;
  }

  /**
   * @author arefin
   * @description Update an existing TicketMessage entity and return the modified record
   */
  async update(data: UpdateTicketMessage, hyperdrive?: Hyperdrive): Promise<TicketMessageEntity | null> {
    const { id, ...rest } = data;
    const updateData = { ...rest, updatedAt: new Date() };
    const rows = await this.getDb(hyperdrive)
      .update(ticketMessageTable)
      .set(updateData as never)
      .where(eq(ticketMessageTable.id, id))
      .returning();
    return rows[0] ?? null;
  }

  /**
   * @author arefin
   * @description Soft-delete a TicketMessage entity by setting deletedAt timestamp
   */
  async delete(id: string, hyperdrive?: Hyperdrive): Promise<boolean> {

    const rows = await this.getDb(hyperdrive)
      .update(ticketMessageTable)
      .set({ deletedAt: new Date() } as never)
      .where(and(eq(ticketMessageTable.id, id), isNull(ticketMessageTable.deletedAt)))
      .returning();

    return rows.length > 0;
  }
}
