import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataFranchiseeService} from '../../services/data-franchisee.service';

@Component({
  selector: 'app-delete-franchisee',
  templateUrl: './delete-franchisee.component.html',
  styleUrls: ['./delete-franchisee.component.scss']
})
export class DeleteFranchiseeComponent {

  constructor(public dialogRef: MatDialogRef<DeleteFranchiseeComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, public dataFranchiseeService: DataFranchiseeService) { }

 onNoClick(): void {
   this.dialogRef.close();
 }

 confirmDelete(): void {
   this.dataFranchiseeService.deleteIssue(this.data.code);
 }
}
