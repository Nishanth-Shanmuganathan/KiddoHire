import { UIService } from 'src/app/services/ui.service';
import { Job } from './../../../models/job.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {
  isToday: boolean;
  disabled = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { job: Job, user, round },
    private uiService: UIService,
    private jobService: JobsService,
  ) { }

  ngOnInit(): void {
    console.log(this.data.job);
    console.log(this.data.user);
    this.isToday = !!this.data.job.rounds.find(round => new Date(round.date).getTime() === Date.now());
    console.log(this.isToday);
  }

  reject(jobId, userId) {
    this.disabled = true;
    this.uiService.confirm('reject').subscribe(res => {
      if (res.confirm) {
        this.jobService.reject(jobId, userId, this.data.round);
      } else {
        this.disabled = false;
      }
    });
  }
  select(jobId, userId) {
    this.disabled = true;
    this.uiService.confirm('shortlist').subscribe(res => {
      if (res.confirm) {
        this.jobService.shortlist(jobId, userId, this.data.round);
      } else {
        this.disabled = false;
      }
    });
  }
}
