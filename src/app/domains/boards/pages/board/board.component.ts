import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '@shared/components/navbar/navbar.component'
import { ButtonComponent } from '@domains/shared/components/button/button.component';
import { TodoDialogComponent } from '@shared/components/todo-dialog/todo-dialog.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Dialog, DialogModule} from '@angular/cdk/dialog';
import { BoardsService } from '@shared/services/boards.service';
import { CardsService } from '@shared/services/cards.service';
import { ListsService } from '@shared/services/lists.service';
import { Board } from '@app/domains/shared/models/board.model';
import { Card } from '@app/domains/shared/models/card.model';
import { List } from '@app/domains/shared/models/list.model';
import { BACKGROUNDS } from '@shared/models/colors.model';
import { ListStore } from '@app/domains/shared/stores/list.store';
import { BoardStore } from '@app/domains/shared/stores/board.store';
import { CardStore } from '@app/domains/shared/stores/card.store';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDropListGroup, CdkDropList, CdkDrag, ReactiveFormsModule, ButtonComponent, DialogModule],
  templateUrl: './board.component.html',
  styles: [
    `
    /* Animate items as they're being sorted. */
    .cdk-drop-list-dragging .cdk-drag {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* Animate an item that has been dropped. */
    .cdk-drag-animating {
      transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
    `
  ],
})
export class BoardComponent implements OnInit, OnDestroy {

  board: Board | null = null;
  inputCard = new FormControl<string>('',{
    nonNullable: true,
    validators: [Validators.required]
    });
  inputList = new FormControl<string>('',{
    nonNullable: true,
    validators: [Validators.required]
    });
  showListForm = false;
  backgrounds = BACKGROUNDS;

  private listStore = inject(ListStore);
  listsData = this.listStore.listsData;
  private boardStore = inject(BoardStore);
  boardData = this.boardStore.findBoardId;
  private cardStore = inject(CardStore);
  cardData = this.cardStore.CardsData;
  cardsData = this.cardStore.CardsData;
  constructor(
    private dialog: Dialog,
    private route: ActivatedRoute,
    private boardsService : BoardsService,
    private cardsService : CardsService,
    private listsService : ListsService,
  ) {}
/* esto falta => obtener id de board para luego hacer la busqueda de las listas  */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getBoard(id);
      }
    });
  }
/* obtener listas desde servicio de lists y las tareas  */
  ngOnDestroy(): void {
    this.boardsService.setBackgroundColor('sky');
  }

  drop(event: CdkDragDrop<Card[]>) {
    const currentListId = event.container.id;
    const previousListId = event.previousContainer.id;
    let card = event.previousContainer.data[event.previousIndex];
    // Obtener nueva posición basada en la lógica de boardsService
    const updatedArray = [...event.container.data];
    const previousArray = [...event.previousContainer.data];
    const newPosition = this.boardsService.getPosition(event.container.data, event.currentIndex);
    if (event.previousContainer === event.container) {
      // Si la tarjeta se mueve dentro de la misma lista
      const updatedArray = [...event.container.data];
      moveItemInArray(
        updatedArray,
        event.previousIndex,
        event.currentIndex,
      );
      event.container.data = updatedArray;
      this.listStore.updateListCards(currentListId, updatedArray);
    } else {
      transferArrayItem(
        previousArray,
        updatedArray,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('updatedArray: ', updatedArray);
      console.log('previousArray: ', previousArray);
      event.container.data = updatedArray;
      event.previousContainer.data = previousArray;
      this.listStore.moveCardToAnotherList(previousListId, currentListId, updatedArray, previousArray);
    }
    card = { ...card, position: newPosition, listId: currentListId };
    this.listStore.updateCardPosition(currentListId, card);
    this.cardsService.updateCardPosition(card);
  }


  dropHorizontal(event: CdkDragDrop<List[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    const destinationList = event.container;
    console.log('previous: ', event.previousIndex ,'current: ', event.currentIndex);
  }

  addList() {
    const title = this.inputList.value
    if(this.board){
      const position = this.boardsService.getPositionNewItem(this.board.lists);
      console.log('position: ', position);
      const boardId = this.board._id
      const list = { title, boardId, position };
      this.listsService.createList(list)
      .subscribe(list => {
        this.board?.lists.push({
          ...list,
          cards: [],
          showCardForm: false,
        });
        this.showListForm = false;
        this.inputList.setValue('');
      })
    }

  }

  openTask(card: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: card
      }
    });
    dialogRef.closed.subscribe(result => {
      if (result) {
        console.log('dialog closed: ', result);
      }
    });
  }

  private getBoard(id: string) {
    this.boardsService.getBoard(id)
    if (this.boardStore.findBoardId(id)) {
      this.board = this.boardStore.findBoardId(id);
    }
  }

  private updateCardPosition(_id: string, position: number, listId: string) {
    this.cardsService.updateCardPosition({_id, position, listId })
  }

  openFormCard(list: List) {
    console.log('list: ', list , this.listsData());
    if (this.listsData()) {
      this.listStore.updateListShowCard(list._id);
    }
  }

  createCard(list: List) {
    const title = this.inputCard.value;
    console.log(this.board, title)
    if (this.board && title) {
      const listId = list._id;
      //const position = 1
      const position = this.boardsService.getPositionNewItem(list.cards);
      const card = { title, listId, position };
      console.log('card-value: ', card);
      this.cardsService.createCard(card);
      //this.getBoard(this.board._id);
      list.showCardForm = false
    }
  }

  closeFormCard(list: List) {
    list.showCardForm = false;
  }

  get colors(){
    if (this.board) {
     const clases = this.backgrounds[this.board.backgroundColor];
     return clases ? clases : {};
    }
    return {};
  }
}
