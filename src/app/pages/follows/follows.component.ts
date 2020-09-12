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
  disable = false;
  isLoading = true;
  error = false;
  constructor(
    private followsService: FollowsService
  ) { }

  ngOnInit(): void {
    this.fetchNetwork();

    this.followsService.connectionSubj.subscribe(res => {
      this.connections = res;
      this.isLoading = false;
      this.disable = false;
    }, er => {
      this.error = true;
      this.isLoading = false;
    });
  }

  fetchNetwork() {
    this.disable = true;
    this.myConnections = !this.myConnections;
    this.isLoading = true;
    this.followsService.fetchNetwork();
  }

  fetchMyNetwork() {
    this.disable = true;
    this.myConnections = !this.myConnections;
    this.isLoading = true;
    this.followsService.fetchMyNetwork();
  }
}
