import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { catchError, take, tap } from 'rxjs/operators';

import { CardStore } from '../stores/card.store';
import { ListStore } from '@shared/stores/list.store';
import { MUTATION_CREATE_CARD, MUTATION_UPDATE_CARD_POSITION } from '@shared/operations/card.mutation';
import { of } from 'rxjs';

import { User } from '@shared/models/users.model';
import { Card, UpdateCardDto, CreateCardDto, CardResponse, UpdateCardPositionDto } from '@shared/models/card.model';

import { Board } from '@shared/models/board.model';
import { TokenService } from './token.service';
import { checkToken } from '@interceptors/token.interceptor';
import { environment } from '@environments/environment';
import { Colors } from '../models/colors.model';
import { List, ListResponse } from '../models/list.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  apiUrl = environment.API_URL;
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apollo = inject(Apollo);
  private cardStore = inject(CardStore);
  private listStore = inject(ListStore);

  updateCardPosition(updateCardPosition: UpdateCardPositionDto) {
    console.log('updateCardPosition: ', updateCardPosition);
    return this.apollo.mutate<{ cardResponse: CardResponse }>({
      mutation: MUTATION_UPDATE_CARD_POSITION,
      variables: {
        CardPositionInput: {...updateCardPosition}
      },
      context: checkToken(),
    }).pipe(
      take(1),
      catchError(error => {
        console.error('Error creating card:', error);
        return of(null); // se puede devolver un valor predeterminado o manejar el error de alguna manera
      }),
      tap(res => {
        if (res && res.data) {
          //this.cardStore.setCards(res.data.createCard);
          //actualizar la lista
          const listId = updateCardPosition.listId;
          //const list = this.listStore.updateList(res.data.cardResponse, listId);
          console.log('card updated:', res);
        } else {
          console.error('Error creating card. Response:', res);
        }
    })
    ).subscribe();
  }

  createCard(createCardInput: CreateCardDto) {
    console.log('createCardInput: ', createCardInput);
    return this.apollo.mutate<{ createCard: CardResponse }>({
      mutation: MUTATION_CREATE_CARD,
      variables: {
        createCardInput: {...createCardInput}
      },
      context: checkToken(),
    }).pipe(
      take(1),
      catchError(error => {
        console.error('Error creating card:', error);
        return of(null); // se puede devolver un valor predeterminado o manejar el error de alguna manera
      }),
      tap(res => {
        if (res && res.data) {
          //this.cardStore.setCards(res.data.createCard);
          //actualizar la lista
          const listId = createCardInput.listId;
          const list = this.listStore.updateList(res.data.createCard, listId);
          console.log('card updated:', res);
          console.log('list updated:', list);
        } else {
          console.error('Error creating card. Response:', res);
        }
    })
    ).subscribe();
  }
}
