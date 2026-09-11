import { Controller, Post, Get, Patch, Delete, Body, Param, Query, Ctx, UseGuards } from 'honestjs';
import { z } from 'zod';
import type { Context } from 'hono';
import { TripInquiryService } from './trip-inquiry.service.js';
import { AuthGuard } from '@core/guards/auth.guard.js';
import { Public } from '@core/decorators/public.decorator.js';

import { CreateTripInquiryInputSchema } from './create/create-trip-inquiry.input.js';

import { GetTripInquiryInputSchema } from './get/get-trip-inquiry.input.js';

import { ListTripInquiryInputSchema } from './list/list-trip-inquiry.input.js';

import { UpdateTripInquiryInputSchema } from './update/update-trip-inquiry.input.js';

import { DeleteTripInquiryInputSchema } from './delete/delete-trip-inquiry.input.js';


/**
 * @author arefin
 * @description HTTP controller that maps TripInquiry CRUD endpoints and delegates execution to TripInquiryService
 */
@Controller('trip-inquiries')
export class TripInquiryController {
  constructor(private readonly service: TripInquiryService) {}



  /**
   * @author arefin
   * @description Handle POST /api/v1/trip-inquiries — validate input and delegate to create lifecycle
   */
  @Post('')
  async create(
    @Body() body: unknown,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = CreateTripInquiryInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.create(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle GET /api/v1/trip-inquiries/:id — validate input and delegate to get lifecycle
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
   * @description Handle GET /api/v1/trip-inquiries — validate input and delegate to list lifecycle
   */
  @UseGuards(AuthGuard)
  @Get('')
  async list(
    @Query() query: Record<string, string>,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = ListTripInquiryInputSchema.safeParse(query);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.list(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle PATCH /api/v1/trip-inquiries/:id — validate input and delegate to update lifecycle
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
    const inputResult = UpdateTripInquiryInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.update({ ...inputResult.data, id }, c);
  }




  /**
   * @author arefin
   * @description Handle DELETE /api/v1/trip-inquiries/:id — validate input and delegate to delete lifecycle
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
