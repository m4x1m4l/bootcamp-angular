import { Injectable } from '@angular/core';
import {Skill} from "./skill";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SkillComponent} from "../skill/skill.component";

@Injectable({
  providedIn: 'root'
})
export class SkillDataService {
  private apiUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  getAll(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }

  addSkill(skill: Skill): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/skills`, skill);
  }
}
