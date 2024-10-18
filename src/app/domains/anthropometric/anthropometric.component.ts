import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '@domains/shared/components/button/button.component';
import { AnthropometricService } from '@services/anthropometric.service';
import { AnthropometricFormComponent } from '@domains/anthropometric/anthropometric_form/anthropometric-form.component';
import { AnthropometricStore } from '@stores/anthropometric.store';
import { TableComponent } from '@shared/components/table/table.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { Accion } from '@shared/models/tabla-columna';
import { Anthropometric } from '@shared/models/anthropometric.model';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-anthropometric',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TableComponent, ButtonComponent, AnthropometricFormComponent],
  templateUrl: './anthropometric.component.html'
})
export class AnthropometricComponent implements OnInit{
  anthropometricService = inject(AnthropometricService);
  anthropometricStore = inject(AnthropometricStore);
  private dialog = inject(Dialog);
  AnthropometricList = this.anthropometricStore.anthropometricData;
  dataDialog!: Anthropometric;
  columns: string[] = ["Fecha", "Altura", "Peso", "IMC", "Cintura", "Cadera", "Pierna", "Brazo"]
  fields: string[] = ["date", "height", "weight", "bodyMassIndex", "waistCircumference", "hipCircumference", "legCircumference", "armCircumference"];
  title:string = 'Keyboards';

  ngOnInit():void{
    this.anthropometricService.getAnthropometrics()
  }

  openProfileForm(measurements: Anthropometric) {
    const dialogRef = this.dialog.open(AnthropometricFormComponent, {
      minWidth: '300px',
      maxWidth: '90%',
      data: {
        measurements: measurements
      }
    });
    dialogRef.closed.subscribe(result => {
      if (result) {
        console.log('dialog closed: ', result);
      }
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Editar') {
      this.editar(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminar(accion.fila.nombre)
    }
  }

  editar(objeto:Anthropometric){
    console.log("editar", objeto)
  }

  eliminar(nombre:string){
    console.log("eliminar", nombre)
  }

}
