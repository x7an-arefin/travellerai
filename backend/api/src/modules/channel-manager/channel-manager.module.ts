import { Module } from 'honestjs';
import { ChannelManagerController } from './channel-manager.controller.js';
import { ChannelManagerService } from './channel-manager.service.js';

@Module({
  controllers: [ChannelManagerController],
  services: [ChannelManagerService],
})
export class ChannelManagerModule {}
