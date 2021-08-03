import { FieldDB } from './field-db';

export class FK {
  constructor(
    public ColumnId: string,
    public TableId: string,
    public TargetColumnId: string
  ) {}
}
