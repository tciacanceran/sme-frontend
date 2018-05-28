import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataCategoryService} from '../../services/data-category.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {

  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, public dataCategoryService: DataCategoryService) { }



 onNoClick(): void {
   this.dialogRef.close();
 }

 stopEdit(): void {
   this.dataCategoryService.updateIssue(this.data);
 }
}
