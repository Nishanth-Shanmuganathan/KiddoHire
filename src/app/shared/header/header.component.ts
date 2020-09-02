import { UIService } from 'src/app/services/ui.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMobile: boolean;
  constructor(
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.uiService.isMobileSub.subscribe(res => {
      this.isMobile = res;
    });
  }

  resized() {
    this.uiService.getMobileView();
  }
}
