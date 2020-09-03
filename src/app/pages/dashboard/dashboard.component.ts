import { Observable } from 'rxjs';
import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  feeds = [];
  isLoading = true;
  DataSets: { lineChartData, lineChartLabels, title }[];
  constructor(
    private dashboardService: DashboardService
  ) { }


  ngOnInit() {

    this.dashboardService.getStatisticalData().subscribe(res => {
      const lineChartLabels1 = new Array(res.result1.pop().length).fill('');
      const title1 = res.result1.pop();
      const lineChartData1 = res.result1;
      const lineChartLabels2 = new Array(res.result2.pop().length).fill('');
      const title2 = res.result2.pop();
      const lineChartData2 = res.result2;
      this.DataSets = [
        { lineChartData: lineChartData1, lineChartLabels: lineChartLabels1, title: title1 },
        { lineChartData: lineChartData2, lineChartLabels: lineChartLabels2, title: title2 }
      ];
    });

    // this.loadFeeds();
  }

  loadFeeds() {
    this.isLoading = true;
    this.dashboardService.getNewsFeed().subscribe(res => {
      this.feeds = [...this.feeds, ...res];
      this.isLoading = false;
    });
  }
}
