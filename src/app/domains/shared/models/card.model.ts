
export interface Card {
  _id: string;
  title: string;
  description?: string;
  position: number;
  listId: string;
}

export interface CreateCardDto {
  title: string;
  position: number;
  listId: string;
}

export interface UpdateCardDto {
  title?: string;
  description?: string;
  position: number;
  listId: string;
  boardId?: string;
}

export interface UpdateCardPositionDto {
  _id: string;
  position: number;
  listId: string;
}

export interface CardResponse {
  _id: string;
  title: string;
  description?: string;
  position: number;
  listId: string;
}
