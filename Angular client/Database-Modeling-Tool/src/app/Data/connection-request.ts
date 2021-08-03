export class ConnectionRequest {
  constructor(
    public DataSource: string,
    public UserID: string,
    public Password: string,
    public InitialCatalog: string
  ) {}
}
