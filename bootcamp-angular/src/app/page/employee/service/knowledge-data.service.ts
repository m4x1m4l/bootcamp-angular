import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {Employee} from "../model/employee";
import {Knowledge} from "../model/knowledge";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Skill} from "../../skill/model/skill";

@Injectable({
  providedIn: 'root'
})
export class KnowledgeDataService {
  private apiUrl = 'http://localhost:8080';
  private _knowledgeList$ = new BehaviorSubject<Knowledge[]>([]);
  readonly knowledgeList$ = this._knowledgeList$.asObservable();


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

  getAllFromEmployee(employeeId: number): Observable<Knowledge[]>{
    return this.http.get<Knowledge[]>(`${this.apiUrl}/knowledges/${employeeId}`).pipe(
      tap(knowledgeList => this._knowledgeList$.next(knowledgeList)),
      catchError(this.handleError)
    );
  }

  addKnowledge(knowledge: Knowledge): Observable<Knowledge> {
    return this.http.post<Knowledge>(`${this.apiUrl}/knowledges`, knowledge).pipe(
      tap((newKnowledge: Knowledge) => {
        const updatedKnowledges = [...this._knowledgeList$.getValue(), newKnowledge];
        this._knowledgeList$.next(updatedKnowledges);
      }),
      catchError(this.handleError)
    );
  }

  updateKnowledge(employeeId: number, skillId: number, knowledge: Knowledge): Observable<Knowledge> {
    return this.http.put<Knowledge>(`${this.apiUrl}/knowledges/${employeeId}/${skillId}`, knowledge).pipe(
      tap((updatedKnowledge: Knowledge) => {
        const updatedKnowledges = this._knowledgeList$.getValue().map(k => k.skillId == skillId && k.employeeId == k.employeeId ? updatedKnowledge : k);
        this._knowledgeList$.next(updatedKnowledges);
      }),
      catchError(this.handleError)
    );
  }

  deleteKnowledge(employeeId: number, skillId: number): Observable<void> {
    console.log(skillId, employeeId)
    return this.http.delete<void>(`${this.apiUrl}/knowledges/${skillId}/${employeeId}`).pipe( //ist im backend vertauscht
      tap(() => {
        // Lokale Liste aktualisieren, indem das gelöschte Element herausgefiltert wird
        const updatedKnowledges = this._knowledgeList$.getValue().filter(k => k.skillId !== skillId || k.employeeId !== employeeId);
        console.log(updatedKnowledges)
        this._knowledgeList$.next(updatedKnowledges);
      }),
      catchError(this.handleError)
    );
  }
}
