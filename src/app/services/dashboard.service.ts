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
  newsFeed_page = 0;
  constructor(
    private http: HttpClient
  ) { }

  getStatisticalData() {
    return this.http.get<{ result1, result2 }>(environment.server_url + 'node-home/statistics');
  }
  getNewsFeed() {
    this.newsFeed_page++;
    return this.http.post<{ feeds: [] }>(environment.server_url + 'node-home/feeds', { page: this.newsFeed_page })
      .pipe(map(res => res.feeds));
  }
}
