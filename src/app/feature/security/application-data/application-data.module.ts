import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationDataRouterContainer } from './router/application-data-router/application-data-router.container';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationDataContainerContainer } from './container/application-data-container/application-data-container.container';
import { ApplicationDataListComponent } from './presenter/application-data-list/application-data-list.component';
import { ApplicationDataSearchComponent } from './presenter/application-data-search/application-data-search.component';
import { ApplicationDataFormComponent } from './presenter/application-data-form/application-data-form.component';

const routes: Routes = [
  {
    path:'',
    component:ApplicationDataRouterContainer,
    children:[
      {
        path:'',
        component: ApplicationDataContainerContainer
      },
      {
        path:'add',
        component: ApplicationDataFormComponent
      },
      {
        path:'edit/:id',
        component: ApplicationDataFormComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ApplicationDataRouterContainer,
    ApplicationDataContainerContainer,
    ApplicationDataListComponent,
    ApplicationDataSearchComponent,
    ApplicationDataFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ApplicationDataModule { }
