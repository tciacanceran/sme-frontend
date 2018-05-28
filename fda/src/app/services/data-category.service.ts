import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Category} from '../models/category';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Headers, RequestOptions} from '@angular/http';

@Injectable()
export class DataCategoryService {

  private readonly API_URL = 'http://192.168.0.78:8000/products/category';

  dataChange: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {
  //  this.displayHeaders();
  }

  // displayHeaders(){ //Append x-access-token to the header
  //   let header = new HttpHeaders();
  //   let anotherHeader = header.append('x-access-token', localStorage.token);
  //   console.log("X-ACCESS-TOKEN: " + anotherHeader.get('x-access-token'));
  // }

  get data(): Category[] {
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


    this.httpClient.get<Category[]>(url,{headers: headers}).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (category: Category): void {
    this.dialogData = category;
  }

  updateIssue (category: Category): void {
    this.dialogData = category;
  }

  deleteIssue (code: string): void {
    console.log(code);
  }
}



/*
    // ADD, POST METHOD
    addItem(category: Category): void {
    this.httpClient.post(this.API_URL, category).subscribe(data => {
      this.dialogData = category;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }
    // UPDATE, PUT METHOD
     updateItem(category: Category): void {
    this.httpClient.put(this.API_URL + category.id, category).subscribe(data => {
        this.dialogData = category;
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
