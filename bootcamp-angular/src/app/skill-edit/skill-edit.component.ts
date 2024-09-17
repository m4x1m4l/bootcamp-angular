import { Component } from '@angular/core';
import {SkillDataService} from "../shared/skill-data.service";
import {Skill} from "../shared/skill";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.scss']
})
export class SkillEditComponent {

  formData = {
    name: ''
  }
  editMode = false;
  id: number = 0;
  constructor(private skillDataService: SkillDataService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void{
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id']
        this.editMode = !!this.id;

        if(this.editMode){
          this.initForm(this.id);
        }
      }
    )
  }

  private initForm(id: number){
    this.skillDataService.getSkill(id).subscribe(
      skill => this.formData.name = skill.name
    )
  }

  onSubmit() {
    this.skillDataService.addSkill({
      "name": this.formData.name
    }
    ).subscribe();

    this.router.navigateByUrl("/skill");
  }

  addOrUpdate(){
    return this.editMode ? this.skillDataService.updateSkill(this.id, {name: this.formData.name }) : this.skillDataService.addSkill({name: this.formData.name})
  }
}
