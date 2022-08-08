import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportContactListComponent } from './import-contact-list/import-contact-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:ImportContactListComponent
  },
  
]

@NgModule({
  declarations: [ImportContactListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ImportContactModule { }
