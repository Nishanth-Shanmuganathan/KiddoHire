import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isMobile: boolean;
  constructor(
    private uiService: UIService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // this.authService.isAuthSubj.next(false);
    // this.authService.userSub.next(null);
    this.uiService.isMobileSub.subscribe(res => {
      this.isMobile = res;
    });
  }

  checkView() {
    this.uiService.getMobileView();
  }
}
