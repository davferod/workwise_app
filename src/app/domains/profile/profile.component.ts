import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe  } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import {Dialog, DialogModule} from '@angular/cdk/dialog';

import { MeService } from '@shared/services/me.service';
import { ProfileFormComponent } from './profile_form/profile-form.component';
import { ProfileStore } from '@shared/stores/profile.store';
import { Profile } from '@shared/models/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CdkTableModule, DatePipe, DialogModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private meService = inject(MeService);
  private profileStore = inject(ProfileStore);
  private dialog = inject(Dialog);
  profile = this.profileStore.profileData;
  minDate: string = '';

  setProfile() {
    this.meService.getProfile()
  }

  openProfileForm(profile: Profile) {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      minWidth: '300px',
      maxWidth: '70%',
      data: {
        profile: profile
      }
    });
    dialogRef.closed.subscribe(result => {
      if (result) {
        console.log('dialog closed: ', result);
      }
    });
  }

}
