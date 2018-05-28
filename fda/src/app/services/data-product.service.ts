import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Product} from '../models/product';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Headers, RequestOptions} from '@angular/http';

@Injectable()
export class DataProductService {
  private readonly API_URL = 'http://192.168.0.78:8000/products';

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor (private httpClient: HttpClient) {}

  get data(): Product[] {
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


    this.httpClient.get<Product[]>(url,{headers: headers}).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (product: Product): void {
    this.dialogData = product;
  }

  updateIssue (product: Product): void {
    this.dialogData = product;
  }

  deleteIssue (sku: string): void {
    console.log(sku);
  }
}



/*
    // ADD, POST METHOD
    addItem(product: Product): void {
    this.httpClient.post(this.API_URL, product).subscribe(data => {
      this.dialogData = product;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }
    // UPDATE, PUT METHOD
     updateItem(product: Product): void {
    this.httpClient.put(this.API_URL + product.id, product).subscribe(data => {
        this.dialogData = product;
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
