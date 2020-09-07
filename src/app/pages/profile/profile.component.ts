import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

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
  username: string;

  constructor(
    private uiService: UIService,
    private authService: AuthService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.username = params.id);

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
    this.profileService.fetchProfile(this.username)
      .subscribe(res => {
        console.log(res);
        this.user = res.user;
        if ((this.user.profileName === this.username) && !(this.user.completion >= 60)) {
          this.editMode = true;
        }
        this.isLoading = false;
        console.log(this.user.profileName, this.username);
      }, err => {
        this.isLoading = false;
        console.log('Error in fetching');
        console.log(this.user);
      });

    this.uiService.isMobileSub.subscribe(res => {
      this.isMobile = res;
    });

    this.authService.userSub.subscribe(res => {
      this.user = res;
      console.log(this.user.profileName === this.username ? 'Your profile' : 'Another profile');
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
            this.uiService.topDialog(this.toTitlecase(res.cred[0]) + ' saved...');
            this.authService.updateUser(res.user);
          }, err => {
            console.log('Error in skills add');
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
            this.uiService.topDialog(this.toTitlecase(res.cred[0]) + ' saved...');
            this.authService.updateUser(res.user);
          }, err => {
            console.log('Error in language add');
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
            console.log(res);
            this.uiService.topDialog(this.toTitlecase(res.cred[0]) + ' saved...');
            this.authService.updateUser(res.user);
            // this.user.certifications.push({ title: res.cred[1].title, certificate: res.cred[1].absPath });
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
            this.uiService.topDialog(this.toTitlecase(res.cred[0]) + ' saved...');
            this.authService.updateUser(res.user);
          }, err => {
            console.log(err);
          });
      }
    });

  }

  onResumePicked(event: Event) {
    this.resume = (event.target as HTMLInputElement).files[0];
    this.profileService.saveResume(this.user.profileName, ['resume', this.resume])
      .subscribe(res => {
        this.uiService.topDialog(this.toTitlecase(res.cred[0]) + ' saved...');
        this.authService.updateUser(res.user);
        // this.user.resume = res.cred[1];
        this.resume = null;
      }, err => {
        this.resume = null;
        this.uiService.topDialog('Cannot upload this file...');
      });
  }
  onDPPicked(event: Event) {
    this.resume = (event.target as HTMLInputElement).files[0];
    this.profileService.saveDP(this.user.profileName, ['resume', this.resume])
      .subscribe(res => {
        this.uiService.topDialog(this.toTitlecase(res.cred[0]) + ' saved...');
        this.authService.updateUser(res.user);
        // this.user.imageURL = res.cred[1];
      }, err => {
        this.uiService.topDialog('Cannot upload this file...');
      });
  }

  saveDetails(eve) {
    if (eve.target.value) {
      this.profileService.saveDetails(this.user.profileName, [eve.target.name, eve.target.value])
        .subscribe(res => {
          this.uiService.topDialog(this.toTitlecase(res.cred[0]) + ' saved...');
          this.authService.updateUser(res.user);
        }, err => {
          console.log(err);
        });
    }
  }
  toTitlecase(string) {
    let sentence = string.toLowerCase();
    sentence = sentence[0].toUpperCase() + sentence.slice(1);
    return sentence;
  }
}
