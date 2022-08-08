import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteProfileDetailListComponent } from './delete-profile-detail-list/delete-profile-detail-list.component';
import { DeleteProfileDetailFormComponent } from './delete-profile-detail-form/delete-profile-detail-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes = [
  {
    path:'',
    component:DeleteProfileDetailListComponent
  },
  {
    path:'add',
    component:DeleteProfileDetailFormComponent
  },
  {
    path:'edit/:id',
    component:DeleteProfileDetailFormComponent
  },
]

@NgModule({
  declarations: [DeleteProfileDetailListComponent, DeleteProfileDetailFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DeleteProfileDetailModule { }
