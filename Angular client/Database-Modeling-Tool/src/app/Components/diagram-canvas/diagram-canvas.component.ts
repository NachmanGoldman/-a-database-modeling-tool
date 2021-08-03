import { Column } from './../../Data/column';
import { EntityDetailsComponent } from './../entity-details/entity-details.component';
import { take, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { element, logging } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IDropEventArgs,
  NodeModel,
  DiagramComponent,
  NodeConstraints,
  ConnectorModel,
  randomId,
  ConnectorConstraints,
} from '@syncfusion/ej2-angular-diagrams';
import { DiagramService } from 'src/app/Services/diagram.service';
import { AtributeDetailsComponent } from '../atribute-details/atribute-details.component';
import { ComponentType } from '@angular/cdk/portal';
import { RelationshipDetailsComponent } from '../relationship-details/relationship-details.component';

@Component({
  selector: 'app-diagram-canvas',
  templateUrl: './diagram-canvas.component.html',
  styleUrls: ['./diagram-canvas.component.css'],
})
export class DiagramCanvasComponent implements OnInit {
  @ViewChild('diagram', { static: true }) diagram: DiagramComponent;
  constructor(
    private _diagramService: DiagramService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  public getNodeDefaults(node: NodeModel): NodeModel {
    debugger;
    // return this._diagramService.getNodeDefaults(node);
    if (node.data == 'entity') {
      node.height = 60;
      node.width = 100;
      node.shape = {
        type: 'Basic',
        shape: 'Rectangle',
        scale: 'Stretch',
      };
    } else if (node.data == 'attribute') {
      node.height = 40;
      node.width = 75;
      node.shape = {
        type: 'Basic',
        shape: 'Ellipse',
        scale: 'Stretch',
      };
    }
    node.constraints = NodeConstraints.Default | NodeConstraints.AllowDrop;
    node.annotations = [{ content: node.annotations[0]?.content }];
    node.addInfo = node.addInfo || { settings: null };
    return node;
  }
  public getConnectorDefaults(obj: ConnectorModel): ConnectorModel {
    obj.style = {
      strokeColor: '#6BA5D7',
      fill: '#6BA5D7',
      strokeWidth: 2,
    };
    obj.type = 'Straight';
    if (!obj.addInfo) {
      obj.constraints = ConnectorConstraints.Default;

      obj.targetDecorator = { shape: 'None' };
    }

    obj.addInfo = obj.addInfo || { settings: null };
    return obj;
  }
  createdSubject = new Subject();
  onCreated(event: any) {
    this.createdSubject.next();
  }

  onDrop(args: any) {
    // debugger;
    // if (args.element instanceof Node && this.diagram.nodes.length > 0) {
    var node = args.element;
    if (args.element.id !== args.target.id) {
      if (args.element.data == 'attribute' && args.target.data == 'entity') {
        node = {
          id: 'attribute' + randomId(),
          offsetX: args.element.offsetX,
          offsetY: args.element.offsetY + 100,
          shape: args.element.shape,
          height: args.element.height,
          width: args.element.width,
          data: args.element.data,
          addInfo: args.element.addInfo,
          constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
          annotations: args.element.annotations,
        };
        this.diagram.add(node);
        let connector: ConnectorModel = {
          id: 'connector' + randomId(),
          sourceID: (args.target as NodeModel).id,
          targetID: node.id,
          type: 'Straight',
          targetDecorator: { shape: 'None' },
        };
        this.diagram.add(connector);
      }
      if (this.diagram.getNodeObject(args.element.id))
        this.diagram.remove(args.element);
      else args.cancel = true;
    }
    if (node?.data || node.addInfo?.type)
      this.openDialog(node).subscribe((res) => {
        if (!res) this.diagram.undo();
      });
  }

  onDoubleClick(event: any) {
    var node = event.source;
    debugger;
    if (node) this.openDialog(node);
  }

  openDialog(node: any): Observable<boolean> {
    var retval = new Subject<boolean>();
    var type = node.data || node.addInfo?.type;
    if (!type) return retval;
    var ct: { [type: string]: ComponentType<any> } = {
      attribute: AtributeDetailsComponent,
      entity: EntityDetailsComponent,
      relationShipConnection: RelationshipDetailsComponent,
    };
    this._dialog
      .open(ct[type], {
        disableClose: true,
        data: node.addInfo.settings,
      })
      .afterClosed()
      .pipe(
        take(1),
        tap((res) => console.log(res))
      )
      .subscribe((res: any) => {
        if (res) {
          let obj: any = this.diagram.getObject(node?.id as string);

          obj.annotations[0].content = res.name;
          console.log(obj.annotations[0].content);

          obj.addInfo = { settings: res.data };
          this.diagram.dataBind();
        }
        retval.next(res != null);
      });
    return retval;
  }
}
