import {Component} from '@angular/core';
import {EmployeeDataService} from "../service/employee-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, of} from "rxjs";
import {SalutationDropDown} from "../model/salutation-drop-down";
import {TeamDropDown} from "../model/team-drop-down";
import {TeamService} from "../../team/service/team.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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



  constructor(private employeeDataService: EmployeeDataService, private teamDataService: TeamService, private router: Router, private route: ActivatedRoute) {
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

    this.teamDataService.getAll().subscribe(teams =>
    {
      teams.map(team => this.dropDownTeams.push({value: team.id, viewValue: team.name}))
    });
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
}
