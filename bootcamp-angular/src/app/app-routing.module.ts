import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeComponent} from "./employee/employee.component";
import {TeamComponent} from "./team/team.component";
import {SkillComponent} from "./skill/skill.component";

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
