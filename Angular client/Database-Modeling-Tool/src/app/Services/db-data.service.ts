import { ToastrService } from 'ngx-toastr';
import { Table } from './../Data/create-table-request';
import { AppComponent } from './../app.component';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CommunicationService } from './communication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DBDataService {
  constructor(
    private _CommunicationService: CommunicationService,
    public _tS: ToastrService,
    public router: Router
  ) {}
  tableListSubject: Subject<string[]> = new Subject<string[]>();

  tableList: Array<Table> = new Array<Table>();
  getTable(tableId: string): Observable<any> {
    return this._CommunicationService.get(tableId);
    // return new Observable<any>((subsciber) =>
    //   subsciber.next(this.tableList.find((i) => i.TableName == tableId))
    // );
    // return this.db.Tables.find((table) => table.TableId == tableId) as TableDB;
  }

  createTable(table: Table) {
    if (this.tableList.find((i) => i.TableName == table.TableName)) {
      this.tableList = this.tableList.filter(
        (item) => item.TableName != table.TableName
      );
    }
    this.tableList.push(table);
    this._CommunicationService.post('AddTable', table).subscribe((res) => {
      console.log(res);
      if (res.successed) {
        this._tS.success(res.massege);
        this.router.navigate(['table-list']);
      } else this._tS.success(res.massege);
    });
  }
  getAllTables() {
    this._CommunicationService.get().subscribe((res) => {
      this.tableListSubject.next(res);
    });
    //  this.tableListSubject.next(this.tableList.map((i) => i.TableName));
  }

  deleteTable(tableName: string) {
    this._CommunicationService.delete('', tableName).subscribe((res) => {
      console.log(res);
      this.getAllTables();
    });
  }
}
