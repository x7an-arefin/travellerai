import type { LifecycleContext } from '@core/lifecycle/lifecycle-context.js';
import type { LifecycleResult } from '@core/lifecycle/lifecycle-result.js';
import { BlogPostRepository } from '@modules/blog-post/blog-post.repository.js';
import { AppError } from '@core/errors/application-error.js';


/**
 * @author arefin
 * @description PROCESS lifecycle handler for CREATE BlogPost — executes the core business operation via the repository
 */
export async function process(ctx: LifecycleContext): Promise<LifecycleResult> {
  const repo = new BlogPostRepository();

  const blogPost = await repo.create(ctx.input as any);

  return { output: blogPost, entityId: blogPost.id };

}
