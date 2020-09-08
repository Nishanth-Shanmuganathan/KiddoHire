import { Job } from './../models/job.model';
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
  fetchJobs() {
    return this.http.get<{ jobs }>(environment.server_url + 'node-jobs/jobs');
  }
  addJob(jobCred: Job) {
    return this.http.post<{ message, user }>(environment.server_url + 'node-jobs/job', jobCred);
  }
}
