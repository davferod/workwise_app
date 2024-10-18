import { Component, inject, OnInit } from '@angular/core';
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
  templateUrl: './profile-form.component.html'
})
export class ProfileFormComponent implements OnInit{
  private meService = inject(MeService);
  private profileStore = inject(ProfileStore);
  private datepipe = inject(DatePipe);
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  profile = this.profileStore.profileData;
  minDate: string = '';
  formattedDateOfBirth!: string;

  profileForm: FormGroup = this.fb.group({
    full_name: ['', Validators.required],
    profile_picture: ['', Validators.required],
    date_of_birth: [null, Validators.required],
    gender: ['', Validators.required],
    cel_phone: ['', Validators.required],
    levelexp: ['', Validators.required],
    health_history: ['', Validators.required],
    associated_gym: this.fb.group({
      name: [''],
      location: ['']
    })
  });

  constructor( ) {
    // Calcula la fecha hace 10 años desde la fecha actual
    const today = new Date();
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    this.minDate = this.datepipe.transform(tenYearsAgo, 'yyyy-MM-dd') || '';
    this.profileForm.patchValue(this.profile());
  }

  ngOnInit(): void {
    this.updateFecha();
  }

  updateProfile() {
    // Obtiene los valores del formulario
    const profileFormData = this.profileForm.value;
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
    const profileFormData = this.profileForm.value;
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
    this.profileForm.patchValue(updatedProfileData);
  }

  close() {
    this.dialogRef.close();
  }

}
