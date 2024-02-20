import { Component, OnInit, inject } from '@angular/core';
import { DiaryService } from '../diary-service.service';
import { Observable, Subscription, from } from 'rxjs';
import { Diary } from '../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  private diarySvc = inject(DiaryService);
 
  entries$!: Observable<Diary[]>;


  //an observable is a QUERY; 
  ngOnInit(): void {
    this.entries$ = this.diarySvc.entries$;
    //dont need to subscribe anymore as we just make sure the entries is the same 
    //as the one in the store

  }

}
