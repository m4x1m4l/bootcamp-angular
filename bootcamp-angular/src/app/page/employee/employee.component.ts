import {Component, inject} from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Employee} from "./model/employee";
import {EmployeeDataService} from "./service/employee-data.service";
import {Router} from "@angular/router";
import {DeleteDialogComponent} from "../../ui/delete-dialog/delete-dialog.component";

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

  openDeleteDialog(toDelete: string) {
    return this.dialog.open(DeleteDialogComponent, {
      data: {
        toDelete: toDelete
      },
      width: '400px',
      enterAnimationDuration: '50ms',
      exitAnimationDuration: '50ms',
    });
  }

  deleteElement(id: number) {
    const dialogRef = this.openDeleteDialog(`ID: ${id}`);
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.employeeDataService.deleteEmployee(id).pipe(
        tap(() => console.log(`Employee mit ID ${id} gelöscht`)),
        tap(() => this.router.navigateByUrl(this.router.url)),
        catchError(error => {
          console.error(`Fehler beim Löschen des Employees mit ID ${id}`, error);
          return of(null); // Fehlerfall abfangen und nichts tun
        })
      ).subscribe();
    })
  }

  onEdit(id: number) {
    this.router.navigate(
      ['/employee', id, 'edit']
    );
  }

}
