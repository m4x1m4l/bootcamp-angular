import { Component } from '@angular/core';
import {SkillDataService} from "../shared/skill-data.service";
import {Skill} from "../shared/skill";
import {Router} from "@angular/router";

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.scss']
})
export class SkillEditComponent {

  formData = {
    name: ''
  }
  constructor(private skillDataService: SkillDataService, private router: Router) {

  }

  onSubmit() {
    console.log(this.formData)
    this.skillDataService.addSkill({
      "name": this.formData.name
    }
    ).subscribe();

    this.router.navigateByUrl("/skill");
  }
}
