import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataCategoryService} from '../../services/data-category.service';
import {FormControl, Validators} from '@angular/forms';
import {Category} from '../../models/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})

export class AddCategoryComponent {
  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Category,
             public dataCategoryService: DataCategoryService) { }


 onNoClick(): void {
   this.dialogRef.close();
 }

 public confirmAdd(): void {
   this.dataCategoryService.addIssue(this.data);
 }
}
