import { Component, inject, OnInit, Inject } from '@angular/core';
import { CommonModule, DatePipe  } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DialogRef} from '@angular/cdk/dialog';

import { MeService } from '@shared/services/me.service';
import { ProfileStore } from '@shared/stores/profile.store';


@Component({
  selector: 'profile-form',
  standalone: true,
  imports: [CommonModule, CdkTableModule, ReactiveFormsModule, DatePipe],
  templateUrl: './anthropometric-form.component.html'
})
export class AnthropometricFormComponent implements OnInit{
  private meService = inject(MeService);
  private profileStore = inject(ProfileStore);
  private datepipe = inject(DatePipe);
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  profile = this.profileStore.profileData;
  imc: number | null = null;
  minDate: string = '';
  formattedDateOfBirth!: string;
  itemsList = [
    { name: 'height', label: 'Altura', placeholder: 'ingrese altura' },
    { name: 'weight', label: 'Peso', placeholder: 'ingrese peso' },
    { name: 'waistCircumference', label: 'Cintura', placeholder: 'ingrese circ. cintura' },
    { name: 'hipCircumference', label: 'Cadera', placeholder: 'ingrese circ. cadera' },
    { name: 'legCircumference', label: 'Pierna', placeholder: 'ingrese circ. pierna' },
    { name: 'armCircumference', label: 'Brazo', placeholder: 'ingrese circ. brazo' }
  ];

  anthropometricForm: FormGroup = this.fb.group({
    date: [{ value: '', disabled: true }, Validators.required],
    height: [null, Validators.required],
    weight: [null, Validators.required],
    bodyMassIndex: [{ value: null, disabled: true }, Validators.required],
    waistCircumference: [null, Validators.required],
    hipCircumference: [null, Validators.required],
    legCircumference: [null, Validators.required],
    armCircumference: [null, Validators.required]
  });

  constructor( ) {
    // Calcula la fecha hace 10 años desde la fecha actual
    const today = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    this.minDate = this.datepipe.transform(tenYearsAgo, 'yyyy-MM-dd') || '';
    this.anthropometricForm.patchValue(this.profile());
  }

  ngOnInit(): void {
    this.updateFecha();
    this.setDateTime();
    this.subscribeToHeightAndWeightChanges();
  }

  calculateIMC() {
    const height = this.anthropometricForm.get('height')?.value;
    const weight = this.anthropometricForm.get('weight')?.value;
    if (height && weight) {
      this.imc = weight / ((height / 100) ** 2);
    } else {
      this.imc = null;
    }
  }

  subscribeToHeightAndWeightChanges() {
    const heightControl = this.anthropometricForm.get('height');
    const weightControl = this.anthropometricForm.get('weight');
    const bmiControl = this.anthropometricForm.get('bodyMassIndex');

    if (heightControl && weightControl && bmiControl) {
      heightControl.valueChanges.subscribe(() => {
        this.updateBMI();
      });

      weightControl.valueChanges.subscribe(() => {
        this.updateBMI();
      });
    }
  }

  updateBMI() {
    const height = this.anthropometricForm.get('height')?.value;
    const weight = this.anthropometricForm.get('weight')?.value;
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      this.anthropometricForm.get('bodyMassIndex')?.setValue(bmi);
    } else {
      this.anthropometricForm.get('bodyMassIndex')?.setValue(null);
    }
  }

  updateAnthropometric() {
    // Obtiene los valores del formulario
    const profileFormData = this.anthropometricForm.value;
    // Formatea la fecha de nacimiento utilizando DatePipe
    const formattedDateOfBirth = this.datepipe.transform(profileFormData.date_of_birth, 'yyyy-MM-dd');
    // Crea un nuevo objeto con la fecha de nacimiento formateada
    const updatedProfileData = {
      ...profileFormData,
      date_of_birth: formattedDateOfBirth
    };
    // Obtiene el ID del perfil
    const idProfile = this.profile()._id;
    if (!idProfile) {
      console.error('No se ha podido obtener el ID del perfil');
      return;
    }
    this.profileStore.updateProfile(updatedProfileData);
    // Llama al servicio para actualizar el perfil con los datos formateados
    this.meService.updateProfile(updatedProfileData, idProfile);
    // Cierra el dialogo
    this.close();
  }

  updateFecha() {
    // Obtiene los valores del formulario
    const profileFormData = this.anthropometricForm.value;
    // Formatea la fecha de nacimiento utilizando DatePipe
    const transformedDate = this.datepipe.transform(profileFormData.date_of_birth, 'yyyy-MM-dd');
    if (transformedDate !== null) {
      this.formattedDateOfBirth = transformedDate;
    } else {
      // Manejar el caso en que la fecha no es válida
      console.error('La fecha de nacimiento no es válida');
    }
    // Crea un nuevo objeto con la fecha de nacimiento formateada
    const updatedProfileData = {
      ...profileFormData,
      date_of_birth: this.formattedDateOfBirth
    };
    // Actualiza el formulario con la fecha de nacimiento formateada
    this.anthropometricForm.patchValue(updatedProfileData);
  }

  close() {
    this.dialogRef.close();
  }

  setDateTime() {
    const dateControl = this.anthropometricForm.get('date');
    if (dateControl) {
      dateControl.setValue(new Date().toISOString().split('T')[0]); // Establece la fecha actual
    }
  }

}
