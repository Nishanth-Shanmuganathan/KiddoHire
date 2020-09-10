import { FollowsService } from 'src/app/services/follows.service';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() connection;
  @Input() myConnection = false;
  disable = false;
  constructor(
    private followsService: FollowsService
  ) { }

  ngOnInit(): void {
  }

  follow(id: string) {
    this.disable = true;
    this.followsService.follow(id);
  }

  unFollow(id: string) {
    this.disable = true;
    this.followsService.unFollow(id);
  }

}
