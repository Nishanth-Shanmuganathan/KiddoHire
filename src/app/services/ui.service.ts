import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  isMobileSub = new BehaviorSubject<boolean>(screen.width < 768);
  constructor() { }

  getMobileView() {
    this.isMobileSub.next(screen.width < 768);
  }
}
