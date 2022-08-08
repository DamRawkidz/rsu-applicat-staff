import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTypeListComponent } from './document-type-list/document-type-list.component';
import { DocumentTypeFormComponent } from './document-type-form/document-type-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:DocumentTypeListComponent
  },
  {
    path:'add',
    component:DocumentTypeFormComponent
  },
  {
    path:'edit/:id',
    component:DocumentTypeFormComponent
  },
]

@NgModule({
  declarations: [DocumentTypeListComponent, DocumentTypeFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DocumentTypeModule { }
