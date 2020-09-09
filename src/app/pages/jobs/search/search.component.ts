import { UIService } from './../../../services/ui.service';
import { JobsService } from './../../../services/jobs.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewEncapsulation, Input } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Input() user;
  search: string;
  toggleFilters = false;
  cityString: string;
  cities: string[];
  minExp = 0;
  maxExp = 20;
  minCTC = 0;
  maxCTC = 50;
  minStar = 1;
  maxStar = 5;
  expOptions: Options = {
    floor: 0,
    ceil: 20
  };
  ctcOptions: Options = {
    floor: 1,
    ceil: 50
  };
  starOptions: Options = {
    floor: 1,
    ceil: 5
  };

  constructor(
    private jobService: JobsService,
    private uiService: UIService
  ) { }

  ngOnInit(): void {
  }

  fetchCities() {
    this.jobService.fetchCities(this.cityString)
      .subscribe(res => {
        this.cities = res.data;
      });
  }

  openAddJob() {
    this.uiService.openAddJob();
  }

  appliedJobs() {
    this.jobService;
  }
}
