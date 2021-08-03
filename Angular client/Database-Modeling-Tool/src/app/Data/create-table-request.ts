import { Constraints } from './constraints';
import { Column } from './column';

export class Table {
  constructor(
    public TableName: string,
    public Columns: Array<Column>,
    public IsConstraint: boolean,
    public Constraints: Array<Constraints>
  ) {}
}
