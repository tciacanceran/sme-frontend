import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataProductService} from '../../services/data-product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {

  constructor(public dialogRef: MatDialogRef<DeleteProductComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, public DataProductService: DataProductService) { }

 onNoClick(): void {
   this.dialogRef.close();
 }

 confirmDelete(): void {
   this.DataProductService.deleteIssue(this.data.sku);
 }
}
