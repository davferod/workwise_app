import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { catchError, take, tap } from 'rxjs/operators';


import { BoardStore } from '@shared/stores/board.store';
import { ListStore } from '@shared/stores/list.store';
import { MUTATION_CREATE_BOARD } from '@shared/operations/board.mutation';
import { of } from 'rxjs';


import { Board } from '@shared/models/board.model';
import { TokenService } from './token.service';
import { checkToken } from '@interceptors/token.interceptor';
import { environment } from '@environments/environment';
import { Card } from '../models/card.model';
import { Colors } from '../models/colors.model';
import { List, ListResponse } from '../models/list.model';
import { BehaviorSubject } from 'rxjs';
import { QUERY_BOARD_BY_ID, QUERY_GET_BOARDS } from '../operations/board.query';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  apiUrl = environment.API_URL;
  bufferSpace = 65535;
  backgroundColor$ = new BehaviorSubject<Colors>('sky');

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apollo = inject(Apollo);
  private boardStore = inject(BoardStore);
  private listStore = inject(ListStore);

  constructor() { }


  getBoard(id: string) {
    console.log('getBoard', id)
    const backgroundColor = this.boardStore.findBoard(id);
    this.setBackgroundColor(backgroundColor)
    return this.apollo.watchQuery<{ findOneByBoard: ListResponse[] }>({
      query: QUERY_BOARD_BY_ID,
      variables: {
        boardId: id
      },
      context: checkToken(),
    }).valueChanges.pipe(
      take(1),
      catchError(error => {
        console.error('Error fetching lists:', error);
        return of(null);
      }),
      tap(res => {
        if (res && res.data && res.data.findOneByBoard) {
          console.log('Lists:', res.data.findOneByBoard);
          this.listStore.setLists(res.data.findOneByBoard);
        } else {
          console.log('Lists:', res?.data);
          console.error('Error fetching lists. Response:', res);
        }
      })
    ).subscribe()
  };

  // getBoardx(id: Board['id']) {
  //   return this.http.get<Board>(`${this.apiUrl}/api/v1/boards/${id}`, {
  //     context: checkToken()
  //   })
  //   .pipe(
  //     tap(board => this.setBackgroundColor(board.backgroundColor))
  //   );
  // }

  createBoard(createBoardInput: Board) {
    return this.apollo.mutate<{ board: Board }>({
      mutation: MUTATION_CREATE_BOARD,
      variables: {
        createBoardInput: {...createBoardInput}
      },
      context: checkToken(),
    }).pipe(
      take(1),
      catchError(error => {
        console.error('Error creating board:', error);
        return of(null); // Puedes devolver un valor predeterminado o manejar el error de alguna manera
      }),
      tap(res => {
        if (res && res.data) {
          this.boardStore.setBoard(res.data.board);
          console.log('Board updated:', res);
        } else {
          console.error('Error creating board. Response:', res);
        }
    })
    ).subscribe();
  }

  getAllBoards() {
    return this.apollo.watchQuery<{ boards: Board[] }>({
      query: QUERY_GET_BOARDS,
      context: checkToken(),
    }).valueChanges.pipe(
      take(1),
      catchError(error => {
        console.error('Error fetching boards:', error);
        return of(null); // Puedes devolver un valor predeterminado o manejar el error de alguna manera
      }),
      tap(res => {
        if (res && res.data && res.data.boards) {
          this.boardStore.setBoards(res.data.boards);
        } else {
          console.error('Error fetching boards. Response:', res);
        }
      })
    ).subscribe()
  };

  getPosition(cards: Card[], currentIndex: number) {
    if (cards.length === 1 ) {
      return this.bufferSpace;
    }
    if (cards.length > 1 && currentIndex === 0) {
      const onTopPosition = cards[currentIndex + 1].position;
      return onTopPosition / 2;
    }
    const lastIndex = cards.length - 1;
    if (cards.length > 2 && currentIndex > 0 && currentIndex < lastIndex) {
      const previousCardPosition = cards[currentIndex - 1].position;
      const nextCardPosition = cards[currentIndex + 1].position;
      return (previousCardPosition + nextCardPosition) / 2;
    }
    if (cards.length > 1 && currentIndex === lastIndex) {
      const onBottomPosition = cards[lastIndex - 1].position;
      return onBottomPosition + this.bufferSpace;
    }
    return 0;
  }

  getPositionNewItem(elements: Card[] | List[]) {
    if (elements.length === 0 ) {
      return this.bufferSpace;
    }
    const lastIndex = elements.length - 1
    const onBottomPosition = elements[lastIndex].position;
    return onBottomPosition + this.bufferSpace;
  }

  setBackgroundColor(color: Colors) {
    this.backgroundColor$.next(color);
  }

}
