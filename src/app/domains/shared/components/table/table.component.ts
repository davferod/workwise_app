import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { ProfileStore } from '@shared/stores/profile.store';
import { ButtonComponent } from '@domains/shared/components/button/button.component';
import { debounceTime } from 'rxjs';
import { Accion } from '../../models/tabla-columna';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CdkTableModule, ButtonComponent],
  templateUrl: './table.component.html'
})
export class TableComponent {
  private profileStore = inject(ProfileStore);
  displayedColumns: string[] = [];
  displayedFields: string[] = [];
  displayedTitle: string = '';
  dataSource: any[] = [];
  input = new FormControl('', { nonNullable: true });

  profiles =  this.profileStore.profiles;
  originalData = this.profileStore.originalData;

  @Input() set title(title: string) {
    this.displayedTitle = title;
  }

  @Input() set data(value: any) {
    this.dataSource = value();
  }

  @Input() set columns(columns: string[]) {
    this.displayedColumns = columns;
  }

  @Input() set fields(columns: string[]) {
    this.displayedFields = columns;
  }

  @Output() action: EventEmitter<Accion> = new EventEmitter();


  ngOnInit(): void {
    console.log('data', this.dataSource);
    this.input.valueChanges
    .pipe(debounceTime(300))
    .subscribe((value) => {
      this.findProduct(value);
    });
  }

  editItem(product: any): void {
    console.log('update', product);
  }

  findProduct(query: string): void {
    this.profileStore.findProfile(query);
  }

  onAction(accion: string, row?: any) {
    this.action.emit({ accion: accion, fila: row });
  }

}
