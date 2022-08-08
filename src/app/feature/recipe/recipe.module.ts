import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThaibathPipe } from './thaibath.pipe';

const routes: Routes = [
  {
    path:'',
    component: RecipeComponent
  }
]

@NgModule({
  declarations: [
    RecipeComponent,
    ThaibathPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RecipeModule { }
