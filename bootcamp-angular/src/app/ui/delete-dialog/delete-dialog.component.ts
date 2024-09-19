import {Component, Inject, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import {DeleteDialogData} from "./delete-dialog-data";


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  toDelete: string = '';
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
    this.toDelete = data.toDelete;
  }


  onCancelClick(): void {
    this.dialogRef.close(false);  // Schließt den Dialog und gibt "false" zurück
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);   // Schließt den Dialog und gibt "true" zurück
  }
}
