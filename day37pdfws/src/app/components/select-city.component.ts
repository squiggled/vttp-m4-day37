import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CityService } from '../city.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CityName } from '../models';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrl: './select-city.component.css',
})
export class SelectCityComponent implements OnInit {
  private citySvc = inject(CityService);
  cities$!: Observable<CityName[]>;
  cities: string[] = [];

  addCityForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addCityForm = this.fb.group({
      city: this.fb.control<string>(''),
    });
    this.cities$ = this.citySvc.cities$;
    //subscribe to future updates
    // this.subscription = this.citySvc.cities$.subscribe((cities) => {
    //   this.cities = cities;
    // }); //reassign updated list of cities to cities
  }

  addCity() {
    const city = this.addCityForm.get('city')?.value.trim(); //we need to map the data in input to an object
    const cityObj:CityName = {name: city};
    console.log("city in select city component:", city);
    
    this.citySvc.addCity(cityObj); //just call the svc directly
    this.addCityForm.reset();
  }

  deleteCity(city:string){
    this.citySvc.deleteCity(city);
  }
  //flow: data from add component -> create a subject in add -> data is sent to service via subject->
  //service creates an observable -> list subscribes to service's observable using subscription


}
