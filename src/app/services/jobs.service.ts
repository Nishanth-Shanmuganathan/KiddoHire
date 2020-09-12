import { AuthService } from './auth.service';
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
  jobs: Job[] = [];
  constructor(
    private http: HttpClient,
    private uiService: UIService,
    private authService: AuthService
  ) { }

  fetchCities(city: string) {
    return this.http.get<{ data: string[] }>(environment.server_url + 'node-jobs/city/' + city);
  }
  fetchJobs() {
    console.log('fetch kobs');
    this.http.get<{ jobs }>(environment.server_url + 'node-jobs/jobs')
      .subscribe(res => {
        this.jobs = res.jobs;
        this.jobsSubj.next(this.jobs);
      }, err => {
        this.jobsSubj.error(err);
        console.log(err.error.message);
      });
  }
  fetchAppliedJobs() {
    this.http.get<{ jobs }>(environment.server_url + 'node-jobs/jobs-applied')
      .subscribe(res => {
        this.jobs = res.jobs;
        this.jobsSubj.next(this.jobs);
      }, err => {
        this.jobsSubj.error(err);
        console.log(err.error.message);
      });
  }
  addJob(jobCred: Job) {
    this.http.post<{ message, user }>(environment.server_url + 'node-jobs/job', jobCred)
      .subscribe(res => {
        console.log(res);
        this.fetchJobs();
        this.authService.updateUser(res.user);
        this.uiService.topDialog(res.message);
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }
  editJob(jobCred: Job, id) {
    console.log('hii');
    this.http.post<{ message, user }>(environment.server_url + 'node-jobs/edit/' + id, jobCred)
      .subscribe(res => {
        this.fetchJobs();
        this.authService.updateUser(res.user);
        this.uiService.topDialog(res.message);
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }

  applyJob(jobId) {
    this.http.get<{ jobs, message: string }>(environment.server_url + 'node-jobs/job/' + jobId)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.jobs = res.jobs;
        this.jobsSubj.next(this.jobs);
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

  reject(jobId, userId, round) {
    this.http.get<{ message: string }>(environment.server_url + 'node-jobs/reject/' + jobId + '/' + userId + '/' + round)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.fetchJobs();
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }

  shortlist(jobId, userId, round) {
    console.log(round);
    this.http.get<{ message: string }>(environment.server_url + 'node-jobs/shortlist/' + jobId + '/' + userId + '/' + round)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.fetchJobs();
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }
  search(string) {
    if (!string) {
      this.jobsSubj.next(this.jobs);
    }
    const filteredArr = this.jobs.filter(job =>
      // tslint:disable-next-line: no-unused-expression
      (
        job.designation.toLowerCase().includes(string) ||
        job.location.toLowerCase().includes(string) ||
        job.skills.includes(string) ||
        job.maximumExperience === parseInt(string) ||
        job.maximumSalary === parseInt(string) ||
        job.minimumExperience === parseInt(string) ||
        job.minimumSalary === parseInt(string) ||
        job.totalRounds === parseInt(string))
    );
    this.jobsSubj.next(filteredArr);
  }
}
