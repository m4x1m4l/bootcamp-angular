import {ResolveFn} from '@angular/router';
import {TeamService} from "../service/team.service";
import {inject} from "@angular/core";
import {Observable} from "rxjs";
import {Team} from "../model/team";

export const teamResolver: ResolveFn<Observable<Team[]>> = (route, state) => {
  const teamService = inject(TeamService);
  return teamService.getAll();
};
