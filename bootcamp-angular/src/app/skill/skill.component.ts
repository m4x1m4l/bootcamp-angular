import { Component } from '@angular/core';
import {Skill} from "../shared/skill";
import {SkillDataService} from "../shared/skill-data.service";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  displayedColumns: string[] = ['index', 'id', 'modify', 'name'];
  dataSource: Skill[] = [];

  constructor(private skillDataService: SkillDataService) {
    skillDataService.getAll().subscribe(data => {
      this.dataSource = data;
    })
  }
}
