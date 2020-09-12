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
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/' + username, val);
  }
  saveReviews(username, val) {
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/reviews/' + username, val);
  }
  saveResume(username, val) {
    const data = new FormData();
    data.append('resume', val[1]);
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/resume/' + username, data);
  }
  saveDP(username, val) {
    const data = new FormData();
    data.append('image', val[1]);
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/image/' + username, data);
  }
  saveCertificate(username, val) {
    const data = new FormData();
    data.append('title', val[1].title);
    data.append('certificate', val[1].certificate);
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/certificate/' + username, data);
  }
}
