import { AddSkillComponent } from './../pages/profile/add-skill/add-skill.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  isMobileSub = new BehaviorSubject<boolean>(screen.width < 768);
  name: string;
  constructor(
    private dialog: MatDialog
  ) { }

  getMobileView() {
    this.isMobileSub.next(screen.width < 768);
  }

  addSingleString(type) {
    const dialogRef = this.dialog.open(AddSkillComponent, {
      width: '100%',
      minWidth: '250px',
      maxWidth: '500px',
      data: { name: this.name, type },
      disableClose: true,
      hasBackdrop: true
    });

    return dialogRef.afterClosed();
  }
}
