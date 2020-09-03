import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private http: HttpClient
  ) { }

  fetchCities(city: string) {
    return this.http.get<{ data: string[] }>(environment.server_url + 'node-jobs/city/' + city);
  }
}
