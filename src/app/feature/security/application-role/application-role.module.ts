import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoleSearchComponent } from './presenter/application-role-search/application-role-search.component';
import { ApplicationRoleListComponent } from './presenter/application-role-list/application-role-list.component';
import { ApplicationRoleFormComponent } from './presenter/application-role-form/application-role-form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationRoleContainer } from './container/application-role/application-role.container';
import { ApplicationRoleRouter } from './router/application-role/application-role.container';

const routes: Routes = [
  {
    path:'',
    component: ApplicationRoleRouter,
    children:[
      {
        path: '',
        component: ApplicationRoleContainer
      },
      {
        path: 'add',
        component: ApplicationRoleFormComponent
      },
      {
        path:'edit/:id',
        component: ApplicationRoleFormComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ApplicationRoleContainer, 
    ApplicationRoleSearchComponent, 
    ApplicationRoleListComponent, 
    ApplicationRoleFormComponent,
    ApplicationRoleRouter
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ApplicationRoleModule { }
