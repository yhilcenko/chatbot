import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { IntentsCreateDialogComponent } from '../intents-create-dialog/intents-create-dialog.component';
import { Intent } from '../shared/domain/intent';

@Component({
  selector: 'app-intents-list',
  templateUrl: './intents-list.component.html',
  styleUrls: ['./intents-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntentsListComponent implements OnInit {

  columns: string[] = ['id', 'formulation', 'answer'];

  @Input()
  intents: Intent[];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(IntentsCreateDialogComponent, dialogConfig);
  }

}
