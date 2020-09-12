import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isMobile: boolean;
  isLoading = true;
  editMode = false;
  skills: string[] = [];
  projects: { title: string, link: string }[] = [];
  certification: { certificate: string, title: string };
  resume: File;
  languages: string[] = [];
  user;
  selfUser;
  username: string;
  review: string;
  error = false;
  constructor(
    private uiService: UIService,
    private authService: AuthService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params.id;
      this.fetchUser();
    });

    this.route.queryParams.subscribe(query => {
      if (query.key) {
        this.authService.verifyEmail(query.key)
          .subscribe(res => {
            this.router.navigate([], {
              queryParams: {
                key: null,
              },
              queryParamsHandling: 'merge'
            });
          });
      }
    });

    this.uiService.isMobileSub.subscribe(res => {
      this.isMobile = res;
    });


    this.authService.userSub.subscribe(res => {
      this.selfUser = res;
      this.error = false;
    });

  }
  fetchUser() {
    this.profileService.fetchProfile(this.username)
      .subscribe(res => {
        this.user = res.user;
        this.isLoading = false;
        this.error = false;
        this.authService.userSub.subscribe(res => {
          this.selfUser = res;
          this.error = false;
          if (this.selfUser && this.user && (this.selfUser.profileName === this.user.profileName) && !(this.user.completion >= 60)) {
            this.editMode = true;
          }
        });
      }, () => {
        this.error = true;
        this.isLoading = false;
      });
    this.authService.userSub.subscribe(res => {
      this.selfUser = res;
      this.error = false;
      if (this.user) {
        if (this.user.completion < 60) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
      }
    });
  }

  resized() {
    this.uiService.getMobileView();
  }

  addSkills() {
    this.uiService.addSingleString('skill').subscribe(data => {
      if (data.name) {
        this.user.skills.push(data.name);
        this.profileService.saveDetails(this.user.profileName, ['skills', this.user.skills])
          .subscribe(res => {
            this.uiService.topDialog('Skills saved...');
            this.authService.updateUser(res.user);
          }, err => {
          });
      }
    });

  }
  addLanguages() {
    this.uiService.addSingleString('language').subscribe(data => {
      if (data.name) {
        this.user.languages.push(data.name);
        this.profileService.saveDetails(this.user.profileName, ['languages', this.user.languages])
          .subscribe(res => {
            this.uiService.topDialog('Language saved...');
            this.authService.updateUser(res.user);
          }, err => {
          });
      }
    });

  }
  addReview() {
    this.uiService.addSingleString('review').subscribe(data => {
      if (data.name) {
        this.user.reviews.push({ review: data.name, author: this.selfUser.username || this.selfUser.profileName });
        this.profileService.saveReviews(this.user.profileName, ['reviews', this.user.reviews])
          .subscribe(res => {
            this.uiService.topDialog('Review saved...');
            this.authService.updateUser(res.user);
          }, err => {
          });
      }
    });
  }
  addCertificate() {
    this.uiService.addSingleString('certificate').subscribe(data => {
      if (data.name && data.certificate) {
        this.certification = { certificate: data.certificate, title: data.name };
        this.profileService.saveCertificate(this.user.profileName, ['certifications', this.certification])
          .subscribe(res => {
            this.uiService.topDialog('Certificate saved...');
            this.authService.updateUser(res.user);
            this.user.certifications = res.cred;
          }, err => {
            this.uiService.topDialog('Certification update failed...');
          });
      }
    });

  }

  addProjects() {
    this.uiService.addSingleString('project').subscribe(data => {
      if (data.name && data.link) {
        this.user.projects.push({ title: data.name, link: data.link });
        this.profileService.saveDetails(this.user.profileName, ['projects', this.user.projects])
          .subscribe(res => {
            this.uiService.topDialog('Project saved...');
            this.authService.updateUser(res.user);
          }, err => {
          });
      }
    });

  }

  onResumePicked(event: Event) {
    this.resume = (event.target as HTMLInputElement).files[0];
    this.profileService.saveResume(this.user.profileName, ['resume', this.resume])
      .subscribe(res => {
        this.uiService.topDialog('Resume saved...');
        this.authService.updateUser(res.user);
        // this.user.resume = res.cred[1];
        this.resume = null;
      }, err => {
        this.resume = null;
        this.uiService.topDialog('Cannot upload this file...');
      });
  }
  onDPPicked(event: Event) {
    const dp = (event.target as HTMLInputElement).files[0];
    this.profileService.saveDP(this.user.profileName, ['image', dp])
      .subscribe(res => {
        this.uiService.topDialog('Profile picture saved...');
        this.authService.updateUser(res.user);
        this.user.imageURL = res.cred;
      }, err => {
        this.uiService.topDialog(err.error.message);
      });
  }

  saveDetails(eve) {
    if (eve.target.value) {
      this.profileService.saveDetails(this.user.profileName, [eve.target.name, eve.target.value])
        .subscribe(res => {
          this.uiService.topDialog('Changes saved...');
          this.authService.updateUser(res.user);
        }, err => {
        });
    }
  }
  navigateBack() {
    this._location.back();
  }

  logout() {
    this.authService.logout();
  }
}
