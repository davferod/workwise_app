import { Injectable, computed, signal } from '@angular/core';
import { Anthropometric } from '../models/anthropometric.model';

@Injectable({
  providedIn: 'root'
})
export class AnthropometricStore {

  #anthropometric = signal<Anthropometric[]>([{} as Anthropometric]);
  anthropometricData = computed(this.#anthropometric);
  originalData = signal<Anthropometric[]>([]);

  constructor() { }

  setAnthropometric(anthropometric: Anthropometric[]): void {
    this.#anthropometric.set(anthropometric);
  }

  updateanthropometric(anthropometric: Anthropometric): void {
    this.#anthropometric.update((prevAnthropometric) =>
    prevAnthropometric ? { ...prevAnthropometric, ...anthropometric }: prevAnthropometric);
  }
}
