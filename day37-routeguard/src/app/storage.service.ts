import { Injectable } from "@angular/core";
import { User } from "./models";

@Injectable()
export class StorageService {

  saveToLocalStorage(user: User) {
    localStorage.setItem('data', JSON.stringify(user))
  }

  getFromLocalStroage(): User | undefined {
    const u = localStorage.getItem('data')
    if (!!u) //if true
      return JSON.parse(u) as User
    return undefined
  }
}