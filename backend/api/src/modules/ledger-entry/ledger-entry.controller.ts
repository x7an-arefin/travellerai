import { Controller, Post, Get, Patch, Delete, Body, Param, Query, Ctx, UseGuards } from 'honestjs';
import { z } from 'zod';
import type { Context } from 'hono';
import { LedgerEntryService } from './ledger-entry.service.js';
import { AuthGuard } from '@core/guards/auth.guard.js';
import { Public } from '@core/decorators/public.decorator.js';

import { CreateLedgerEntryInputSchema } from './create/create-ledger-entry.input.js';

import { GetLedgerEntryInputSchema } from './get/get-ledger-entry.input.js';

import { ListLedgerEntryInputSchema } from './list/list-ledger-entry.input.js';


/**
 * @author arefin
 * @description HTTP controller that maps LedgerEntry CRUD endpoints and delegates execution to LedgerEntryService
 */
@Controller('ledger-entries')
export class LedgerEntryController {
  constructor(private readonly service: LedgerEntryService) {}



  /**
   * @author arefin
   * @description Handle POST /api/v1/ledger-entries — validate input and delegate to create lifecycle
   */
  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() body: unknown,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = CreateLedgerEntryInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.create(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle GET /api/v1/ledger-entries/:id — validate input and delegate to get lifecycle
   */
  @UseGuards(AuthGuard)
  @Get('/:id')
  async get(
    @Param('id') id: string,
    @Ctx() c: Context,
  ): Promise<Response> {
    const uuidResult = z.string().uuid().safeParse(id);
    if (!uuidResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', message: 'Invalid ID format — expected a UUID' }, 400);
    }
    return this.service.get({ id }, c);
  }




  /**
   * @author arefin
   * @description Handle GET /api/v1/ledger-entries — validate input and delegate to list lifecycle
   */
  @UseGuards(AuthGuard)
  @Get('')
  async list(
    @Query() query: Record<string, string>,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = ListLedgerEntryInputSchema.safeParse(query);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.list(inputResult.data, c);
  }


}
