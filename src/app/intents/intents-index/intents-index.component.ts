import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app-state';
import { Intent } from '../shared/domain/intent';
import { GetAllIntents } from '../store/intents.actions';
import { getAllIntents, getIntentsError } from '../store/intents.reducers';

@Component({
  selector: 'app-intents-index',
  templateUrl: './intents-index.component.html',
  styleUrls: ['./intents-index.component.css']
})
export class IntentsIndexComponent implements OnInit {

  intents$: Observable<Intent[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAllIntents());
    this.store.pipe(select(getIntentsError))
      .subscribe((error) => this.loadingError(error));
    this.intents$ = this.store.pipe(select(getAllIntents));
  }

  loadingError(error) {
    if (error) {
      alert('Error while loading the list of intents');
    }
  }
}
