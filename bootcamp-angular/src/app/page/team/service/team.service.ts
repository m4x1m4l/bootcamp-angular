import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from "rxjs";
import {Team} from "../model/team";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = 'http://localhost:8080'

  private _teamList$ = new BehaviorSubject<Team[]>([]);
  readonly teamList$ = this._teamList$.asObservable();
  private isFetching = false;  // Status-Flag, um den laufenden HTTP-Call zu überwachen


  constructor(private http: HttpClient, private router: Router) { }

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



  getAll(): Observable<Team[]> {
    console.log('getAll called')
    // Wenn bereits Daten da sind, oder gerade ein HTTP-Call läuft, gib nur das Observable zurück
    if (this._teamList$.getValue().length === 0 && !this.isFetching) {
      this.isFetching = true;  // Setze das Flag, um weitere HTTP-Calls zu verhindern
      this.http.get<Team[]>(`${this.apiUrl}/teams`).pipe(
        tap(teams => {
          this._teamList$.next(teams);
          this.isFetching = false;  // API-Call ist abgeschlossen, Flag zurücksetzen
        }),
        catchError(() => {
          this.isFetching = false;  // Auch bei Fehlern das Flag zurücksetzen
          return of([]);  // Optional: Gib ein leeres Array zurück bei Fehler
        })
      ).subscribe(() => console.log('Fetch done'));
      console.log('getAll mit Fetch')

    }

    // Gib immer das Observable vom BehaviorSubject zurück
    return this._teamList$.asObservable();
  }

  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.apiUrl}/teams`, team).pipe(
      tap(newTeam => {
        const updatedSkills = [...this._teamList$.getValue(), newTeam]
        this._teamList$.next(updatedSkills);
      }),
      catchError(this.handleError)
    );
  }

  deleteTeam(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/teams/${id}`).pipe(
      tap(() => {
        const updatedTeams = this._teamList$.getValue().filter(team => team.id !== id);
        this._teamList$.next(updatedTeams);
      }),
      catchError(this.handleError)
    )
  }
  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/teams/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  updateTeam(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/teams/${id}`, team).pipe(
      tap((updatedTeam: Team) => {
        // Lokale Liste aktualisieren: Finde das Team-Objekt mit derselben ID und ersetze es
        const updatedTeams = this._teamList$.getValue().map(t => t.id === id ? updatedTeam : t);
        this._teamList$.next(updatedTeams);
      }),
      catchError(this.handleError)
    );
  }
}
