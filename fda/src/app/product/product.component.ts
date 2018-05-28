import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataProductService} from '../services/data-product.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Product} from '../models/product';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AddProductComponent} from './add-product/add-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {DeleteProductComponent} from './delete-product/delete-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  displayedColumns = [ 'sku', 'product_name', 'category', 'size', 'flavor', 'price', 'actions'];
  exampleDatabase: DataProductService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  sku: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataProductService: DataProductService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(product: Product) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: {product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // Update the table after closing the dialog
        // Push a new row inside the dataProductService
        this.exampleDatabase.dataChange.value.push(this.dataProductService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, sku: string, product_name: string, category: string, size: string, flavor: string, price: string) {
    this.sku = sku;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: { sku: sku, product_name: product_name, category: category, size: size, flavor: flavor, price:price}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // Using the sku, find the record inside DataProductService
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.sku === this.sku);
        // Update the record using the newly input values
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataProductService.getDialogData();
        // Refresh table to view changes
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, sku: string, product_name: string, category: string, size: string, flavor: string, price: string) {
    this.index = i;
    this.sku = sku;
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: {sku: sku, product_name: product_name, category: category, size: size, flavor: flavor, price:price}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.sku === this.sku);
        // Delete using splice
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // if there's a paginator active, use it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case last page
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new DataProductService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}

export class ExampleDataSource extends DataSource<Product> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Product[] = [];
  renderedData: Product[] = [];

  constructor(public _exampleDatabase: DataProductService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Product[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((product: Product) => {
        const searchStr = (product.sku + product.product_name + product.category + product.size + product.flavor + product.price).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }



  /** Returns a sorted copy of the database data. */
  sortData(data: Product[]): Product[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'sku': [propertyA, propertyB] = [a.sku, b.sku]; break;
        case 'product_name': [propertyA, propertyB] = [a.product_name, b.product_name]; break;
        case 'category': [propertyA, propertyB] = [a.category, b.category]; break;
        case 'size': [propertyA, propertyB] = [a.size, b.size]; break;
        case 'flavor': [propertyA, propertyB] = [a.flavor, b.flavor]; break;
        case 'price': [propertyA, propertyB] = [a.price, b.price]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
