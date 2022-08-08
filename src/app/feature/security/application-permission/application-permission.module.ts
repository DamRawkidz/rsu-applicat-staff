import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPermissionRouterContainer } from './router/application-permission-router/application-permission-router.container';
import { ApplicationPermissionListComponent } from './presenter/application-permission-list/application-permission-list.component';
import { ApplicationPermissionFormComponent } from './presenter/application-permission-form/application-permission-form.component';
import { ApplicationPermissionSearchComponent } from './presenter/application-permission-search/application-permission-search.component';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPermissionContainer } from './container/application-permission/application-permission.container';
import { SharedModule } from 'src/app/shared/shared.module';

const route: Routes = [
  {
    path:'',
    component: ApplicationPermissionRouterContainer,
    children:[
      {
        path:'',
        component: ApplicationPermissionContainer
      },
      {
        path:'add',
        component: ApplicationPermissionFormComponent
      },
      {
        path:'edit/:id',
        component: ApplicationPermissionFormComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ApplicationPermissionRouterContainer, 
    ApplicationPermissionListComponent, 
    ApplicationPermissionFormComponent, 
    ApplicationPermissionSearchComponent,
    ApplicationPermissionContainer
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class ApplicationPermissionModule { }
