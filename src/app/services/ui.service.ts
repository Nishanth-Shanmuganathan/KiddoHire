import { InterviewComponent } from './../pages/jobs/interview/interview.component';
import { Job } from './../models/job.model';
import { ConfirmComponent } from './../shared/confirm/confirm.component';
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

  closeDialog() {
    this.dialog.closeAll();
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
  confirm(type) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '100%',
      minWidth: '250px',
      maxWidth: '500px',
      data: { confirm: true, type },
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
  topDialog(message = 'An unknown error occurred...') {
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

  openAddJob(job?) {
    this.dialog.open(NewJobComponent, {
      width: '50%',
      minWidth: '300px',
      maxWidth: '500px',
      position: {
        top: '50vh',
        left: '50vw'
      },
      panelClass: 'center',
      data: { ...job },
      disableClose: true,
      hasBackdrop: true
    });
  }

  startInterview(job: Job, user, round) {
    this.dialog.open(InterviewComponent, {
      width: '50%',
      minWidth: '300px',
      maxWidth: '500px',
      position: {
        top: '50vh',
        left: '50vw'
      },
      panelClass: 'center',
      data: { job, user, round },
      disableClose: true,
      hasBackdrop: true
    });

  }
}
