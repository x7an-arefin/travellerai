import type { RoomUnitSelect, RoomUnitInsert } from './room-unit.schema.js';

export type RoomUnitEntity = RoomUnitSelect;

export type NewRoomUnit = RoomUnitInsert;

export type UpdateRoomUnit = Partial<Omit<RoomUnitEntity, 'id'>> & {
  id: string;
};

export interface IRoomUnitRepository {
  findById(id: string): Promise<RoomUnitEntity | null>;
  findAll(params: ListRoomUnitParams): Promise<ListRoomUnitResult>;
  create(data: NewRoomUnit): Promise<RoomUnitEntity>;
  update(data: UpdateRoomUnit): Promise<RoomUnitEntity | null>;
  delete(id: string): Promise<boolean>;
}

export interface ListRoomUnitParams {
  cursor?: string;
  limit?: number;

}

export interface ListRoomUnitResult {
  items: RoomUnitEntity[];
  nextCursor: string | null;
  hasMore: boolean;
}
