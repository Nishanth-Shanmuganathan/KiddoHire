import { ProfileService } from './../../../services/profile.service';
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
  @Input() profileName;
  @Input() appliedJob: boolean;
  @Output() jobs = new EventEmitter<Job[]>();
  user;
  date = Date.now();
  currentRound;
  status = [];
  selected: boolean = undefined;
  constructor(
    private jobService: JobsService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    if (this.appliedJob) {
      console.log(this.job);
      this.profileService.fetchProfile(this.profileName)
        .subscribe(res => {
          this.user = res.user;
          console.log(this.user);
          // console.log(this.user);
          this.user.applications.forEach(application => {
            if (application.job === this.job._id) {
              this.status = application.status;
              return;
            }
          });
          this.currentRound = this.job.rounds[this.status.length - 1]?.date;
          this.job.shortlisted.forEach(sel => {
            if (sel.applicant === this.user._id) {
              this.selected = true;
            }
          });
          this.status.forEach(status => {
            if (!status.cleared) {
              this.selected = false;
            }
          });
          // console.log(this.selected);
          // console.log(this.currentRound);
          // console.log(this.currentRound && this.appliedJob && !this.selected);
        });

    }
    // console.log('Job type : ' + this.appliedJob);
    // console.log(this.job);
    // this.status = this.job.applicants.find(applicant => applicant.applicant === this.user._id).status;
    // console.log(this.status);
  }

  applyJob(jobId) {
    console.log(jobId);
    this.jobService.applyJob(jobId);
  }

  generateReport(jobId) {
    this.jobService.generateReport(jobId);
  }
}
