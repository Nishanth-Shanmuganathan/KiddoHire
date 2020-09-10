import { AuthService } from './../../../services/auth.service';
import { JobsService } from 'src/app/services/jobs.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-employee-job-card',
  templateUrl: './employee-job-card.component.html',
  styleUrls: ['./employee-job-card.component.css']
})
export class EmployeeJobCardComponent implements OnInit {

  @Input() job: Job;
  @Input() user;
  @Input() appliedJob: boolean;
  @Output() jobs = new EventEmitter<Job[]>();

  status;
  constructor(
    private jobService: JobsService,
  ) { }

  ngOnInit(): void {
    // console.log('Job type : ' + this.appliedJob);
    console.log(this.job);
    this.status = this.job.applicants.find(applicant => applicant.applicant === this.user._id).status;
    console.log(this.status);
  }

  applyJob(jobId) {
    console.log(jobId);
    this.jobService.applyJob(jobId);
  }

  generateReport(jobId) {
    this.jobService.generateReport(jobId);
  }
}
