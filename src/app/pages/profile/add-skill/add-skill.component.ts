import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  certificate;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, type: string, link: string, certificate }) { }

  ngOnInit(): void {
  }

  onImagePicked(event: Event) {
    this.data.certificate = (event.target as HTMLInputElement).files[0];
  }
}
