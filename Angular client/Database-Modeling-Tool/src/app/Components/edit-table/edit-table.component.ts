import { EditTableService } from './../../Services/edit-table.service';
import { DrawComponent } from './../draw/draw.component';
import { DBDataService } from './../../Services/db-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css'],
})
export class EditTableComponent implements OnInit, AfterViewInit {
  tableId: any;
  activatedrouteSubsciber: any;
  @ViewChild('drawComponent', { static: true }) drawComponent: DrawComponent;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private _DBDataService: DBDataService,
    private _EditTableService: EditTableService
  ) {
    this.activatedrouteSubsciber = this._Activatedroute.paramMap.subscribe(
      (parms) => {
        this.tableId = parms.get('tableId');
      }
    );
  }
  ngAfterViewInit(): void {
    this.drawComponent.diagramComponent.createdSubject
      .pipe(take(1))
      .subscribe((e) =>
        this._EditTableService
          .getTable(this.tableId)
          .pipe(
            take(1),
            tap((d) => console.log(d))
          )
          .subscribe((diargamData: { nodes: []; connectors: [] }) => {
            console.log(diargamData);
            diargamData.nodes.forEach((node) =>
              this.drawComponent.diagramComponent.diagram.add(node)
            );
            diargamData.connectors.forEach((connector) =>
              this.drawComponent.diagramComponent.diagram.add(connector)
            );
          })
      );
  }

  ngOnInit(): void {}
}
