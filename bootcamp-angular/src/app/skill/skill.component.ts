import {Component, inject} from '@angular/core';
import {Skill} from "../shared/skill";
import {SkillDataService} from "../shared/skill-data.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../shared/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  displayedColumns: string[] = ['index', 'id', 'modify', 'name'];
  dataSource: Skill[] = [];

  readonly dialog = inject(MatDialog);

  constructor(private skillDataService: SkillDataService) {
    skillDataService.skillList$.subscribe(data => {this.dataSource = data})
  }

  deleteElement(id: number) {
     const dialogRef = this.dialog.open(DeleteDialogComponent);
     dialogRef.afterClosed().subscribe(result => {
       if(result) this.skillDataService.deleteSkill(id).subscribe();
     })

  }

}
