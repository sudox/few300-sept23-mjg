import { Component, OnInit } from '@angular/core';
import { GiftGivingState } from '../../../reducers';
import * as actions from '../../../actions/holidays.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-holiday-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  addItem(nameEl: HTMLInputElement, dateEl: HTMLInputElement) {
    const name = nameEl.value;
    const date = dateEl.valueAsDate.toISOString();
    this.store.dispatch(actions.holidayAdded({ name, date }));

    nameEl.value = '';
    dateEl.value = '';
    nameEl.focus();
  }

}
