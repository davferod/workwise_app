import { Card } from './card.model';

export interface List {
  _id: string;
  title: string;
  position: number;
  cards: Card[];
  showCardForm?: boolean;
}

export interface CreateListDto {
  title: string;
  position: number;
  boardId: string;
}

export interface UpdateListDto {
  title?: string;
  position?: number;
  boardId?: string;
}

export interface ListResponse {
  _id: string;
  title: string;
  position: number;
  cards: Card[];
  showCardForm?: boolean;
}
