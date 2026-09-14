import type { RoomTypeSelect, RoomTypeInsert } from './room-type.schema.js';

export type RoomTypeEntity = RoomTypeSelect;

export type NewRoomType = RoomTypeInsert;

export type UpdateRoomType = Partial<Omit<RoomTypeEntity, 'id'>> & {
  id: string;
};

export interface IRoomTypeRepository {
  findById(id: string): Promise<RoomTypeEntity | null>;
  findAll(params: ListRoomTypeParams): Promise<ListRoomTypeResult>;
  create(data: NewRoomType): Promise<RoomTypeEntity>;
  update(data: UpdateRoomType): Promise<RoomTypeEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListRoomTypeParams {
  cursor?: string;
  limit?: number;

}

export interface ListRoomTypeResult {
  items: RoomTypeEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
