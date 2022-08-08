import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationUserContainer } from './router/application-user/application-user.container';
import { ApplicationUserListComponent } from './presenter/application-user-list/application-user-list.component';
import { ApplicationUserFormComponent } from './presenter/application-user-form/application-user-form.component';
import { ApplicationUserSearchComponent } from './presenter/application-user-search/application-user-search.component';
import { ApplicationUserComponent } from './container/application-user/application-user.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const route: Routes = [
  {
      path:'',
      component: ApplicationUserContainer,
      children:[
        {
          path:'',
          component: ApplicationUserComponent
        },
        {
          path:'add',
          component: ApplicationUserFormComponent
        },
        {
          path:'edit/:id',
          component: ApplicationUserFormComponent
        }
      ]
  }
]

@NgModule({
  declarations: [
    ApplicationUserContainer, 
    ApplicationUserListComponent, 
    ApplicationUserFormComponent, 
    ApplicationUserSearchComponent, 
    ApplicationUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ]
})
export class ApplicationUserModule { }
