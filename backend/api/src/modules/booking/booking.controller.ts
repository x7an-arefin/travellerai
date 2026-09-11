import { Controller, Post, Get, Patch, Delete, Body, Param, Query, Ctx, UseGuards } from 'honestjs';
import { z } from 'zod';
import type { Context } from 'hono';
import { BookingService } from './booking.service.js';
import { AuthGuard } from '@core/guards/auth.guard.js';
import { Public } from '@core/decorators/public.decorator.js';

import { CreateBookingInputSchema } from './create/create-booking.input.js';

import { GetBookingInputSchema } from './get/get-booking.input.js';

import { ListBookingInputSchema } from './list/list-booking.input.js';

import { UpdateBookingInputSchema } from './update/update-booking.input.js';

import { DeleteBookingInputSchema } from './delete/delete-booking.input.js';


/**
 * @author arefin
 * @description HTTP controller that maps Booking CRUD endpoints and delegates execution to BookingService
 */
@Controller('bookings')
export class BookingController {
  constructor(private readonly service: BookingService) {}



  /**
   * @author arefin
   * @description Handle POST /api/v1/bookings — validate input and delegate to create lifecycle
   */
  @Post('')
  async create(
    @Body() body: unknown,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = CreateBookingInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.create(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle GET /api/v1/bookings/:id — validate input and delegate to get lifecycle
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
   * @description Handle GET /api/v1/bookings — validate input and delegate to list lifecycle
   */
  @UseGuards(AuthGuard)
  @Get('')
  async list(
    @Query() query: Record<string, string>,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = ListBookingInputSchema.safeParse(query);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.list(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle PATCH /api/v1/bookings/:id — validate input and delegate to update lifecycle
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
    const inputResult = UpdateBookingInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.update({ ...inputResult.data, id }, c);
  }




  /**
   * @author arefin
   * @description Handle DELETE /api/v1/bookings/:id — validate input and delegate to delete lifecycle
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
