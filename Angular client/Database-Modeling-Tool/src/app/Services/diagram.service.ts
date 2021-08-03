import { DBDataService } from './db-data.service';
import { Constraints } from './../Data/constraints';
import { Column } from './../Data/column';
import { Table } from '../Data/create-table-request';
import { CommunicationService } from './communication.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  NodeModel,
  DiagramComponent,
  NodeConstraints,
  ConnectorModel,
  randomId,
} from '@syncfusion/ej2-angular-diagrams';

@Injectable({
  providedIn: 'root',
})
export class DiagramService {
  getNodeDefaults(node: NodeModel): NodeModel {
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
    // node.annotations = [{ content: '' }];
    // node.addInfo = { settings: null };
    node.id = node.data + randomId();
    return node;
  }
  constructor(
    private _CommunicationService: CommunicationService,
    private _dataService: DBDataService
  ) {}

  public nodeClickSubject: Subject<any> = new Subject<any>();

  creatDb(diagram: DiagramComponent) {
    var nodes: NodeModel[] = diagram.nodes;
    var connectors = diagram.connectors;
    var entitys = nodes.filter((item) => item.data == 'entity');
    var tables = entitys.map((entity) => {
      let entityConectors = connectors.filter(
        (item) => item.sourceID == entity.id
      );
      let columnsView = nodes.filter(
        (item) =>
          item.data == 'attribute' &&
          entityConectors.find((i) => i.targetID == item.id)
      );
      debugger;
      let constraintsView = nodes.filter(
        (item) =>
          item.data == 'constraints' &&
          entityConectors.find((i) => i.targetID == item.id)
      );
      let columnsModel = columnsView.map(
        (c) => c.addInfo['settings'] as Column
      );
      let constraintsModel = constraintsView.map(
        (c) => c.addInfo['settings'] as Constraints
      );
      let tableName = entity.annotations[0].content as string;
      return new Table(tableName, columnsModel, false, constraintsModel);
    });

    tables.forEach((item) => {
      console.log(item);
      this._dataService.createTable(item);
    });
  }

  convertDataMtoView(table: Table): {
    nodes: NodeModel[];
    connectors: ConnectorModel[];
  } {
    console.log(table);
    var retval = {
      nodes: new Array<NodeModel>(),
      connectors: new Array<ConnectorModel>(),
    };
    var position = { offsetX: 25, offsetY: 200 };
    var left = true;
    var entityNode: NodeModel = {
      id: 'entity' + randomId(),
      offsetX: 500,
      offsetY: 40,
      data: 'entity',
      annotations: [{ content: table.TableName }],
      addInfo: { settings: table },
    };
    // entityNode.annotations[0].content = table.TableName;
    // entityNode.addInfo = table;
    retval.nodes.push(entityNode);
    debugger;
    table.Columns.forEach((column: Column) => {
      position.offsetX += 100;
      console.log(column);
      var columnNode: NodeModel = {
        id: 'attribute' + randomId(),
        offsetX: position.offsetX,
        offsetY: position.offsetY,
        data: 'attribute',

        annotations: [{ content: column['columnName'] }],
        addInfo: { settings: column },
      };
      // columnNode.annotations[0].content = column.ColumnName;
      // entityNode.addInfo = column;
      retval.nodes.push(columnNode);
      var connector: ConnectorModel = {
        id: 'connector' + randomId(),
        sourceID: entityNode.id,
        targetID: columnNode.id,
      };
      retval.connectors.push(connector);
    });

    return retval;
  }
}
