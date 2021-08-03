import { Table } from './../../Data/create-table-request';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css'],
})
export class EntityDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogRef: MatDialogRef<EntityDetailsComponent>
  ) {
    this.table = data ? data : new Table('', [], false, []);
  }

  table: Table;
  tableSettings: FormGroup;
  ngOnInit(): void {
    this.tableSettings = new FormGroup({
      tableName: new FormControl(this.table.TableName, Validators.required),
    });
  }

  onClose() {
    if (this.tableSettings.valid) {
      this.table.TableName = this.tableSettings.controls.tableName.value;
      this._dialogRef.close({
        name: this.table.TableName,
        data: this.table,
      });
    }
  }
  onCancel() {
    this._dialogRef.close();
  }
}
