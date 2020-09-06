import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  fetchProfile(profileName: string) {
    return this.http.get<{ user }>(environment.server_url + 'node-profile/' + profileName);
  }

  saveDetails(username, val) {
    return this.http.patch<{}>(environment.server_url + 'node-profile/' + username, val);
  }
}