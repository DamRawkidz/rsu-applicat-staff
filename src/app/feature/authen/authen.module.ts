import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenComponent } from './authen.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DialogDemoComponent } from './dialog-demo/dialog-demo.component';

const routes:Routes = [
  {
    path:'',
    component:AuthenComponent
  }
]

@NgModule({
  declarations: [
    AuthenComponent,
    DialogDemoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AuthenModule { }
