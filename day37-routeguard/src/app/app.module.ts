import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form.component';
import { MainComponent } from './components/main.component';
import { NoticeComponent } from './components/notice.component';
import { RouteService } from './route.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserStorage } from './user.storage.service';
import { StorageService } from './storage.service';
import { SuccessComponent } from './components/success.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MainComponent,
    NoticeComponent,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, HttpClientModule
  ],
  providers: [RouteService, UserStorage, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
