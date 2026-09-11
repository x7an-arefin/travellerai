import { Controller, Post, Get, Patch, Delete, Body, Param, Query, Ctx, UseGuards } from 'honestjs';
import { z } from 'zod';
import type { Context } from 'hono';
import { ItineraryItemService } from './itinerary-item.service.js';
import { AuthGuard } from '@core/guards/auth.guard.js';
import { Public } from '@core/decorators/public.decorator.js';

import { CreateItineraryItemInputSchema } from './create/create-itinerary-item.input.js';

import { GetItineraryItemInputSchema } from './get/get-itinerary-item.input.js';

import { ListItineraryItemInputSchema } from './list/list-itinerary-item.input.js';

import { UpdateItineraryItemInputSchema } from './update/update-itinerary-item.input.js';

import { DeleteItineraryItemInputSchema } from './delete/delete-itinerary-item.input.js';


/**
 * @author arefin
 * @description HTTP controller that maps ItineraryItem CRUD endpoints and delegates execution to ItineraryItemService
 */
@Controller('itinerary-items')
export class ItineraryItemController {
  constructor(private readonly service: ItineraryItemService) {}



  /**
   * @author arefin
   * @description Handle POST /api/v1/itinerary-items — validate input and delegate to create lifecycle
   */
  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() body: unknown,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = CreateItineraryItemInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.create(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle GET /api/v1/itinerary-items/:id — validate input and delegate to get lifecycle
   */
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
   * @description Handle GET /api/v1/itinerary-items — validate input and delegate to list lifecycle
   */
  @Get('')
  async list(
    @Query() query: Record<string, string>,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = ListItineraryItemInputSchema.safeParse(query);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.list(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle PATCH /api/v1/itinerary-items/:id — validate input and delegate to update lifecycle
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
    const inputResult = UpdateItineraryItemInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.update({ ...inputResult.data, id }, c);
  }




  /**
   * @author arefin
   * @description Handle DELETE /api/v1/itinerary-items/:id — validate input and delegate to delete lifecycle
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
