import { Component, OnInit } from '@angular/core';
import { FollowsService } from 'src/app/services/follows.service';

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {

  connections;
  myConnections = false;
  isLoading = true;
  constructor(
    private followsService: FollowsService
  ) { }

  ngOnInit(): void {
    this.fetchNetwork();

    this.followsService.connectionSubj.subscribe(res => {
      this.connections = res;
      this.isLoading = false;
    }, er => {
      console.log(er);
    });
  }

  fetchNetwork() {
    this.myConnections = !this.myConnections;
    this.isLoading = true;
    this.followsService.fetchNetwork();
  }

  fetchMyNetwork() {
    this.myConnections = !this.myConnections;
    this.isLoading = true;
    this.followsService.fetchMyNetwork();
  }
}
