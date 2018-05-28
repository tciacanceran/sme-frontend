import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,  FormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DataCategoryService } from './services/data-category.service';
import { DataSizeService } from './services/data-size.service';
import { DataFranchiseeService } from './services/data-franchisee.service';
import { DataProductService } from './services/data-product.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { SizeComponent } from './size/size.component';
import { FranchiseeComponent } from './franchisee/franchisee.component';

import { AddCategoryComponent } from './category/add-category/add-category.component';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AddSizeComponent } from './size/add-size/add-size.component';
import { DeleteSizeComponent } from './size/delete-size/delete-size.component';
import { EditSizeComponent } from './size/edit-size/edit-size.component';
import { AddFranchiseeComponent } from './franchisee/add-franchisee/add-franchisee.component';
import { EditFranchiseeComponent } from './franchisee/edit-franchisee/edit-franchisee.component';
import { DeleteFranchiseeComponent } from './franchisee/delete-franchisee/delete-franchisee.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    SizeComponent,
    LoginComponent,
    DashboardComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    AddSizeComponent,
    DeleteSizeComponent,
    EditSizeComponent,
    FranchiseeComponent,
    AddFranchiseeComponent,
    EditFranchiseeComponent,
    DeleteFranchiseeComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddCategoryComponent,
    EditCategoryComponent,
    DeleteCategoryComponent,
    AddSizeComponent,
    DeleteSizeComponent,
    EditSizeComponent,
    AddFranchiseeComponent,
    EditFranchiseeComponent,
    DeleteFranchiseeComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent
  ],
  providers: [AuthGuard,
              AuthService,
              DataCategoryService,
              DataSizeService,
              DataFranchiseeService,
              DataProductService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true
              }],
  bootstrap: [AppComponent]
})
export class AppModule { }
