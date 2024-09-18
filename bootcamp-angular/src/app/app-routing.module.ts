import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from "./page/employee/employee.component";
import {TeamComponent} from "./page/team/team.component";
import {SkillComponent} from "./page/skill/skill.component";
import {SkillEditComponent} from "./page/skill/skill-edit/skill-edit.component";

const routes: Routes = [
  {
    path: 'employee', component: EmployeeComponent
  },
  {
    path: 'team', component: TeamComponent
  },
  {
    path: 'skill', component: SkillComponent
  },
  {
    path: 'skill/new', component: SkillEditComponent
  },
  {
    path: 'skill/:id/edit', component: SkillEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
