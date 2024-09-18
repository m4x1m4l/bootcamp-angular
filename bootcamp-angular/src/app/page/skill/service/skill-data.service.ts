import { Injectable } from '@angular/core';
import {Skill} from "../model/skill";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillDataService {
  private apiUrl = 'http://localhost:8080'
  private _skillList$ = new BehaviorSubject<Skill[]>([]);
  readonly skillList$ = this._skillList$.asObservable();
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


  getAll(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`).pipe(
      tap(skillList => this._skillList$.next(skillList)),
      catchError(this.handleError)
    );
  }

  addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/skills`, skill).pipe(
      tap((newSkill: Skill) => {
        const updatedSkills = [...this._skillList$.getValue(), newSkill];
        this._skillList$.next(updatedSkills);
      }),
      catchError(this.handleError)
    );
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/skills/${id}`).pipe(
      tap(() => {
        // Lokale Liste aktualisieren, indem das gelöschte Element herausgefiltert wird
        const updatedSkills = this._skillList$.getValue().filter(skill => skill.id !== id);
        this._skillList$.next(updatedSkills);
      }),
      catchError(this.handleError)
    );
  }


  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/skills/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  updateSkill(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/skills/${id}`, skill).pipe(
      tap((updatedSkill: Skill) => {
        // Lokale Liste aktualisieren: Finde das Skill-Objekt mit derselben ID und ersetze es
        const updatedSkills = this._skillList$.getValue().map(s => s.id === id ? updatedSkill : s);
        this._skillList$.next(updatedSkills);
      }),
      catchError(this.handleError)
    );
  }

}
