import { DiagramService } from 'src/app/Services/diagram.service';
import { Column } from './../Data/column';
import { Table } from './../Data/create-table-request';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DBDataService } from './db-data.service';

@Injectable({
  providedIn: 'root',
})
export class EditTableService {
  constructor(
    private _DBDataService: DBDataService,
    private _DiagramService: DiagramService
  ) {}

  getTable(tableName: string): Observable<any> {
    return this._DBDataService.getTable(tableName).pipe(
      tap((res) => console.log(res)),
      map((cols) => {
        var table = new Table(tableName, cols, false, []);
        return this._DiagramService.convertDataMtoView(table);
      })
    );
  }

  getNodes(table: Table) {}

  getColumnNode(column: Column) {}
}
