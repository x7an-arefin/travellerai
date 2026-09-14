import { Controller, Post, Get, Body, Param, Ctx } from 'honestjs';
import type { Context } from 'hono';
import { ChannelManagerService, IcalImportInput, FlightRadarWebhookInput } from './channel-manager.service.js';

@Controller('channel-manager')
export class ChannelManagerController {
  constructor(private readonly service: ChannelManagerService) {}

  /**
   * @author arefin
   * @description GET /api/v1/channel-manager/ical/room/:roomTypeId — Export iCal availability for OTAs
   */
  @Get('ical/room/:roomTypeId')
  exportRoomIcal(
    @Param('roomTypeId') roomTypeId: string,
    @Ctx() c: Context,
  ): Response {
    return this.service.exportRoomTypeIcal(roomTypeId, c);
  }

  /**
   * @author arefin
   * @description GET /api/v1/channel-manager/ical/vehicle/:vehicleId — Export iCal availability for vehicle rental
   */
  @Get('ical/vehicle/:vehicleId')
  exportVehicleIcal(
    @Param('vehicleId') vehicleId: string,
    @Ctx() c: Context,
  ): Response {
    return this.service.exportVehicleIcal(vehicleId, c);
  }

  /**
   * @author arefin
   * @description POST /api/v1/channel-manager/ical/import — Inbound iCal sync from Airbnb, Booking.com, VRBO
   */
  @Post('ical/import')
  async importIcal(
    @Body() body: IcalImportInput,
    @Ctx() c: Context,
  ): Promise<Response> {
    return this.service.importExternalIcal(body, c);
  }

  /**
   * @author arefin
   * @description POST /api/v1/channel-manager/flight-tracker/webhook — Webhook for FlightAware / AviationStack
   */
  @Post('flight-tracker/webhook')
  async flightWebhook(
    @Body() body: FlightRadarWebhookInput,
    @Ctx() c: Context,
  ): Promise<Response> {
    return this.service.handleFlightRadarWebhook(body, c);
  }
}
