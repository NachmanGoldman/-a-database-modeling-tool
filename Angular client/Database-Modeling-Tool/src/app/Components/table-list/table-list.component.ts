import { DBDataService } from './../../Services/db-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  selectedFile: File | any;

  tables: Array<string> = [
    'employees',
    'projects',
    'projects_general_info',
    'bank_list',
    'bank_accounts',
    'engineer_list',
    'contractors',
    'branches',
  ];
  message: string;
  constructor(private _DBDataService: DBDataService) {}

  ngOnInit(): void {
    this.tables ==
      [
        'employees',
        'projects',
        'projects_general_info',
        'bank_list',
        'bank_accounts',
        'engineer_list',
        'contractors',
        'branches',
      ];
    // this._DBDataService.tableListSubject.subscribe(
    //   (tables) => (this.tables = tables)
    // );
    // this._DBDataService.getAllTables();
  }
  onGetAllTables() {
    this._DBDataService.getAllTables();
  }
  onDeleteTable(tableName: string) {
    this._DBDataService.deleteTable(tableName);
  }

  onFileChanged(event: any) {
    // this._DBDataService
    //   .importDB(event.target.files[0])
    //   .subscribe((response) =>
    //     this._DBDataService
    //       .getAllTables()
    //       .subscribe((tables) => (this.tables = tables))
    //   );
  }
}
