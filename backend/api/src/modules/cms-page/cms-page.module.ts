import { Module } from 'honestjs';
import { CmsPageController } from './cms-page.controller.js';
import { CmsPageService } from './cms-page.service.js';
import { CmsPageRepository } from './cms-page.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the CmsPage controller, service, and repository with the DI container
 */
@Module({
  controllers: [CmsPageController],
  services: [CmsPageService, CmsPageRepository],
})
export class CmsPageModule {}
