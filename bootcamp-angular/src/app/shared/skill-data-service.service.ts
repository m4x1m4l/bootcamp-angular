import { Injectable } from '@angular/core';
import {Skill} from "./skill";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillDataServiceService {
  private apiUrl = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  getAll(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.apiUrl}/skills`);
  }
}
