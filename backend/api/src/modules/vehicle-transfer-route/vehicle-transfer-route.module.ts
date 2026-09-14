import { Module } from 'honestjs';
import { VehicleTransferRouteController } from './vehicle-transfer-route.controller.js';
import { VehicleTransferRouteService } from './vehicle-transfer-route.service.js';
import { VehicleTransferRouteRepository } from './vehicle-transfer-route.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the VehicleTransferRoute controller, service, and repository with the DI container
 */
@Module({
  controllers: [VehicleTransferRouteController],
  services: [VehicleTransferRouteService, VehicleTransferRouteRepository],
})
export class VehicleTransferRouteModule {}
