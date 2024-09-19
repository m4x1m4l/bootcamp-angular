import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  teamData: number = 0;

  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    // Zugriff auf die vom Resolver gelieferten Daten
    this.teamData = this.route.snapshot.data['teamData'];  // 'teamData' ist der Key, der im Routing angegeben wurde
  }
}
