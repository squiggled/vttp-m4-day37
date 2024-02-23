import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService extends Dexie{
  

  private cities: string[] = ['singapore', 'new york'];
  private citiesSubject = new Subject<string[]>(); //subjects are both observers and observables. 
  //This means it can emit values to multiple subscribers and also subscribe to other observables.
  // can have multiple compoenets subscribing to one subject
  cities$ = this.citiesSubject.asObservable();

  city!:string;
  apiKey: string = "c83eae8a08ae4387fedd22606b7f4270";
  //for using HTTPParams, remove everything after the question mark, including removing the question mark
  baseUrl:string = 'https://api.openweathermap.org/data/2%2E5/weather'; 
  //sample url: https://api.openweathermap.org/data/2.5/weather?q=new+york&appid=c83eae8a08ae4387fedd22606b7f4270

  private user!:Dexie.Table<string, number>;

  constructor(private httpClient: HttpClient){
    super('dexiedb');
    const COL_CITIES='cities';
    this.version(1).stores({
      [COL_CITIES]: '++id'
    })
  }

  addCity(city:string){
    if (this.cities.includes(city)){
      console.error("city already exists");
    } else {
      this.cities.push(city);
      this.citiesSubject.next([...this.cities]) //use .next() to emit the new value (passed as argument) to all subscribers
    }
  }

  deleteCity(city: string) {
    const index = this.cities.indexOf(city);
    this.cities.splice(index, 1);
    this.citiesSubject.next([...this.cities]);
  }

  getCities(){
    return [...this.cities];
  }
  //flow: data from list -> on add, we call the service directly. 
  //addCity() in service will add the city to the list
  //gene
  //then when adding, we call next on the subject to pass it back to list
  //in list, we subscribe to the observable in the service to get a new list
  getCityNameFromDeets(city:string): Promise<any>{
    this.city = decodeURI(city).replaceAll(" ", "+"); // decodeURI converts back to literal string entered
    var queryParams:HttpParams  = new HttpParams().set("q", city).set("appid", this.apiKey);
    console.log("city in svc: " , city);
    this.city = city;
    return firstValueFrom(
      this.httpClient.get(this.baseUrl, {params: queryParams}))
  }
}
