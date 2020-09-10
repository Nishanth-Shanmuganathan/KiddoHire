import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { UIService } from './../../../services/ui.service';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Job } from 'src/app/models/job.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {
  addForm: FormGroup;
  @ViewChild('skill') skill: ElementRef;
  @ViewChild('exp') exp: ElementRef;
  @ViewChild('salary') salary: ElementRef;
  today = new Date(Date.now() + 86400000);
  cityString: string;
  cities: string[];
  minExp = 0;
  maxExp = 20;
  minCTC = 0;
  maxCTC = 50;
  expOptions: Options = {
    floor: 0,
    ceil: 20
  };
  ctcOptions: Options = {
    floor: 1,
    ceil: 50
  };
  editMode = false;
  constructor(
    private jobService: JobsService,
    private authService: AuthService,
    private uiService: UIService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:
      {
        designation: string,
        description: string,
        skills: string[],
        'minimum experience': number,
        'maximum experience': number,
        'minimum salary': number,
        'maximum salary': number,
        location: string,
        total_rounds: number,
        rounds: {
          date: Date,
          description: string
        }
      }
  ) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      designation: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      skills: new FormArray([], [Validators.required]),
      'minimum experience': new FormControl(0),
      'maximum experience': new FormControl(10),
      'minimum salary': new FormControl(null),
      'maximum salary': new FormControl(null),
      location: new FormControl(null, Validators.required),
      total_rounds: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(6)]),
      rounds: new FormArray([], [Validators.required]),
    });

    if (Object.keys(this.data).length !== 0) {
      this.editMode = true;
      console.log(this.data);
      this.addForm.patchValue(
        {
          designation: this.data.designation,
          description: this.data.description,
          location: this.data.location,
          total_rounds: this.data.total_rounds,
          rounds: this.data.rounds
        });
      this.minExp = this.data['minimum experience'];
      this.minCTC = this.data['minimum salary'];
      this.maxExp = this.data['maximum experience'];
      this.maxCTC = this.data['maximum salary'];
      this.cityString = this.data.location;
      this.data.skills.forEach(skill => {
        this.onAddSkill(skill);
      });
      this.onAddRounds(this.data.total_rounds);
    }
  }

  onAddSkill(skill: string) {
    if (!skill) { return; }
    (this.addForm.get('skills') as FormArray).push(
      new FormControl(skill, Validators.required)
    );
    if (this.skill) {
      this.skill.nativeElement.value = null;
    }

  }

  onAddRounds(total_rounds: number) {
    if (total_rounds < 1) { return; }
    (this.addForm.get('rounds') as FormArray).clear();
    for (let i = 0; i < total_rounds; i++) {
      (this.addForm.get('rounds') as FormArray).push(new FormGroup({
        date: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required)
      }));
    }
    // tslint:disable-next-line: no-string-literal
    console.log(this.addForm);
  }


  postJob() {
    console.log(this.addForm);
    this.addForm.patchValue({ 'minimum experience': this.minExp });
    this.addForm.patchValue({ 'minimum salary': this.minCTC });
    this.addForm.patchValue({ 'maximum experience': this.maxExp });
    this.addForm.patchValue({ 'maximum salary': this.maxCTC });
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    const jobCreds = new Job(
      this.addForm.value.designation,
      this.addForm.value.description,
      this.addForm.value.skills,
      this.addForm.value['minimum experience'],
      this.addForm.value['maximum experience'],
      this.addForm.value['minimum salary'],
      this.addForm.value['maximum salary'],
      this.addForm.value.location,
      this.addForm.value.total_rounds,
      this.addForm.value.rounds,
    );
    this.jobService.addJob(jobCreds)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.authService.updateUser(res.user);
        this.router.navigate(['../'], { relativeTo: this.route });
      }, err => {
        this.uiService.topDialog(err.error.message);
        this.router.navigate(['../'], { relativeTo: this.route });
      });

  }

  editJob() {
    console.log(this.addForm);
    this.addForm.patchValue({ 'minimum experience': this.minExp });
    this.addForm.patchValue({ 'minimum salary': this.minCTC });
    this.addForm.patchValue({ 'maximum experience': this.maxExp });
    this.addForm.patchValue({ 'maximum salary': this.maxCTC });
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    const jobCreds = new Job(
      this.addForm.value.designation,
      this.addForm.value.description,
      this.addForm.value.skills,
      this.addForm.value['minimum experience'],
      this.addForm.value['maximum experience'],
      this.addForm.value['minimum salary'],
      this.addForm.value['maximum salary'],
      this.addForm.value.location,
      this.addForm.value.total_rounds,
      this.addForm.value.rounds,
    );
    this.jobService.editJob(jobCreds)
      .subscribe(res => {
        this.uiService.topDialog(res.message);
        this.authService.updateUser(res.user);
        this.router.navigate(['../'], { relativeTo: this.route });
      }, err => {
        this.uiService.topDialog(err.error.message);
        this.router.navigate(['../'], { relativeTo: this.route });
      });

  }

  fetchCities() {
    this.jobService.fetchCities(this.cityString)
      .subscribe(res => {
        this.cities = res.data;
      });
  }
}
