import type { CmsPageSelect, CmsPageInsert } from './cms-page.schema.js';

export type CmsPageEntity = CmsPageSelect;

export type NewCmsPage = CmsPageInsert;

export type UpdateCmsPage = Partial<Omit<CmsPageEntity, 'id'>> & {
  id: string;
};

export interface ICmsPageRepository {
  findById(id: string): Promise<CmsPageEntity | null>;
  findAll(params: ListCmsPageParams): Promise<ListCmsPageResult>;
  create(data: NewCmsPage): Promise<CmsPageEntity>;
  update(data: UpdateCmsPage): Promise<CmsPageEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListCmsPageParams {
  cursor?: string;
  limit?: number;
  templateType?: string;
  status?: string;
  language?: string;

}

export interface ListCmsPageResult {
  items: CmsPageEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
