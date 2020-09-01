import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBar = new EventEmitter();
  @Input() isSideNavOpened: boolean;
  constructor() { }

  ngOnInit(): void {
    console.log(this.isSideNavOpened);
  }
  emitToggle() {
    this.toggleSideBar.emit();
  }
}
