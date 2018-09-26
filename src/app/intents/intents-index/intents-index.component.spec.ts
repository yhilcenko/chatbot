import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { IntentsListComponent } from '../intents-list/intents-list.component';
import { reducers } from '../intents.module';

import { IntentsIndexComponent } from './intents-index.component';

describe('IntentsIndexComponent', () => {
  let component: IntentsIndexComponent;
  let fixture: ComponentFixture<IntentsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, StoreModule.forRoot(reducers)],
      declarations: [IntentsIndexComponent, IntentsListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
