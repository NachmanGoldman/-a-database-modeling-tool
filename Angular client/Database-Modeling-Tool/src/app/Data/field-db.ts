export class FieldDB {
  constructor(
    public ColumnId: string,
    public ColumnName: string,
    public ColumnType: string,
    public ColumnSize: string,
    public IsNullable: boolean,
    public IsPrimaryKey: boolean // public IsPrimaryKey: boolean = false
  ) {}
}
