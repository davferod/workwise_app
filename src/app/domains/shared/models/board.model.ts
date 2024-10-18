import { Card } from './card.model';
import { List } from './list.model';
import { User } from './users.model';
import { Colors } from '@shared/models/colors.model';

export interface Board {
  _id: string;
  title: string;
  backgroundColor: Colors;
  members: User[];
  lists: List[];
  cards: Card[];
}

