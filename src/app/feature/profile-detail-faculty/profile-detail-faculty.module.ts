import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailFacultyListComponent } from './profile-detail-faculty-list/profile-detail-faculty-list.component';
import { ProfileDetailFacultyFormComponent } from './profile-detail-faculty-form/profile-detail-faculty-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShowTablePipe } from './profile-detail-faculty-list/show-table.pipe';

const routes:Routes = [
  {
    path:'',
    component:ProfileDetailFacultyListComponent
  },
  {
    path:'add',
    component:ProfileDetailFacultyFormComponent
  },
  {
    path:'edit/:id',
    component:ProfileDetailFacultyFormComponent
  },
]

@NgModule({
  declarations: [ProfileDetailFacultyListComponent, ProfileDetailFacultyFormComponent, ShowTablePipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ProfileDetailFacultyModule { }
