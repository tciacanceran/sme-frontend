import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataSizeService} from '../../services/data-size.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-size',
  templateUrl: './edit-size.component.html',
  styleUrls: ['./edit-size.component.scss']
})
export class EditSizeComponent {

  constructor(public dialogRef: MatDialogRef<EditSizeComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, public dataSizeService: DataSizeService) { }

 onNoClick(): void {
   this.dialogRef.close();
 }

 stopEdit(): void {
   this.dataSizeService.updateIssue(this.data);
 }
}
