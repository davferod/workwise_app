import { Injectable, computed, signal } from '@angular/core';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardStore {

  #board = signal<Board>({} as Board);
  boardData = computed(this.#board);
  boards = signal<Board[]>([{} as Board]);
  boardsData = computed(this.boards);
  originalData = signal<Board[]>([]);

  constructor() { }

  setBoards(boards: Board[]): void {
    this.boards.set(boards);
    //this.originalData.set(boards);
  }

  setBoard(board: Board): void {
    this.#board.set(board);
    console.log('setBoard', this.#board);
  }

  // findUser(query: string): void {
  //   const filteredBoards = this.originalData().filter((board) => {
  //     return board.title?.toLowerCase().includes(query.toLowerCase())
  //       || board.backgroundColor == query
  //   });
  //   this.boards.set(filteredBoards);
  // }

  findBoard(boardId: string) {
    //filtrar por id borad para retornar el color
    const board = this.boards().find((board) => board._id === boardId);
    return board?.backgroundColor || 'sky';
  }

  findBoardId(boardId: string) {
    //filtrar por id borad para retornar el color
    const board = this.boards().find((board) => board._id === boardId) || null;
    return board;
  }

  updateBoard(board: Board): void {
    console.log('updateBoard', board);
    this.#board.update((prevBoard) =>
      prevBoard ? { ...prevBoard, ...board }: prevBoard);
  }
}
