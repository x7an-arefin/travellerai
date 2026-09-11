import { Controller, Post, Get, Patch, Delete, Body, Param, Query, Ctx, UseGuards } from 'honestjs';
import { z } from 'zod';
import type { Context } from 'hono';
import { BookingParticipantService } from './booking-participant.service.js';
import { AuthGuard } from '@core/guards/auth.guard.js';
import { Public } from '@core/decorators/public.decorator.js';

import { CreateBookingParticipantInputSchema } from './create/create-booking-participant.input.js';

import { GetBookingParticipantInputSchema } from './get/get-booking-participant.input.js';

import { ListBookingParticipantInputSchema } from './list/list-booking-participant.input.js';

import { UpdateBookingParticipantInputSchema } from './update/update-booking-participant.input.js';

import { DeleteBookingParticipantInputSchema } from './delete/delete-booking-participant.input.js';


/**
 * @author arefin
 * @description HTTP controller that maps BookingParticipant CRUD endpoints and delegates execution to BookingParticipantService
 */
@Controller('booking-participants')
export class BookingParticipantController {
  constructor(private readonly service: BookingParticipantService) {}



  /**
   * @author arefin
   * @description Handle POST /api/v1/booking-participants — validate input and delegate to create lifecycle
   */
  @UseGuards(AuthGuard)
  @Post('')
  async create(
    @Body() body: unknown,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = CreateBookingParticipantInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.create(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle GET /api/v1/booking-participants/:id — validate input and delegate to get lifecycle
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
   * @description Handle GET /api/v1/booking-participants — validate input and delegate to list lifecycle
   */
  @UseGuards(AuthGuard)
  @Get('')
  async list(
    @Query() query: Record<string, string>,
    @Ctx() c: Context,
  ): Promise<Response> {
    const inputResult = ListBookingParticipantInputSchema.safeParse(query);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.list(inputResult.data, c);
  }




  /**
   * @author arefin
   * @description Handle PATCH /api/v1/booking-participants/:id — validate input and delegate to update lifecycle
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
    const inputResult = UpdateBookingParticipantInputSchema.safeParse(body);
    if (!inputResult.success) {
      return c.json({ error: 'VALIDATION_ERROR', details: inputResult.error.flatten().fieldErrors }, 422);
    }
    return this.service.update({ ...inputResult.data, id }, c);
  }




  /**
   * @author arefin
   * @description Handle DELETE /api/v1/booking-participants/:id — validate input and delegate to delete lifecycle
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
