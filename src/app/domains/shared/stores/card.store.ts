import { Injectable, computed, inject, signal } from '@angular/core';
import { CardResponse } from '../models/card.model';
import { ListStore } from '@app/domains/shared/stores/list.store';
import {
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class CardStore {

  #Card = signal<CardResponse>({} as CardResponse);
  CardData = computed(this.#Card);
  #Cards = signal<CardResponse[]>([{} as CardResponse]);
  CardsData = computed(this.#Cards);
  CardOriginalData = signal<CardResponse[]>([]);

  constructor() { }

  setCards(Cards: CardResponse[]): void {
    this.#Cards.set(Cards);
    this.CardOriginalData.set(Cards);
    console.log('setCards', this.#Cards());
  }

  setCard(Card: CardResponse): void {
    this.#Card.set(Card);
  }

  updateCardShowCard(CardId: string): void {
    const updatedCards = this.#Cards().map((Card) => ({
      ...Card,
      showCardForm: Card._id === CardId,
    }));
    this.#Cards.set(updatedCards);
  }

  reorder(listId: string, prevIndex: number, curIndex: number): void {

  }

  updateCardPosition(cardId: string, newPosition: number): void {
    this.#Cards.update(cards =>
      cards.map(card =>
        card._id === cardId ? { ...card, position: newPosition } : card
      )
    );
    console.log('updateCardPosition', this.CardsData(), cardId, newPosition);
  }

}
