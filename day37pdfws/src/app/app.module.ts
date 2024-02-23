import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityService } from './city.service';
import { SelectCityComponent } from './components/select-city.component';
import { CityDetailsComponent } from './components/city-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const appRoute: Routes = [
  {path: '', component:SelectCityComponent},
  {path:'city/:city', component:CityDetailsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SelectCityComponent,
    CityDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule
  ],
  providers: [CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
