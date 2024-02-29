import { Component, OnInit, inject } from '@angular/core';
import { RouteService } from '../route.service';
import { UserStorage } from '../user.storage.service';
import { User } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  routeSvc = inject(RouteService)
  userStorage = inject(UserStorage)

  agree = false
  users$!: Promise<User[]>

  ngOnInit(): void {
    this.routeSvc.proceed = this.agree //control the proceed boolean from here
    this.users$ = this.userStorage.getAllUsers()
  }

  checked(checkbox: any) {
    this.agree = checkbox.target.checked //if checked, agree==true
    this.routeSvc.proceed = this.agree //set the proceed value in svc to agree too
    //if we dont click the checkbox, clicking proceed() will direct us to a notice
    //if we click it, clicking proceed() will direct us to form component
    console.info('value == ', this.agree, checkbox.target.checked)
  }

}