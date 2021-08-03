import { FK } from './fk';

export class TableConstraints {
  constructor(public ForeignKey: Array<FK>) {}
}
