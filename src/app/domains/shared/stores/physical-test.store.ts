import { Injectable, computed, signal } from '@angular/core';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileStore {

  #profile = signal<Profile>({} as Profile);
  profileData = computed(this.#profile);
  profiles = signal<Profile[]>([{} as Profile]);
  originalData = signal<Profile[]>([]);

  constructor() { }

  setUsers(profiles: Profile[]): void {
    this.profiles.set(profiles);
    this.originalData.set(profiles);
  }

  setProfile(profile: Profile): void {
    this.#profile.set(profile);
    console.log('setProfile', this.#profile);
  }

  findUser(query: string): void {
    const filteredUsers = this.originalData().filter((user) => {
      return user.full_name?.toLowerCase().includes(query.toLowerCase())
        || user.userId?.email == query
    });
    this.profiles.set(filteredUsers);
  }

  updateProfile(profile: Profile): void {
    console.log('updateProfile', profile);
    this.#profile.update((prevProfile) =>
    prevProfile ? { ...prevProfile, ...profile }: prevProfile);
  }
}
