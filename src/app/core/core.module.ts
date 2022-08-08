import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { StatusModule } from './root-state/status/status.module';




@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StatusModule
  ],
  exports:[
    CommonModule,
    HttpClientModule,
    StatusModule
  ],
  providers :[AuthGuard]
})
export class CoreModule { }
