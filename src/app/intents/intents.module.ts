import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { IntentsCreateDialogComponent } from './intents-create-dialog/intents-create-dialog.component';
import { IntentsIndexComponent } from './intents-index/intents-index.component';
import { IntentsListComponent } from './intents-list/intents-list.component';
import { IntentEffects } from './store/intents.effects';
import * as intentReducer from './store/intents.reducers';
import { IntentDetailComponent } from './intent-detail/intent-detail.component';
import { IntentDetailCardComponent } from './intent-detail-card/intent-detail-card.component';

const routes: Routes = [
  {
    path: '',
    component: IntentsIndexComponent,
  },
  {
    path: ':id',
    component: IntentDetailComponent
  },
];

export const reducers: ActionReducerMap<any> = {
  intents: intentReducer.reducer,
};

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([IntentEffects]),
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntentsListComponent,
    IntentsIndexComponent,
    IntentsCreateDialogComponent,
    IntentDetailComponent,
    IntentDetailCardComponent
  ],
  entryComponents: [
    IntentsCreateDialogComponent
  ]
})
export class IntentsModule {
}
