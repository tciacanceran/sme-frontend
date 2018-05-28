import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataFranchiseeService} from '../../services/data-franchisee.service';
import {FormControl, Validators} from '@angular/forms';
import {Franchisee} from '../../models/franchisee';

@Component({
  selector: 'app-add-franchisee',
  templateUrl: './add-franchisee.component.html',
  styleUrls: ['./add-franchisee.component.scss']
})

export class AddFranchiseeComponent {
  constructor(public dialogRef: MatDialogRef<AddFranchiseeComponent>,
             @Inject(MAT_DIALOG_DATA) public data: Franchisee,
             public DataFranchiseeService: DataFranchiseeService) { }

 onNoClick(): void {
   this.dialogRef.close();
 }

 public confirmAdd(): void {
   this.DataFranchiseeService.addIssue(this.data);
 }
}
