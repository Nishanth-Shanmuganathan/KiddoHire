import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  certifications: { certificate: string, title: string }[] = [];
  resume: File;
  languages: string[] = [];
  user;
  username: string;

  constructor(
    private uiService: UIService,
    private authService: AuthService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.username = params.id);

    this.profileService.fetchProfile(this.username)
      .subscribe(res => {
        console.log(res);
        this.user = res.user;
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
      // this.editMode = this.user.profileName === this.username;
      console.log(this.user.profileName, this.username);
      console.log(this.user.profileName === this.username ? 'Your profile' : 'Another profile');
    });

  }

  resized() {
    this.uiService.getMobileView();
  }

  addSkills() {
    this.uiService.addSingleString('skill').subscribe(data => {
      console.log(data);
      if (data.name) {
        this.user.skills.push(data.name);
        console.log('pushed');
        this.profileService.saveDetails(this.user.profileName, ['skills', this.user.skills])
          .subscribe(res => {
            console.log(res);
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
            console.log(res);
          }, err => {
            console.log('Error in language add');
          });
      }
    });

  }
  addCertificate() {
    this.uiService.addSingleString('certificate').subscribe(data => {
      if (data.name && data.certificate) {
        this.user.certifications.push({ certificate: data.certificate, title: data.name });
      }
    });

    this.profileService.saveDetails(this.user.profileName, ['certifications', this.user.certifications])
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  addProjects() {
    this.uiService.addSingleString('project').subscribe(data => {
      if (data.name && data.link) {
        this.user.projects.push({ title: data.name, link: data.link });
      }
    });

    this.profileService.saveDetails(this.user.profileName, ['projects', this.user.projects])
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  onImagePicked(event: Event) {
    this.user.resume = (event.target as HTMLInputElement).files[0];

    this.profileService.saveDetails(this.user.profileName, ['resume', this.user.resume])
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

  saveDetails(eve) {
    console.log(eve);
    this.profileService.saveDetails(this.user.profileName, [eve.target.name, eve.target.value])
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }
}
