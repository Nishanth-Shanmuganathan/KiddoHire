import { AuthService } from 'src/app/services/auth.service';
import { UIService } from 'src/app/services/ui.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobile: boolean;
  user;
  constructor(
    private uiService: UIService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.uiService.isMobileSub.subscribe(res => {
      this.isMobile = res;
    });

    this.authService.userSub.subscribe(res => {
      this.user = res;
    });
  }

  resized() {
    this.uiService.getMobileView();
  }
}
