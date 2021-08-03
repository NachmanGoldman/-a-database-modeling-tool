import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectionService } from 'src/app/Services/connection.service';
import { delay, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-connect-dialog',
  templateUrl: './connect-dialog.component.html',
  styleUrls: ['./connect-dialog.component.css'],
})
export class ConnectDialogComponent implements OnInit {
  hide = true;
  connecting: boolean = false;

  constructor(
    private connectionService: ConnectionService,
    private router: Router,
    private dialogRef: MatDialogRef<ConnectDialogComponent>,
    private toastr: ToastrService
  ) {}
  ConnectionForm: FormGroup;
  ngOnInit(): void {
    this.ConnectionForm = new FormGroup({
      DataSource: new FormControl('', Validators.required),
      UserID: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      InitialCatalog: new FormControl('', Validators.required),
    });
  }
  onConnect() {
    if (this.ConnectionForm.valid) {
      this.connecting = true;
      this.connectionService
        .Connect({
          DataSource: this.ConnectionForm.controls.DataSource.value,
          UserID: this.ConnectionForm.controls.UserID.value,
          Password: this.ConnectionForm.controls.Password.value,
          InitialCatalog: this.ConnectionForm.controls.InitialCatalog.value,
        })
        .pipe(take(1))
        .subscribe((res) => {
          console.log(res);
          this.connecting = false;

          if (res.successed) {
            debugger;
            this.toastr.success(res.massege);
            this.dialogRef.close();
            this.router.navigate(['table-list']);
          } else {
            this.toastr.error(res.massege);
          }
        });
    }
  }
}
