import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSizeService} from '../services/data-size.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Size} from '../models/size';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AddSizeComponent} from './add-size/add-size.component';
import {EditSizeComponent} from './edit-size/edit-size.component';
import {DeleteSizeComponent} from './delete-size/delete-size.component';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {
  displayedColumns = [ 'code', 'description', 'actions'];
  exampleDatabase: DataSizeService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  code: string;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataSizeService: DataSizeService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(size: Size) {
    const dialogRef = this.dialog.open(AddSizeComponent, {
      data: {size: size }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // Update the table after closing the dialog
        // Push a new row inside the dataSizeService
        this.exampleDatabase.dataChange.value.push(this.dataSizeService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, code: string, description: string) {
    this.code = code;
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditSizeComponent, {
      data: { code: code, description: description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // Using the code, find the record inside DataSizeService
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.code === this.code);
        // Update the record using the newly input values
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataSizeService.getDialogData();
        // Refresh table to view changes
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, code: string, description: string) {
    this.index = i;
    this.code = code;
    const dialogRef = this.dialog.open(DeleteSizeComponent, {
      data: {code: code, description: description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.code === this.code);
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
    this.exampleDatabase = new DataSizeService(this.httpClient);
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

export class ExampleDataSource extends DataSource<Size> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Size[] = [];
  renderedData: Size[] = [];

  constructor(public _exampleDatabase: DataSizeService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Size[]> {
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
      this.filteredData = this._exampleDatabase.data.slice().filter((size: Size) => {
        const searchStr = (size.code + size.description).toLowerCase();
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
  sortData(data: Size[]): Size[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'code': [propertyA, propertyB] = [a.code, b.code]; break;
        case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
