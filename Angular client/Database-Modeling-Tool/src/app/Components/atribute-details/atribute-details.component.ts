import { CommunicationService } from './../../Services/communication.service';
import { Column } from './../../Data/column';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-atribute-details',
  templateUrl: './atribute-details.component.html',
  styleUrls: ['./atribute-details.component.css'],
})
export class AtributeDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogRef: MatDialogRef<AtributeDetailsComponent>,
    public comService: CommunicationService
  ) {
    debugger;
    this.column = data ? data : new Column('', '');
  }
  columnSettings: FormGroup;
  column: Column;

  columnType: string[] = ['VARCHAR', 'NUMBER', 'BOLL', 'BLOB'];
  ngOnInit(): void {
    this.columnSettings = new FormGroup({
      ColumnName: new FormControl(this.column.columnName, Validators.required),
      Type: new FormControl(this.column.type, Validators.required),
      Lenght: new FormControl(this.column.maxLenght, Validators.required),
      IsPrimaryKey: new FormControl(this.column.isPrimaryKey),
      IsNull: new FormControl(this.column.isNull),
      DefaultValue: new FormControl(this.column.isDefaultValue),
    });
    this.comService.get('getDbType').subscribe((res) => {
      console.log(res);
      this.columnType = res.map((i: any) => i.type);
    });
  }
  onClose() {
    var controls = this.columnSettings.controls;
    // var col = new Column(
    debugger;
    if (this.columnSettings.valid) {
      (this.column.columnName = controls.ColumnName.value),
        (this.column.type = controls.Type.value),
        (this.column.maxLenght = controls.Lenght.value),
        (this.column.isPrimaryKey = controls.IsPrimaryKey.value),
        (this.column.isNull = controls.IsNull.value),
        (this.column.isDefaultValue = controls.DefaultValue.value);
      // );
      this._dialogRef.close({
        name: this.column.columnName,
        data: this.column,
      });
    }
  }

  onCancel() {
    this._dialogRef.close();
  }
}
