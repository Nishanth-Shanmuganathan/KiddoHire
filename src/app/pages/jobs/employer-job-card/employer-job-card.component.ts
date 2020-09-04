import { Component, OnInit, ViewChild } from '@angular/core';
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

  displayedColumns: string[] = ['sl', 'name', 'match', 'status', 'resume', '_id'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    const users = [
      {
        _id: '1',
        sl: '1',
        name: 'Nishanth',
        status: 'succes',
        match: '23',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '2',
        sl: '2',
        name: 'Aswhanth',
        status: 'succes',
        match: '53',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '3',
        sl: '3',
        name: 'Tamil',
        status: 'failure',
        match: '58',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '4',
        sl: '4',
        name: 'Killjii',
        status: 'failure',
        match: '73',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '5',
        sl: '5',
        name: 'Cooker',
        status: 'succes',
        match: '33',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '6',
        sl: '6',
        name: 'Nishanth',
        status: 'succes',
        match: '98',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '7',
        sl: '7',
        name: 'Kidoo',
        status: 'succes',
        match: '16',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '8',
        sl: '8',
        name: 'Dharani',
        status: 'succes',
        match: '99',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '9',
        sl: '9',
        name: 'Narayanan',
        status: 'failure',
        match: '15',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '10',
        sl: '10',
        name: 'Ramesh',
        status: 'succes',
        match: '50',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '11',
        sl: '11',
        name: 'Rathu',
        status: 'succes',
        match: '4',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '12',
        sl: '12',
        name: 'Rithick',
        status: 'succes',
        match: '75',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '13',
        sl: '13',
        name: 'Naveen',
        status: 'succes',
        match: '77',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '14',
        sl: '14',
        name: 'Senthil',
        status: 'succes',
        match: '75',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '15',
        sl: '15',
        name: 'Tharani',
        status: 'succes',
        match: '88',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '16',
        sl: '16',
        name: 'Dharani',
        status: 'succes',
        match: '10',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '17',
        sl: '17',
        name: 'Kiidd',
        status: 'succes',
        match: '2',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '18',
        sl: '18',
        name: 'Ash',
        status: 'succes',
        match: '66',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '19',
        sl: '19',
        name: 'Surya',
        status: 'succes',
        match: '55',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '20',
        sl: '20',
        name: 'Balaji',
        status: 'succes',
        match: '35',
        resume: 'http://localhost:3000/',
      },
      {
        _id: '21',
        sl: '21',
        name: 'Ashwin',
        status: 'failure',
        match: '21',
        resume: 'http://localhost:3000/',
      }
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
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
  shortlist(val) {
    console.log(val);
  }
  reject(val) {
    console.log(val);
  }
}
