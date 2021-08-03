import { TableConstraints } from './table-constraints';
import { FieldDB } from './field-db';
import { FK } from './fk';

export class TableDB {
  constructor(
    public TableId: string,
    public TableName: string,
    public Columns: Array<FieldDB>,
    public TableConstraints: TableConstraints
  ) {}
  // FieldList: Array<FieldDB> = [];
  // TableName: string = '';
  // PrimaryKey: Array<FieldDB> = [];
  // FK: Array<FK> = [];
}
