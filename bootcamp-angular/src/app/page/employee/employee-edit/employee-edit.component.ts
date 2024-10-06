import {Component} from '@angular/core';
import {EmployeeDataService} from "../service/employee-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, combineLatest, map, Observable, of} from "rxjs";
import {SalutationDropDown} from "../model/salutation-drop-down";
import {TeamDropDown} from "../model/team-drop-down";
import {TeamService} from "../../team/service/team.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {KnowledgeDataService} from "../service/knowledge-data.service";
import {SkillDataService} from "../../skill/service/skill-data.service";
import {Knowledge} from "../model/knowledge";
import {Skill} from "../../skill/model/skill";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {
  employeeForm = new FormGroup({
    salutation: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    teamId: new FormControl(0, [Validators.required]),
    birthdate: new FormControl(new Date(), [Validators.required]),
  })
  editMode = false;

  id: number = 0;

  salutations: SalutationDropDown[] = [
    {value: 'Herr', viewValue: 'Herr'},
    {value: 'Frau', viewValue: 'Frau'},
    {value: 'Divers', viewValue: 'Divers'},
    {value: 'Keine Anrede', viewValue: 'Keine Anrede'},
  ];

  dropDownTeams: TeamDropDown[] = [];

  knowledgesOfEmployee$: Observable<Knowledge[]> = of([])
  skillsWithHidden$: Observable<Skill[]> = of([])

  emptyKnowledge: Knowledge = {
    experienceLevel: 5
  }


  constructor(private employeeDataService: EmployeeDataService, private teamDataService: TeamService, private knowledgeDataService: KnowledgeDataService, private skillDataService: SkillDataService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void{
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id']
        this.editMode = !!this.id;

        if(this.editMode){
          this.initForm(this.id);
        }

        let globalSkills$ = this.skillDataService.getAll(); //Observable<Skill[]> id,name, hidden = true/false
        let employeeKnowledges$ = this.knowledgeDataService.getAllFromEmployee(this.id);

        //TODO: verstehen
        this.skillsWithHidden$ = combineLatest([globalSkills$, employeeKnowledges$]).pipe(
          map(([globalSkills, knowledgesOfEmployee]) => {
            // Liste der Skill IDs, die der Mitarbeiter bereits hat
            let employeeSkillIds = knowledgesOfEmployee.map(knowledge => knowledge.skillId);

            // Setze das 'hidden' Attribut für jeden Skill
            return globalSkills.map(skill => {
              return {
                ...skill, // alle anderen Eigenschaften beibehalten
                disabled: employeeSkillIds.includes(skill.id) // hidden true, wenn skillId nicht vorkommt
              };
            });
          })
        );



      });

    this.teamDataService.getAll().subscribe(teams =>
    {
      teams.map(team => this.dropDownTeams.push({value: team.id, viewValue: team.name}))
    });

    this.knowledgesOfEmployee$ = this.knowledgeDataService.getAllFromEmployee(this.id);
    this.knowledgesOfEmployee$ = this.knowledgeDataService.knowledgeList$;


  }
  private initForm(id: number){
    this.employeeDataService.getEmployee(id).subscribe(
      employee => {
          this.employeeForm.setValue({
            salutation: employee.salutation,
            firstname: employee.firstname,
            lastname: employee.lastname,
            teamId: employee.teamId,
            birthdate: employee.birthdate,
        });

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
          this.router.navigateByUrl('/employee'); // Nur nach Erfolg navigieren
        } else {
          alert('Es gab ein Problem beim Speichern des Employees.'); // Benutzer informieren
        }
      });
  }
  addOrUpdate(){
    let employee = {
      salutation: this.employeeForm.get('salutation')?.value ?? '',
      firstname: this.employeeForm.get('firstname')?.value ?? '',
      lastname: this.employeeForm.get('lastname')?.value ?? '',
      teamId: this.employeeForm.get('teamId')?.value ?? 0,
      birthdate: this.employeeForm.get('birthdate')?.value ?? new Date(),
    }
    return this.editMode
      ? this.employeeDataService.updateEmployee(this.id, employee)
      : this.employeeDataService.addEmployee(employee)
  }



  receiveAddKnowledge(knowledge: Knowledge) {
    //TODO
    this.knowledgeDataService.addKnowledgeByEmployeeId(this.id, knowledge).subscribe();
    console.log(knowledge)

  }

  receiveDeleteKnowledge(knowledge: Knowledge) {
    //TODO
    this.knowledgeDataService.deleteKnowledge(knowledge.employeeId!, knowledge.skillId!).subscribe();
    console.log(knowledge.employeeId!, knowledge.skillId!)

  }

  receiveUpdateKnowledge(knowledge: Knowledge) {
    //TODO
    this.knowledgeDataService.updateKnowledge(knowledge.employeeId!, knowledge.skillId!, knowledge);

  }
}
