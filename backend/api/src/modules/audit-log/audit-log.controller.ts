import { Controller, Post, Get, Patch, Delete, Body, Param, Query, Ctx, UseGuards } from 'honestjs';
import { z } from 'zod';
import type { Context } from 'hono';
import { AuditLogService } from './audit-log.service.js';
import { AuthGuard } from '@core/guards/auth.guard.js';
import { Public } from '@core/decorators/public.decorator.js';

import { CreateAuditLogInputSchema } from './create/create-audit-log.input.js';

import { GetAuditLogInputSchema } from './get/get-audit-log.input.js';

import { ListAuditLogInputSchema } from './list/list-audit-log.input.js';


/**
 * @author arefin
 * @description HTTP controller that maps AuditLog CRUD endpoints and delegates execution to AuditLogService
 */
@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly service: AuditLogService) {}



  /**
   * @author arefin
   * @description Handle POST /api/v1/audit-logs — validate input and delegate to create lifecycle
   */
  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() body: unknown,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = CreateAuditLogInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.create(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle GET /api/v1/audit-logs/:id — validate input and delegate to get lifecycle
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
   * @description Handle GET /api/v1/audit-logs — validate input and delegate to list lifecycle
   */
  @UseGuards(AuthGuard)
  @Get('')
  async list(
    @Query() query: Record<string, string>,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = ListAuditLogInputSchema.safeParse(query);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.list(inputResult.data, c);
  }


}
