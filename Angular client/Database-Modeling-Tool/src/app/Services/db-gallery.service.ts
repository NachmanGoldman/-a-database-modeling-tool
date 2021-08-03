import { DB } from './../Data/db';
import { CommunicationService } from './communication.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TableDB } from '../Data/table-db';

@Injectable({
  providedIn: 'root',
})
export class DbGalleryService {
  constructor(private _communicationService: CommunicationService) {}

  readDB(): Observable<DB> {
    return this._communicationService.get('api/getAllTables');
  }

  // db: DB = {
  //   DBName: 'exsample',
  //   DBTables: [
  //     {
  //       TableName: 'empl',
  //       FieldList: [
  //         {
  //           FieldName: 'id',
  //           FieldType: 'string',
  //           FileLength: '9',
  //           DefaultValue: '336082847',
  //           Nulable: false,
  //           // IsPrimaryKey: false,
  //         },
  //       ],
  //     },
  //   ],
  // };
}
