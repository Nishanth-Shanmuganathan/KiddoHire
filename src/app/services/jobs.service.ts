import { UIService } from './ui.service';
import { Subject } from 'rxjs';
import { Job } from './../models/job.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  jobsSubj = new Subject<Job[]>();
  constructor(
    private http: HttpClient,
    private uiService: UIService
  ) { }

  fetchCities(city: string) {
    return this.http.get<{ data: string[] }>(environment.server_url + 'node-jobs/city/' + city);
  }
  fetchJobs() {
    this.http.get<{ jobs }>(environment.server_url + 'node-jobs/jobs')
      .subscribe(res => {
        this.jobsSubj.next(res.jobs);
      }, err => {
        console.log(err.error.message);
      });
  }
  fetchAppliedJobs() {
    this.http.get<{ jobs }>(environment.server_url + 'node-jobs/jobs-applied')
      .subscribe(res => {
        this.jobsSubj.next(res.jobs);
      }, err => {
        console.log(err.error.message);
      });
  }
  addJob(jobCred: Job) {
    return this.http.post<{ message, user }>(environment.server_url + 'node-jobs/job', jobCred);
  }

  applyJob(jobId) {
    this.http.get<{ jobs, message: string }>(environment.server_url + 'node-jobs/job/' + jobId)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.jobsSubj.next(res.jobs);
      }, err => {
        console.log(err.error.message);
      });
  }

  generateReport(jobId) {
    this.http.get<{ message: string }>(environment.server_url + 'node-jobs/generate-report/' + jobId)
      .subscribe(res => {
        this.uiService.centerDialog(res.message);
      }, err => {
        this.uiService.centerDialog(err.error.message);
      });
  }

  reject(jobId, userId) {
    this.http.get<{ message: string }>(environment.server_url + 'node-jobs/reject/' + jobId + '/' + userId)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.fetchJobs();
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }

  shortlist(jobId, userId) {
    this.http.get<{ message: string }>(environment.server_url + 'node-jobs/shortlist/' + jobId + '/' + userId)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.fetchJobs();
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }
}
