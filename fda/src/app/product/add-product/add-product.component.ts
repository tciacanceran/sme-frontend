import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataProductService} from '../../services/data-product.service';
import {FormControl, Validators} from '@angular/forms';
import {Product} from '../../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent {
  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Product,
             public DataProductService: DataProductService) { }

 onNoClick(): void {
   this.dialogRef.close();
 }

 public confirmAdd(): void {
   this.DataProductService.addIssue(this.data);
 }
}
