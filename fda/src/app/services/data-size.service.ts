import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Size} from '../models/size';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Headers, RequestOptions} from '@angular/http';

@Injectable()
export class DataSizeService {
  private readonly API_URL = 'http://192.168.0.78:8000/products/size';

  dataChange: BehaviorSubject<Size[]> = new BehaviorSubject<Size[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Size[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    console.log(localStorage.token)
    console.log(this.API_URL)
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', localStorage.token);

    let lastId = 1, maxNum = 10;
    let url = `${this.API_URL}/${lastId}/${maxNum}`

    this.httpClient.get<Size[]>(url,{headers: headers}).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (size: Size): void {
    this.dialogData = size;
  }

  updateIssue (size: Size): void {
    this.dialogData = size;
  }

  deleteIssue (code: string): void {
    console.log(code);
  }
}



/*
    // ADD, POST METHOD
    addItem(size: Size): void {
    this.httpClient.post(this.API_URL, size).subscribe(data => {
      this.dialogData = size;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }
    // UPDATE, PUT METHOD
     updateItem(size: Size): void {
    this.httpClient.put(this.API_URL + size.id, size).subscribe(data => {
        this.dialogData = size;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/
