import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { catchError, take, tap } from 'rxjs/operators';

import { BoardStore } from '@shared/stores/board.store';
import { ListStore } from '@shared/stores/list.store';
import { MUTATION_CREATE_BOARD } from '@shared/operations/board.mutation';
import { of } from 'rxjs';

import { User } from '@shared/models/users.model';
import { Card, UpdateCardDto, CreateCardDto } from '@shared/models/card.model';

import { Board } from '@shared/models/board.model';
import { TokenService } from './token.service';
import { checkToken } from '@interceptors/token.interceptor';
import { environment } from '@environments/environment';
import { Colors } from '../models/colors.model';
import { List, ListResponse } from '../models/list.model';
import { BehaviorSubject } from 'rxjs';
import { QUERY_BOARD_BY_ID, QUERY_GET_BOARDS } from '../operations/board.query';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  apiUrl = environment.API_URL;
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apollo = inject(Apollo);
  private boardStore = inject(BoardStore);
  private listStore = inject(ListStore);


  updateCard(id: Card['id'], changes:UpdateCardDto) {
    return this.http.put<User>(`${this.apiUrl}/api/v1/cards/${id}`, changes, {
      context: checkToken(),
    });
  }

  createCard(createCardInput: Board) {
    return this.apollo.mutate<{ board: Board }>({
      mutation: MUTATION_CREATE_BOARD,
      variables: {
        createBoardInput: {...createCardInput}
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

}
