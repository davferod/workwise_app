import { Injectable, computed, signal } from '@angular/core';
import { ListResponse } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListStore {

  #list = signal<ListResponse>({} as ListResponse);
  listData = computed(this.#list);
  #lists = signal<ListResponse[]>([{} as ListResponse]);
  listsData = computed(this.#lists);
  listOriginalData = signal<ListResponse[]>([]);

  constructor() { }

  setLists(lists: ListResponse[]): void {
    this.#lists.set(lists);
    this.listOriginalData.set(lists);
  }

  setList(list: ListResponse): void {
    this.#list.set(list);
    console.log('setBoard', this.#list);
  }

  updateListShowCard(listId: string): void {
    const updatedLists = this.#lists().map((list) => ({
      ...list,
      showCardForm: list._id === listId,
    }));
    this.#lists.set(updatedLists);
  }

  updateList(board: ListResponse): void {
    console.log('updateBoard', board);
    this.#list.update((prevLoard) =>
      prevLoard ? { ...prevLoard, ...board }: prevLoard);
  }
}
