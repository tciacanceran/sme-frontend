import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { FranchiseeComponent } from './franchisee/franchisee.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { SizeComponent } from './size/size.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent, children:[
      {
        path: 'franchisee',
        component: FranchiseeComponent,
        outlet: 'dashBoard'
      },
      {
        path: 'category',
        component: CategoryComponent,
        outlet: 'dashBoard'
      },
      {
        path: 'product',
        component: ProductComponent,
        outlet: 'dashBoard'
      },
      {
        path: 'size',
        component: SizeComponent,
        outlet: 'dashBoard'
      }
    ],
    canActivate: [AuthGuard]
  },
   { path : '', redirectTo:'/login', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
