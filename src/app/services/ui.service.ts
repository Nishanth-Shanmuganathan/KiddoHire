import { NewJobComponent } from './../pages/jobs/new-job/new-job.component';
import { NotificationComponent } from './../shared/notification/notification.component';
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

  centerDialog(message) {
    this.dialog.closeAll();
    this.dialog.open(NotificationComponent, {
      width: '50%',
      minWidth: '250px',
      maxWidth: '300px',
      position: {
        top: '50vh',
        left: '50vw'
      },
      panelClass: 'center',
      data: { message, center: true },
      disableClose: true,
      hasBackdrop: true
    });

  }
  topDialog(message) {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '250px',
      position: {
        top: '0px',
        right: '0px'
      },
      hasBackdrop: false,
      data: { message, center: false },
    });
    setTimeout(() => {
      dialogRef.close();
    }, 2000);
  }

  openAddJob() {
    this.dialog.open(NewJobComponent);
  }
}
