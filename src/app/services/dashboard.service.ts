import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  newsFeed: any[] = [];
  newsFeedSubj = new Subject<any[]>();
  constructor(
    private http: HttpClient
  ) { }

  getNewsFeed() {
    return this.http.get<{ result1, result2 }>(environment.server_url + 'node-home/statistics');
  }
}
