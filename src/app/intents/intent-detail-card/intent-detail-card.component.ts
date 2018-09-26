import { Component, Input, OnInit } from '@angular/core';
import { Intent } from '../shared/domain/intent';

@Component({
  selector: 'app-intent-detail-card',
  templateUrl: './intent-detail-card.component.html',
  styleUrls: ['./intent-detail-card.component.css']
})
export class IntentDetailCardComponent implements OnInit {

  @Input()
  intent: Intent;

  constructor() {
  }

  ngOnInit() {
  }

}
