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
    console.log('in service');
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/' + username, val);
  }

  saveResume(username, val) {
    const data = new FormData();
    data.append('resume', val[1]);
    console.log(data);
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/resume/' + username, data);
  }
  saveDP(username, val) {
    console.log(val);
    const data = new FormData();
    data.append('image', val[1]);
    console.log(data);
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/image/' + username, data);
  }
  saveCertificate(username, val) {
    const data = new FormData();
    data.append('title', val[1].title);
    data.append('certificate', val[1].certificate);
    console.log(data);
    return this.http.patch<{ cred, user }>(environment.server_url + 'node-profile/certificate/' + username, data);
  }
}
