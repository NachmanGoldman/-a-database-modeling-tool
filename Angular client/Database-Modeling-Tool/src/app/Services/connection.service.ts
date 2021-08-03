import { CommunicationService } from './communication.service';
import { ConnectionRequest } from './../Data/connection-request';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../Data/server-response';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  connectionConfig: ConnectionRequest;

  // Server=tcp:bn-data-base-modoling-tool.database.windows.net,1433;Initial Catalog=get starting with db;Persist Security Info=False;User ID=b336082847;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
  constructor(private _CommunicationService: CommunicationService) {
    this.connectionConfig = new ConnectionRequest(
      'tcp:serverdbmt.database.windows.net',
      'dm313182651',
      'Bm1107bm',
      'Data Base Modeling Tool DB'
    );
  }
  // Server=tcp:serverdbmt.database.windows.net,1433;Initial Catalog=Data Base Modeling Tool DB;Persist Security Info=False;User ID=dm313182651;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
  Connect(connectionConfig: ConnectionRequest): Observable<ServerResponse> {
    return this._CommunicationService.post('', this.connectionConfig);
    // return new Observable<ServerResponse>((sub) =>
    //   sub.next(new ServerResponse(true, 'successed to connect to db'))
    // );
  }
}
