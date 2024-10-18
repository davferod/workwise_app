import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';

import { ButtonComponent } from '@domains/shared/components/button/button.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose, faCheckToSlot, faBars, faUser, faTag, faCheckSquare, faClock } from '@fortawesome/free-solid-svg-icons';
import { Card } from '@shared/models/card.model';

interface DialogData {
  card: Card;
}

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ButtonComponent],
  templateUrl: './todo-dialog.component.html'
})
export class TodoDialogComponent {
  //iconos
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faUser = faUser;
  faBars = faBars;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  card!: Card;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private data: DialogData
  ) {
    this.card = data.card;
  }

  close() {
   this.dialogRef.close();
  }

}
