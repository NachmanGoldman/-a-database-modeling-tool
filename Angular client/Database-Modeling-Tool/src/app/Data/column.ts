export class Column {
  constructor(
    public columnName: string,
    public type: string,
    public maxLenght: number = 50,
    public isPrimaryKey: boolean = false,
    public isDefaultValue: string = '',
    public isNull: boolean = true
  ) {}
}
