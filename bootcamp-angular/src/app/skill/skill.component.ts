import {Component, inject} from '@angular/core';
import {Skill} from "../shared/skill";
import {SkillDataService} from "../shared/skill-data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../shared/delete-dialog/delete-dialog.component";
import {map, Observable, of} from "rxjs";
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
    this.dataSource = this.skillDataService.skillList$;
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
       if(result) this.skillDataService.deleteSkill(id).subscribe();
     })

  }

  onEdit(id: number) {
    this.router.navigate(
      ['/skill', id, 'edit']
    );
  }
}
