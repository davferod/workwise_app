import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '@environments/environment';
import { List, CreateListDto } from '@shared/models/list.model';
import { checkToken } from '@interceptors/token.interceptor';

import { Board } from '@shared/models/board.model';
import { TokenService } from './token.service';
import { Card } from '../models/card.model';
import { Colors } from '../models/colors.model';
import { BehaviorSubject } from 'rxjs';
import { QUERY_BOARD_BY_ID, QUERY_GET_BOARDS } from '../operations/board.query';
import { BoardStore } from '../stores/board.store';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  apiUrl = environment.API_URL;
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apollo = inject(Apollo);
  private boardStore = inject(BoardStore);
/* se obtienen las listas con el id de board*/



getBoard(id: Board['_id']) {
  return this.apollo.watchQuery<{ boards: Board[] }>({
    query: QUERY_BOARD_BY_ID,
    variables: {
      boardId: id
    },
    context: checkToken(),
  }).valueChanges.pipe(
    take(1),
    catchError(error => {
      console.error('Error fetching boards:', error);
      return of(null);
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

  createList(newList: CreateListDto) {
    return this.http.post<List>(`${this.apiUrl}/api/v1/lists`, newList, {
      context: checkToken(),
    });
  }

}
