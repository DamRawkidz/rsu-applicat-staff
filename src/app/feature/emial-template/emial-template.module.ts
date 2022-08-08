import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmialTemplateFormComponent } from './emial-template-form/emial-template-form.component';
import { EmialTemplateListComponent } from './emial-template-list/emial-template-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:EmialTemplateListComponent
  },
  {
    path:'add',
    component:EmialTemplateFormComponent
  },
  {
    path:'edit/:id',
    component:EmialTemplateFormComponent
  },
]

@NgModule({
  declarations: [EmialTemplateFormComponent, EmialTemplateListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class EmialTemplateModule { }
