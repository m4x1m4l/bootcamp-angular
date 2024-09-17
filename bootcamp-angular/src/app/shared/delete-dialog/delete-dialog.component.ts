import { Component, inject} from '@angular/core';
import {
  MatDialogRef,
} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);

  onNoClick(): void {
    this.dialogRef.close(false);  // Schließt den Dialog und gibt "false" zurück
  }

  onOkClick(): void {
    this.dialogRef.close(true);   // Schließt den Dialog und gibt "true" zurück
  }
}
