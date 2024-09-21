import {Component} from '@angular/core';
import {SkillDataService} from "../service/skill-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, of} from "rxjs";

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
          this.router.navigateByUrl('/skill'); // Nur nach Erfolg navigieren
        } else {
          alert('Es gab ein Problem beim Speichern des Skills.'); // Benutzer informieren
        }
      });
  }

  addOrUpdate(){
    return this.editMode
      ? this.skillDataService.updateSkill(this.id, {name: this.formData.name })
      : this.skillDataService.addSkill({name: this.formData.name})
  }
}
