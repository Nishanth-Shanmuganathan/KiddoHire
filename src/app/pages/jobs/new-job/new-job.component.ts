import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { UIService } from './../../../services/ui.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Options } from 'ng5-slider';
import { Job } from 'src/app/models/job.model';

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
  constructor(
    private jobService: JobsService,
    private authService: AuthService,
    private uiServie: UIService,
    private router: Router,
    private route: ActivatedRoute
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
  }

  onAddSkill(skill: string) {
    if (!skill) { return; }
    (this.addForm.get('skills') as FormArray).push(
      new FormControl(skill, Validators.required)
    );
    this.skill.nativeElement.value = null;
  }

  onAddRounds(total_rounds: number) {
    console.log(total_rounds);
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
        this.uiServie.topDialog(res.message);
        this.authService.updateUser(res.user);
        this.router.navigate(['../'], { relativeTo: this.route });
      }, err => {
        this.uiServie.topDialog(err.error.message);
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
