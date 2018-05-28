import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataSizeService} from '../../services/data-size.service';
import {FormControl, Validators} from '@angular/forms';
import {Size} from '../../models/size';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.scss']
})

export class AddSizeComponent {
  constructor(public dialogRef: MatDialogRef<AddSizeComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Size,
             public dataSizeService: DataSizeService) { }


 onNoClick(): void {
   this.dialogRef.close();
 }

 public confirmAdd(): void {
   this.dataSizeService.addIssue(this.data);
 }
}
