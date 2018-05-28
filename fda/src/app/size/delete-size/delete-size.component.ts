import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataSizeService} from '../../services/data-size.service';

@Component({
  selector: 'app-delete-size',
  templateUrl: './delete-size.component.html',
  styleUrls: ['./delete-size.component.scss']
})
export class DeleteSizeComponent {

  constructor(public dialogRef: MatDialogRef<DeleteSizeComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, public DataSizeService: DataSizeService) { }

 onNoClick(): void {
   this.dialogRef.close();
 }

 confirmDelete(): void {
   this.DataSizeService.deleteIssue(this.data.code);
 }
}
