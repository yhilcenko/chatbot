import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../app-state';
import { Intent } from '../shared/domain/intent';
import { GetIntent } from '../store/intents.actions';
import { getIntent } from '../store/intents.reducers';

@Component({
  selector: 'app-intent-detail',
  templateUrl: './intent-detail.component.html',
  styleUrls: ['./intent-detail.component.css']
})
export class IntentDetailComponent implements OnInit {

  intent$: Observable<Intent>;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.store.dispatch(new GetIntent(+params['id']));
    });
    this.intent$ = this.store.pipe(select(getIntent));
  }

}
