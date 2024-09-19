import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, of, tap} from "rxjs";
import {Team} from "./model/team";
import {MatDialog} from "@angular/material/dialog";
import {TeamService} from "./service/team.service";
import {DeleteDialogComponent} from "../../ui/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  displayedColumns: string[] = ['index', 'id', 'name', 'teamLeadId', 'modify'];
  dataSource: Team[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute, private teamDataService: TeamService, private router: Router){}
  ngOnInit(): void {
    // Zugriff auf die vom Resolver gelieferten Daten
    this.dataSource = this.route.snapshot.data['teamData']; // 'teamData' ist der Key, der im Routing angegeben wurde
  }

  openDeleteDialog(toDelete: string) {
    return this.dialog.open(DeleteDialogComponent, {
      data: {
        toDelete: toDelete
      },
      width: '400px',
      enterAnimationDuration: '50ms',
      exitAnimationDuration: '50ms',
    });
  }

  deleteElement(id: number) {
    const dialogRef = this.openDeleteDialog(`ID: ${id}`);
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.teamDataService.deleteTeam(id).pipe(
        tap(() => console.log(`Team mit ID ${id} gelöscht`)),
        catchError(error => {
          console.error(`Fehler beim Löschen des Teams mit ID ${id}`, error);
          return of(null); // Fehlerfall abfangen und nichts tun
        })
      ).subscribe();
    })
  }

  onEdit(id: number) {
    this.router.navigate(
      ['/team', id, 'edit']
    );
  }


}
