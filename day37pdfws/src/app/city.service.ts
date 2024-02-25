import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { BehaviorSubject, Observable, Subject, firstValueFrom } from 'rxjs';
import { CityName } from './models';

@Injectable({
  providedIn: 'root'
})
export class CityService extends Dexie{
  

  // private cities: string[] = ['singapore', 'new york'];
  private citiesSubject = new BehaviorSubject<CityName[]>([]); //behavour subject must have an initial value
  cities$ = this.citiesSubject.asObservable();

  city!:string;
  apiKey: string = "c83eae8a08ae4387fedd22606b7f4270";
  //for using HTTPParams, remove everything after the question mark, including removing the question mark
  baseUrl:string = 'https://api.openweathermap.org/data/2%2E5/weather'; 
  //sample url: https://api.openweathermap.org/data/2.5/weather?q=new+york&appid=c83eae8a08ae4387fedd22606b7f4270

  private cities!:Dexie.Table<CityName, number>;

  constructor(private httpClient: HttpClient){
    super('dexiedb');
    const COL_CITIES='cities';
    this.version(3).stores({
      [COL_CITIES]: '++id, &name'
    })
    this.cities=this.table(COL_CITIES);
    //initial load - getcities returns a promise, so we unpack
    this.getCities().then(
      result => this.citiesSubject.next(result)
    )
  }

  getCities() : Promise<CityName[]>{
    return this.cities.toArray();
  }

  async addCity(city: CityName){
    await this.cities.add(city);
    const allCities = await this.cities.toArray(); //get the new updated list
    this.citiesSubject.next(allCities);
    //then fire the new list as a subject
  }

  async deleteCity(cityName: string){
    //setting up query using where/equals is sync, but .first()/.delete are async
    const cityObject = await this.cities.where('name').equals(cityName).first(); //we need to await this
    if (!!cityObject && cityObject.id!=undefined){
      await this.cities.delete(cityObject.id);
      const allCities = await this.cities.toArray();
      this.citiesSubject.next(allCities);
    }
  }
 
  getCityNameFromDeets(city:string): Promise<any>{
    this.city = decodeURI(city).replaceAll(" ", "+"); // decodeURI converts back to literal string entered
    var queryParams:HttpParams  = new HttpParams().set("q", city).set("appid", this.apiKey);
    console.log("city in svc: " , city);
    this.city = city;
    return firstValueFrom(
      this.httpClient.get(this.baseUrl, {params: queryParams}))
  }
}
