import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobsService } from 'src/app/services/jobs.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  user;
  isLoading = true;
  constructor(
    private jobService: JobsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.jobService.fetchJobs()
      .subscribe(res => {
        this.jobs = res.jobs;
        this.isLoading = false;
        console.log('fetched');
      }, err => {
        console.log('fetch error');
        this.isLoading = false;
        console.log(err.error.message);
      });

    this.jobService.jobsSubj.subscribe(res => {
      console.log('sub emited');
      this.jobs = res;
    });

    this.authService.userSub.subscribe(res => {
      this.user = res;
    });
  }

}
