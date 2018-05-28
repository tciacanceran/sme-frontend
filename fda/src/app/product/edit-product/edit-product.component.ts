import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataProductService} from '../../services/data-product.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, public DataProductService: DataProductService) { }

 
 onNoClick(): void {
   this.dialogRef.close();
 }

 stopEdit(): void {
   this.DataProductService.updateIssue(this.data);
 }
}
