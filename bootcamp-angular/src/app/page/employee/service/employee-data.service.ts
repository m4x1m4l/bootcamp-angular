import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {Employee} from "../model/employee";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  private apiUrl = 'http://localhost:8080';

  private _employeeList$ = new BehaviorSubject<Employee[]>([]);

  readonly employeeList$ = this._employeeList$.asObservable();
  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse){
    //from angular docs
    if (error.status === 0) {
      console.error(`An error occurred: ${error.error}`);
      alert('An error occurred:' + error.error);

    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`);
      alert(`Backend returned code ${error.status}, body was: ${error.error}`);

    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getAll(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`).pipe(
      tap(employeeList => this._employeeList$.next(employeeList)),
      catchError(this.handleError)
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employees`, employee).pipe(
      tap((newEmployee: Employee) => {
        const updatedEmployee = [...this._employeeList$.getValue(), newEmployee];
        this._employeeList$.next(updatedEmployee);
      }),
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/${id}`).pipe(
      tap(() => {
        // Lokale Liste aktualisieren, indem das gelöschte Element herausgefiltert wird
        const updatedEmployees = this._employeeList$.getValue().filter(employee => employee.id !== id);
        this._employeeList$.next(updatedEmployees);
      }),
      catchError(this.handleError)
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employees/${id}`, employee).pipe(
      tap((updatedEmployee: Employee) => {
        // Lokale Liste aktualisieren: Finde das Employee-Objekt mit derselben ID und ersetze es
        const updatedEmployees = this._employeeList$.getValue().map(e=> e.id === id ? updatedEmployee : e);
        this._employeeList$.next(updatedEmployees);
      }),
      catchError(this.handleError)
    );
  }
}
