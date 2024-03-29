import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form.component';
import { ListComponent } from './components/list.component';
import { DiaryService } from './diary-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DiaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
