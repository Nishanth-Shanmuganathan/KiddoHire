import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() lineChartData: Array<any>;
  @Input() lineChartLabels: Array<any>;
  @Input() title: string;

  lineChartOptions: any = {
    scaleShowLabels: false
  };
  lineChartColors: Array<any> = [
    {
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBorderColor: 'transparent',
      borderColor: 'rgba(41, 27, 235, 1)',
    },
    {
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBorderColor: 'transparent',
      borderColor: 'rgba(235, 27, 207, 1)',
    },
    {
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBorderColor: 'transparent',
      borderColor: 'rgba(235, 27, 27, 1)',
    },
    {
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBorderColor: 'transparent',
      borderColor: 'rgba(38, 163, 0, 1)',
    },
    {
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBorderColor: 'transparent',
      borderColor: 'rgba(235, 221, 27, 1)',
    }

  ];
  lineChartLegend: Boolean = true;
  lineChartType: String = 'line';
  constructor() { }

  ngOnInit(): void {
  }

}
