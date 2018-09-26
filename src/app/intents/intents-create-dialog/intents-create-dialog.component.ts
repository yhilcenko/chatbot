import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state';
import { Intent } from '../shared/domain/intent';
import { IntentsService } from '../shared/services/intents.service';
import { ValidateFirstFormulationNotTaken } from '../shared/validator/validate-first-formulation-not-taken';
import { AddIntent } from '../store/intents.actions';

@Component({
  selector: 'app-intents-create-dialog',
  templateUrl: './intents-create-dialog.component.html',
  styleUrls: ['./intents-create-dialog.component.css']
})
export class IntentsCreateDialogComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private service: IntentsService,
              private dialogRef: MatDialogRef<IntentsCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      formulations: ['', Validators.required, ValidateFirstFormulationNotTaken.createValidator(this.service)],
      answer: ['', Validators.required]
    });
  }

  submit() {
    const newIntent = new Intent();
    newIntent.formulations = this.formGroup.value.formulations.split(/\n+/);
    newIntent.answer =  this.formGroup.value.answer;
    this.store.dispatch(new AddIntent(newIntent));
  }

  close() {
    this.dialogRef.close();
  }

}
