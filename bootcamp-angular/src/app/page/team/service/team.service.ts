import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from "rxjs";
import {Team} from "../model/team";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:8080'

  private _teamList$ = new BehaviorSubject<Team[]>([]);
  readonly teamList$ = this._teamList$.asObservable();

  constructor(private http: HttpClient) { }

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

  getAll(): Observable<Team[]>{
    return this.http.get<Team[]>(`${this.apiUrl}/teams`).pipe(
      tap(teamList => this._teamList$.next(teamList)),
      catchError(this.handleError)
    );
  }
}
