import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { catchError, take, tap } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Board } from '@shared/models/board.model';
import { Profile } from '../models/profile.model';
import { ProfileStore } from '@shared/stores/profile.store';
import { checkToken } from '@interceptors/token.interceptor';
import { QUERY_PROFILE, QUERY_PROFILES } from '@shared/operations/query';
import { MUTATION_UPDATE_PROFILE } from '@shared/operations/mutation';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  apiUrl = environment.API_URL;
  private readonly http = inject(HttpClient);
  private apollo = inject(Apollo);
  private profileStore = inject(ProfileStore);



  getMeBoards() {
    return this.http.get<Board[]>(`${this.apiUrl}/api/v1/me/boards`, {
      context: checkToken(),
    });
  }

  updateProfile(updatedProfile: Profile, id: string) {
    return this.apollo.mutate<{ profile: Profile }>({
      mutation: MUTATION_UPDATE_PROFILE,
      variables: {
        updateProfileInput: {...updatedProfile,_id: id}
      },
      context: checkToken(),
    }).pipe(
      take(1),
      catchError(error => {
        console.error('Error updating profile:', error);
        return of(null); // Puedes devolver un valor predeterminado o manejar el error de alguna manera
      }),
      tap(res => {
        if (res && res.data) {
          this.profileStore.setProfile(res.data.profile);
          console.log('Profile updated:', res);
        } else {
          console.error('Error updating profile. Response:', res);
        }
    })
    ).subscribe();
  }

  getProfile() {
    return this.apollo.watchQuery<{ profile: Profile }>({
      query: QUERY_PROFILE,
      context: checkToken(),
    }).valueChanges.pipe(
      take(1),
      catchError(error => {
        console.error('Error fetching profile:', error);
        return of(null); // Puedes devolver un valor predeterminado o manejar el error de alguna manera
      }),
      tap(res => {
        if (res && res.data && res.data.profile) {
          this.profileStore.setProfile(res.data.profile);
        } else {
          console.error('Error fetching profile. Response:', res);
        }
      })
    ).subscribe()
  };

  getAllProfiles() {
    return this.apollo.watchQuery<{ profiles: Profile[] }>({
      query: QUERY_PROFILES,
      context: checkToken(),
    }).valueChanges.pipe(
      take(1),
      catchError(error => {
        console.error('Error fetching profile:', error);
        return of(null); // Puedes devolver un valor predeterminado o manejar el error de alguna manera
      }),
      tap(res => {
        if (res && res.data && res.data.profiles) {
          this.profileStore.setUsers(res.data.profiles);
        } else {
          console.error('Error fetching profile. Response:', res);
        }
      })
    ).subscribe()
  };

}
