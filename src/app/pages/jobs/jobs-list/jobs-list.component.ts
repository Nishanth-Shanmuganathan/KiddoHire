import { Job } from 'src/app/models/job.model';
import { JobsService } from 'src/app/services/jobs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  jobs: Job[];
  constructor(
    private jobService: JobsService
  ) { }

  ngOnInit(): void {
    this.jobService.fetchJobs()
      .subscribe(res => {
        this.jobs = res.jobs;
      }, err => {
        console.log(err.error.message);
      });
  }

}
