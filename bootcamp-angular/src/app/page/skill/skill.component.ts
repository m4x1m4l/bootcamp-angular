import {Component, inject} from '@angular/core';
import {Skill} from "./model/skill";
import {SkillDataService} from "./service/skill-data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../../ui/delete-dialog/delete-dialog.component";
import {catchError, map, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  displayedColumns: string[] = ['index', 'id', 'modify', 'name'];
  dataSource: Observable<Skill[]> = of([]);

  readonly dialog = inject(MatDialog);

  constructor(private skillDataService: SkillDataService, private router: Router) {
    this.skillDataService.getAll().subscribe();
  }

  ngOnInit(): void{
    this.dataSource = this.skillDataService.skillList$.pipe(
      catchError(error => {
        console.error('Fehler beim Laden der Daten', error);
        return of([]); // Im Fehlerfall wird eine leere Liste zurückgegeben
      })
    );
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
       if(result) this.skillDataService.deleteSkill(id).pipe(
         tap(() => console.log(`Skill mit ID ${id} gelöscht`)),
         tap(() => this.router.navigateByUrl(this.router.url)),
         catchError(error => {
           console.error(`Fehler beim Löschen des Skills mit ID ${id}`, error);
           return of(null); // Fehlerfall abfangen und nichts tun
         })
       ).subscribe();
     })

  }

  onEdit(id: number) {
    this.router.navigate(
      ['/skill', id, 'edit']
    );
  }
}
