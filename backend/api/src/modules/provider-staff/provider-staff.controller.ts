import { Controller, Post, Get, Patch, Delete, Body, Param, Query, Ctx, UseGuards } from 'honestjs';
import { z } from 'zod';
import type { Context } from 'hono';
import { ProviderStaffService } from './provider-staff.service.js';
import { AuthGuard } from '@core/guards/auth.guard.js';
import { Public } from '@core/decorators/public.decorator.js';

import { CreateProviderStaffInputSchema } from './create/create-provider-staff.input.js';

import { GetProviderStaffInputSchema } from './get/get-provider-staff.input.js';

import { ListProviderStaffInputSchema } from './list/list-provider-staff.input.js';

import { UpdateProviderStaffInputSchema } from './update/update-provider-staff.input.js';

import { DeleteProviderStaffInputSchema } from './delete/delete-provider-staff.input.js';


/**
 * @author arefin
 * @description HTTP controller that maps ProviderStaff CRUD endpoints and delegates execution to ProviderStaffService
 */
@Controller('provider-staffs')
export class ProviderStaffController {
  constructor(private readonly service: ProviderStaffService) {}



  /**
   * @author arefin
   * @description Handle POST /api/v1/provider-staffs — validate input and delegate to create lifecycle
   */
  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() body: unknown,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = CreateProviderStaffInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.create(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle GET /api/v1/provider-staffs/:id — validate input and delegate to get lifecycle
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
   * @description Handle GET /api/v1/provider-staffs — validate input and delegate to list lifecycle
   */
  @UseGuards(AuthGuard)
  @Get('')
  async list(
    @Query() query: Record<string, string>,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = ListProviderStaffInputSchema.safeParse(query);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.list(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle PATCH /api/v1/provider-staffs/:id — validate input and delegate to update lifecycle
   */
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Body() body: unknown,
    @Param('id') id: string,
    @Ctx() c: Context,
  ): Promise<Response> {
    const uuidResult = z.string().uuid().safeParse(id);
    if (!uuidResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', message: 'Invalid ID format — expected a UUID' }, 400);
    }
    const inputResult = UpdateProviderStaffInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.update({ ...inputResult.data, id }, c);
  }




  /**
   * @author arefin
   * @description Handle DELETE /api/v1/provider-staffs/:id — validate input and delegate to delete lifecycle
   */
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Ctx() c: Context,
  ): Promise<Response> {
    const uuidResult = z.string().uuid().safeParse(id);
    if (!uuidResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', message: 'Invalid ID format — expected a UUID' }, 400);
    }
    return this.service.delete({ id }, c);
  }


}
