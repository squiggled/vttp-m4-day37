import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CityService } from '../city.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrl: './select-city.component.css',
})
export class SelectCityComponent implements OnInit, OnDestroy {
  private citySvc = inject(CityService);
  subscription!: Subscription;
  cities$!: Observable<string[]>;
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
    const city = this.addCityForm.get('city')?.value.trim();
    this.citySvc.addCity(city); //just call the svc directly
    this.addCityForm.reset();
  }

  deleteCity(city:string){
    this.citySvc.deleteCity(city);
  }
  //flow: data from add component -> create a subject in add -> data is sent to service via subject->
  //service creates an observable -> list subscribes to service's observable using subscription

  //on clicking the city, we pass the city name to service, who gets the data, then passes it to city-details component
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
