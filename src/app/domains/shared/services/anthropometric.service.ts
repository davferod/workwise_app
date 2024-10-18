import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { catchError, take, tap } from 'rxjs/operators';

import { Anthropometric } from '@shared/models/anthropometric.model';
import { AnthropometricStore } from '@stores/anthropometric.store';
import { environment } from '@app/environments/environment';
import { QUERY_ANTHROPOMETRIC_MEASUREMENTS } from '@operations/anthropometric.query';
import { checkToken } from '@app/interceptors/token.interceptor';


@Injectable({
  providedIn: 'root'
})
export class AnthropometricService {
  apiUrl = environment.API_URL;
  private readonly http = inject(HttpClient);
  private apollo = inject(Apollo);
  private anthropometricStore = inject(AnthropometricStore);

  getAnthropometrics() {
    return this.apollo.watchQuery<{ anthropometricMeasurements: Anthropometric[] }>({
      query: QUERY_ANTHROPOMETRIC_MEASUREMENTS,
      context: checkToken(),
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        if (data) {
          this.anthropometricStore.setAnthropometric(data.anthropometricMeasurements);
        }
      }),
      catchError(error => {
        console.error('Error fetching anthropometrics:', error);
        return [];
      })
    ).subscribe()
  }
}
