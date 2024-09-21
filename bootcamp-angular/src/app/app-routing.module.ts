import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from "./page/employee/employee.component";
import {TeamComponent} from "./page/team/team.component";
import {SkillComponent} from "./page/skill/skill.component";
import {SkillEditComponent} from "./page/skill/skill-edit/skill-edit.component";
import {HomeComponent} from "./page/home/home.component";
import {teamResolver} from "./page/team/resolver/team.resolver";
import {TeamEditComponent} from "./page/team/team-edit/team-edit.component";

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'employee', component: EmployeeComponent},
  {path: 'team', component: TeamComponent, resolve: {
    teamData: teamResolver
    }},
  {path: 'team/new', component: TeamEditComponent},
  {path: 'team/:id/edit', component: TeamEditComponent},
  {path: 'skill', component: SkillComponent},
  {path: 'skill/new', component: SkillEditComponent},
  {path: 'skill/:id/edit', component: SkillEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
