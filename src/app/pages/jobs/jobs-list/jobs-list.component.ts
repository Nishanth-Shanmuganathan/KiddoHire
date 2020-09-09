import { AuthService } from 'src/app/services/auth.service';
import { Job } from 'src/app/models/job.model';
import { JobsService } from 'src/app/services/jobs.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {
  @Input() jobs: Job[];
  @Input() user;
  @Input() isLoading;

  appliedJob = false;
  constructor(
    private jobService: JobsService
  ) { }

  ngOnInit(): void {
    this.jobService.jobsSubj.subscribe(res => {
      this.isLoading = false;
    });
  }

  getIsLoading(bool) {
    this.isLoading = bool;
  }

  getJobType(val) {
    this.appliedJob = val;
  }
}
