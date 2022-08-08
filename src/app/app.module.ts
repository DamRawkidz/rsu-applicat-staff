import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ToolbarLayoutComponent } from './layout/toolbar-layout/toolbar-layout.component';
import { FooterLayoutComponent } from './layout/footer-layout/footer-layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenIntercepterInterceptor } from './core/intercepter/token-intercepter.interceptor';
import { MenuLeftLayoutComponent } from './layout/menu-left-layout/menu-left-layout.component';
import { LogInComponent } from './layout/log-in/log-in.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducers } from './state/app-reducer';




export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state); 
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ToolbarLayoutComponent,
    FooterLayoutComponent,
    MenuLeftLayoutComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    EditorModule,
    StoreModule.forRoot(appReducers,{ 
      metaReducers,
      runtimeChecks:{
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenIntercepterInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
