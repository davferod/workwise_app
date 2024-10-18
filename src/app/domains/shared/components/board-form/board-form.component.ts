import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BoardsService } from '@shared/services/boards.service';
import { Colors} from '@shared/models/colors.model';
import { Route, Router } from '@angular/router';
import { BoardStore } from '@shared/stores/board.store';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './board-form.component.html'
})
export class BoardFormComponent {
  private fb = inject(FormBuilder);
  private boardStore = inject(BoardStore);

  @Output() closeOverlay = new EventEmitter<boolean>();

  boardForm: FormGroup = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  constructor (
    private boardService: BoardsService,
    private router: Router
    ) {

  }

  doSave () {
    if (this.boardForm.valid) {
      // Obtiene los valores del formulario
      const boardFormData = this.boardForm.value;
      console.log(boardFormData)
          // Crea un nuevo objeto con la fecha de nacimiento formateada
      const createdBoardData = {
        ...boardFormData,
        description: 'creacion de board'
      };
      this.boardStore.updateBoard(createdBoardData)
      this.boardService.createBoard(createdBoardData)
    // Obtiene los valores del formulario
      const profileFormData = this.boardForm.value;
      this.closeOverlay.next(false)
      console.log(createdBoardData)
     // this.router.navigate(['/app/boards', profileFormData.id])
    } else {
      this.boardForm.markAllAsTouched();
    }
  }

}
