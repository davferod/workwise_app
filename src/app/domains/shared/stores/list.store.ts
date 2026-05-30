import { Injectable, computed, inject, signal } from '@angular/core';
import { ListResponse } from '../models/list.model';
import { Card, UpdateCardDto, CreateCardDto, CardResponse } from '@shared/models/card.model';
import { CardStore } from './card.store';
@Injectable({
  providedIn: 'root'
})
export class ListStore {

  #list = signal<ListResponse>({} as ListResponse);
  listData = computed(this.#list);
  #lists = signal<ListResponse[]>([{} as ListResponse]);
  listsData = computed(this.#lists);
  listOriginalData = signal<ListResponse[]>([]);
  private cardStore = inject(CardStore);
  cardsData = this.cardStore.CardsData;

  constructor() { }

  setLists(lists: ListResponse[]): void {
    this.#lists.set(lists);
    this.listOriginalData.set(lists);
  }

  setList(list: ListResponse): void {
    this.#list.set(list);
    console.log('setList', this.#list);
  }

  updateListShowCard(listId: string): void {
    const updatedLists = this.#lists().map((list) => ({
      ...list,
      showCardForm: list._id === listId,
    }));
    this.#lists.set(updatedLists);
  }

  // Actualiza la lista con los datos de la lista annadiendo las nuevas cards
  updateList(card: Card, listid: string): void {
    console.log('card', card);
    const updatedLists = this.#lists().map((list) => {
      if (list._id === listid) {
        return {
          ...list,
          cards: [...list.cards, card]
        };
      }
      return list;
    });
    console.log('updatedLists', updatedLists);
    this.setLists(updatedLists);
  }

  // Actualizar la posición de una tarjeta dentro de la misma lista
  updateCardPosition(listId: string, updatedCard: Card): void {
    const updatedLists = this.#lists().map((list) => {
      if (list._id === listId) {
        const updatedCards = list.cards.map((card) =>
          card._id === updatedCard._id ? updatedCard : card
        );
        return { ...list, cards: updatedCards };
      }
      return list;
    });
    this.#lists.set(updatedLists);
  }

  // Eliminar una tarjeta de una lista específica
  removeCardFromList(listId: string, cardId: string): void {
    const updatedLists = this.#lists().map((list) => {
      if (list._id === listId) {
        return {
          ...list,
          cards: list.cards.filter((card) => card._id !== cardId),
        };
      }
      return list;
    });
    this.#lists.set(updatedLists);
  }

    // Agregar una tarjeta a una lista específica
  addCardToList(listId: string, card: Card): void {
    const updatedLists = this.#lists().map((list) => {
      if (list._id === listId) {
        return {
          ...list,
          cards: [...list.cards, card],
        };
      }
      return list;
    });
    this.#lists.set(updatedLists);
  }

  moveCardToAnotherList(previousListId: string, currentListId: string, updatedArray: CardResponse[], previousList: CardResponse[]): void {
    // TODO: Implementar
    this.#lists.update(lists => {
      return lists.map(list =>
        list._id === previousListId
          ? { ...list, cards: previousList}
          : list
      );
    });
    this.#lists.update(lists => {
      return lists.map(list =>
        list._id === currentListId
          ? { ...list, cards: updatedArray }
          : list
      );
    });
  }

  updateListCards(listId: string, cards: CardResponse[]): void {
    this.#lists.update(lists => {
      return lists.map(list =>
        list._id === listId ? { ...list, cards: cards } : list
      );
    });
  }

}
