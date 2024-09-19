import { Component } from '@angular/core';
import {SkillDataService} from "../../skill/service/skill-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../service/team.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent {
  formData = {
    name: '',
    teamLeadId: 3,
  }

  editMode = false;

  id: number = 0;

  constructor(private teamDataService: TeamService, private router: Router, private route: ActivatedRoute) {
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
    this.teamDataService.getTeam(id).subscribe(
      team => {
        this.formData.name = team.name;
        this.formData.teamLeadId = team.teamLeadId;
      }
    )
  }

  onSubmit() {
    // Führe entweder ein Update oder ein Hinzufügen durch
    this.addOrUpdate()
      .pipe(
        catchError(error => {
          console.error('Fehler beim Speichern', error);
          return of(null); // Fehlerbehandlung
        })
      )
      .subscribe(success => {
        if (success) {
          this.router.navigateByUrl('/team'); // Nur nach Erfolg navigieren
        } else {
          alert('Es gab ein Problem beim Speichern des Teams.'); // Benutzer informieren
        }
      });
  }

  addOrUpdate(){
    return this.editMode
      ? this.teamDataService.updateTeam(this.id, {name: this.formData.name, teamLeadId: this.formData.teamLeadId })
      : this.teamDataService.addTeam({name: this.formData.name, teamLeadId: this.formData.teamLeadId})
  }

}
