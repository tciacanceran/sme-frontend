import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataCategoryService} from '../../services/data-category.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCategoryComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, public DataCategoryService: DataCategoryService) { }

 onNoClick(): void {
   this.dialogRef.close();
 }

 confirmDelete(): void {
   this.DataCategoryService.deleteIssue(this.data.code);
 }
}
