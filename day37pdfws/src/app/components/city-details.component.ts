import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../city.service';
import { CityData } from '../models';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrl: './city-details.component.css'
})
export class CityDetailsComponent implements OnInit{

  constructor (private actRoute: ActivatedRoute){}
  private citySvc = inject(CityService);
  city!:string; 
  cityPromise$!: Promise<any>
  cityData!:CityData;

  ngOnInit(): void {
    this.city = this.actRoute.snapshot.params['city'];
    this.cityPromise$ = this.citySvc.getCityNameFromDeets(this.city)
      // .then(data=>{this.apiResponse=data})
      .then((data)=>{
        this.cityData = {
          name: this.city,
          temp: data.main.temp,
          tempFeelsLike: data.main.feels_like,
          tempMin: data.main.temp_min,
          tempMax: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
          visibility: data.visibility,
          windSpeed: data.wind.speed
        }
      } )
      .catch((error)=> {console.log(error)});
  }

}
