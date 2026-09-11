import { Module } from 'honestjs';
import { CategoryController } from './category.controller.js';
import { CategoryService } from './category.service.js';
import { CategoryRepository } from './category.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the Category controller, service, and repository with the DI container
 */
@Module({
  controllers: [CategoryController],
  services: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
