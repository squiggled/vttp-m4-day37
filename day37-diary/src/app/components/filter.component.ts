import { Component, inject } from '@angular/core';
import { DiaryService } from '../diary-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  private diarySvc = inject(DiaryService);

  filter(elem: any) {
    console.info('elem: ', elem.target.value)
    const category: string = elem.target.value;
    this.diarySvc.getEntryByType(category);
  }

}
