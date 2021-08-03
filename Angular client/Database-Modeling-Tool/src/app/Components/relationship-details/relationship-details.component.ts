import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-relationship-details',
  templateUrl: './relationship-details.component.html',
  styleUrls: ['./relationship-details.component.css'],
})
export class RelationshipDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialogRef: MatDialogRef<RelationshipDetailsComponent>
  ) {}

  ngOnInit(): void {}
}
