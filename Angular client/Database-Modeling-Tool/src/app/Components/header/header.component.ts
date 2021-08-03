import { HttpClient } from '@angular/common/http';
import { ConnectDialogComponent } from './../connect-dialog/connect-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private dialogService: MatDialog,
    private httpclient: HttpClient
  ) {}

  ngOnInit(): void {}

  openConnectionDialog() {
    this.dialogService.open(ConnectDialogComponent, { disableClose: false });
  }
}
