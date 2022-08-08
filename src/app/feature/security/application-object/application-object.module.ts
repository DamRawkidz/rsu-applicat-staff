import { ApplicationObjectContainer } from './container/application-object/application-object.container';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationObjectRouterContainer } from './router/application-object-router/application-object-router.container';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router, RouterModule, Routes } from '@angular/router';
import { ApplicationObjectListComponent } from './presenter/application-object-list/application-object-list.component';
import { ApplicationObjectSearchComponent } from './presenter/application-object-search/application-object-search.component';
import { ApplicationObjectFormComponent } from './presenter/application-object-form/application-object-form.component';

const routes: Routes = [
  {
    path:'',
    component: ApplicationObjectRouterContainer,
    children:[
      {
        path:'',
        component: ApplicationObjectContainer
      },
      {
        path:'add',
        component: ApplicationObjectFormComponent
      },
      {
        path:'edit/:id',
        component: ApplicationObjectFormComponent
      }
    ]
  }
]


@NgModule({
  declarations: [
    ApplicationObjectRouterContainer,
    ApplicationObjectListComponent,
    ApplicationObjectSearchComponent,
    ApplicationObjectFormComponent,
    ApplicationObjectContainer
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ApplicationObjectModule { }
