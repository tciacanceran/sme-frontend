import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataFranchiseeService} from '../../services/data-franchisee.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-franchisee',
  templateUrl: './edit-franchisee.component.html',
  styleUrls: ['./edit-franchisee.component.scss']
})
export class EditFranchiseeComponent {

  constructor(public dialogRef: MatDialogRef<EditFranchiseeComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any, public dataFranchiseeService: DataFranchiseeService) { }

 onNoClick(): void {
   this.dialogRef.close();
 }

 stopEdit(): void {
   this.dataFranchiseeService.updateIssue(this.data);
 }
}
