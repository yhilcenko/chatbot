import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { IntentDetailCardComponent } from '../intent-detail-card/intent-detail-card.component';
import { reducers } from '../intents.module';

import { IntentDetailComponent } from './intent-detail.component';


describe('IntentDetailComponent', () => {
  let component: IntentDetailComponent;
  let fixture: ComponentFixture<IntentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, StoreModule.forRoot(reducers)],
      declarations: [IntentDetailComponent, IntentDetailCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
