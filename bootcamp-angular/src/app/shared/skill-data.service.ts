import { Injectable } from '@angular/core';
import {Skill} from "./skill";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {SkillComponent} from "../skill/skill.component";

@Injectable({
  providedIn: 'root'
})
export class SkillDataService {
  private apiUrl = 'http://localhost:8080'
  private _skillList$ = new BehaviorSubject<Skill[]>([]);
  readonly skillList$ = this._skillList$.asObservable();
  constructor(private http: HttpClient) {
    this.getAll().subscribe();
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


  getAll(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`).pipe(
      tap(skillList => this._skillList$.next(skillList)),
      catchError(this.handleError)
    );
  }

  addSkill(skill: Skill): Observable<any>{
    return this.http.post<Skill[]>(`${this.apiUrl}/skills`, skill).pipe(
      tap(() => this.getAll().subscribe()),
      catchError(this.handleError)
    );
  }
  deleteSkill(id: number): Observable<any>{
    return this.http.delete<Skill[]>(`${this.apiUrl}/skills/${id}`).pipe(
      tap(() => this.getAll().subscribe()),
      catchError(this.handleError)
    );
  }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/skills/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  updateSkill(id: number, skill: Skill) {
    return this.http.put(`${this.apiUrl}/skills/${id}`, skill).pipe(
      tap(() => this.getAll().subscribe()),
      catchError(this.handleError)
    );
  }
}
