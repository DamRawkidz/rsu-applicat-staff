import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StatusReducer } from './reducer/status.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StatusEffects } from './effects/status.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('status',StatusReducer),
    EffectsModule.forFeature([
      StatusEffects
    ])
  ],
  exports:[
    StoreModule,
    EffectsModule
  ]
})
export class StatusModule { }
