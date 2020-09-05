import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isMobile: boolean;
  editMode = true;
  skills: string[];
  projects: { title: string, link: string }[];
  languages: string[];
  user;

  editForm: FormGroup;
  constructor(
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.uiService.isMobileSub.subscribe(res => {
      this.isMobile = res;
    });
    this.user = {
      username: 'Nishanth Shanmuganathan',
      description: 'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes, along with exposition, argumentation, and narration. In practice it would be difficult to write literature that drew on just one of the four basic modes.',
      skills: ['Angular', 'Node', 'Mongo', 'Javascript', 'Express'],
      experience: 12,
      canJoin: 2,
      work: 'Perilwise Insurtech',
      education: 'Kongu Engineering College',
      resume: 'nishanth',
      certifications: [{
        certificate: './../../../assets/Nishanth.jpg',
        title: 'Front end Javascript Frameworks:Angular'
      },
      {
        certificate: './../../../assets/Nishanth.jpg',
        title: 'Front end Javascript Frameworks:React'
      },
      {
        certificate: './../../../assets/Nishanth.jpg',
        title: 'Back end Javascript Frameworks:Node'
      }
      ],
      projects: [
        { title: 'Tasked', link: 'https://tasked-hackerearth.herokuapp.com/' },
        { title: 'Stock Market', link: 'http://stock-market-nish.herokuapp.com/' },
        { title: 'Mentor Hub', link: 'https://mentor-hub.herokuapp.com/' }
      ],
      languages: ['Tamil', 'English', 'Japanese']
    };
  }

  resized() {
    this.uiService.getMobileView();
  }

  addSkills() {
    this.uiService.addSingleString('skill').subscribe(data => {
      if (data.name) {
        this.user.skills.push(data.name);
      }
    });
  }
  addLanguages() {
    this.uiService.addSingleString('language').subscribe(data => {
      if (data.name) {
        this.user.languages.push(data.name);
      }
    });
  }
  addCertificate() {
    this.uiService.addSingleString('certificate').subscribe(data => {
      if (data.name && data.certificate) {
        this.user.certifications.push({ certificate: data.certificate, title: data.name });
      }
    });
  }

  addProjects() {
    this.uiService.addSingleString('project').subscribe(data => {
      if (data.name && data.link) {
        this.user.projects.push({ title: data.name, link: data.link });
      }
    });
  }
}
