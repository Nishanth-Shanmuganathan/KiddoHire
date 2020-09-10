import { UIService } from 'src/app/services/ui.service';
import { JobsService } from 'src/app/services/jobs.service';
import { Job } from 'src/app/models/job.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  _id: string;
  sl: string;
  name: string;
  status: string;
  match: string;
  resume: string;
}

@Component({
  selector: 'app-employer-job-card',
  templateUrl: './employer-job-card.component.html',
  styleUrls: ['./employer-job-card.component.css']
})
export class EmployerJobCardComponent implements OnInit {
  @Input() job: Job;
  displayedColumns: string[] = ['sl', 'name', 'match', 'resume', 'profile', 'accept', 'reject'];
  dataSource: MatTableDataSource<UserData>;
  applicants;
  disabled = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private jobService: JobsService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    console.log(this.job);
    this.applicants = this.job.applicants;
    const data = this.applicants.map((applicant, index) => {
      return {
        sl: index + 1,
        name: applicant.applicant.username || applicant.applicant.profileName,
        profile: applicant.applicant.profileName,
        match: applicant.jobMatch,
        resume: applicant.applicant.resume,
        accept: { job: this.job._id, user: applicant.applicant.profileName },
        reject: { job: this.job._id, user: applicant.applicant.profileName }
      };
    });
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  shortlist(jobId, userId) {
    this.disabled = true;
    this.uiService.confirm('shortlist').subscribe(res => {
      if (res.confirm) {
        this.jobService.shortlist(jobId, userId);
      } else {
        this.disabled = false;
      }
    });
  }
  reject(jobId, userId) {
    this.disabled = true;
    this.uiService.confirm('reject').subscribe(res => {
      if (res.confirm) {
        this.jobService.reject(jobId, userId);
      } else {
        this.disabled = false;
      }
    });
  }

  edit() {
    const job = {
      designation: this.job.designation,
      description: this.job.description,
      skills: this.job.skills,
      'minimum experience': this.job.minimumExperience,
      'maximum experience': this.job.maximumExperience,
      'minimum salary': this.job.minimumSalary,
      'maximum salary': this.job.maximumSalary,
      location: this.job.location,
      total_rounds: this.job.totalRounds,
      rounds: this.job.rounds
    };
    this.uiService.openAddJob(job);
  }
}
