import {Component, inject} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Employee} from "./model/employee";
import {EmployeeDataService} from "./service/employee-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  displayedColumns: string[] = ['index', 'id', 'modify', 'salutation', 'firstname', 'lastname','teamId', 'teamName', 'birthdate'  ];
  dataSource: Observable<Employee[]> = of([]);
  readonly dialog = inject(MatDialog);

  constructor(private employeeDataService: EmployeeDataService, private router: Router) {
    this.employeeDataService.getAll().subscribe();
  }

  ngOnInit(): void{
    this.dataSource = this.employeeDataService.employeeList$.pipe(
      catchError(error => {
        console.error('Fehler beim Laden der Daten', error);
        return of([]); // Im Fehlerfall wird eine leere Liste zurückgegeben
      })
    );
  }

}
