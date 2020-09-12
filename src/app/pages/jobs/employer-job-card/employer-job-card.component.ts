import { UIService } from 'src/app/services/ui.service';
import { JobsService } from 'src/app/services/jobs.service';
import { Job } from 'src/app/models/job.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  sl: number;
  name: string;
  profile: string;
  match: string;
  resume: string;
  interview: string;
}

@Component({
  selector: 'app-employer-job-card',
  templateUrl: './employer-job-card.component.html',
  styleUrls: ['./employer-job-card.component.css']
})
export class EmployerJobCardComponent implements OnInit {
  @Input() job: Job;
  displayedColumns: string[] = ['sl', 'name', 'match', 'resume', 'profile', 'interview'];
  dataSource: MatTableDataSource<UserData>;
  applicants = [];
  round: number;
  interviewDate;
  disabled = false;
  today = Date.now();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private jobService: JobsService,
    private uiService: UIService
  ) { }

  ngOnInit() {
    let count = 0;
    this.job.rounds.forEach((round, index) => {
      if (count === 0 && new Date(round.date).getTime() >= this.today) {
        count++;
        this.interviewDate = round.date;
        this.round = index + 1;
        this.applicants = this.job.applicants[this.round].applicants;
        return false;
      }
    });
    if (this.applicants.length) {
      const data = this.applicants.map((applicant, index) => {
        return {
          sl: index + 1,
          name: applicant.applicant.username || applicant.applicant.profileName,
          profile: applicant.applicant.profileName,
          match: applicant.jobMatch,
          resume: applicant.applicant.resume,
          interview: applicant
        };
      });
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit() {
    const job = {
      _id: this.job._id,
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

  startInterview(applicant) {
    this.uiService.startInterview(this.job, applicant, this.round);
  }
}
