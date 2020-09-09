import { UIService } from './ui.service';
import { Subject } from 'rxjs';
import { Job } from './../models/job.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowsService {
  connectionSubj = new Subject<any[]>();
  constructor(
    private http: HttpClient,
    private uiService: UIService
  ) { }

  fetchNetwork() {
    this.http.get<{ connections }>(environment.server_url + 'node-follows/connections')
      .subscribe(res => {
        this.connectionSubj.next(res.connections);
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }

  fetchMyNetwork() {
    this.http.get<{ connections }>(environment.server_url + 'node-follows/my-connections')
      .subscribe(res => {
        this.connectionSubj.next(res.connections);
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }

  follow(userId: string) {
    this.http.get<{ message: string, connections }>(environment.server_url + 'node-follows/follow/' + userId)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.connectionSubj.next(res.connections);
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }

  unFollow(userId: string) {
    this.http.get<{ message: string, connections }>(environment.server_url + 'node-follows/un-follow/' + userId)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.connectionSubj.next(res.connections);
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }


}
