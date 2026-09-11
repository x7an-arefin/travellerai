import { Module } from 'honestjs';
import { BlogPostController } from './blog-post.controller.js';
import { BlogPostService } from './blog-post.service.js';
import { BlogPostRepository } from './blog-post.repository.js';

/**
 * @author arefin
 * @description Feature module that registers the BlogPost controller, service, and repository with the DI container
 */
@Module({
  controllers: [BlogPostController],
  services: [BlogPostService, BlogPostRepository],
})
export class BlogPostModule {}
