import mysql, { Connection } from 'mysql';

class Database {
  public connection!: Connection;

  constructor() {}

  public connect() {
    const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_URL, DB_PORT } = process.env;
    this.connection = mysql.createConnection({
      host: DB_URL,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      port: 3306,
    });
    this.connection.connect((error) => {
      if (error) {
        console.log('Connection to db failed');
        console.error(error);
        process.exit(1);
      }
      console.log('Connected to db');
    });
  }
}

let databaseSingleton: any;

export default (): Database => {
  databaseSingleton = databaseSingleton || new Database();
  return databaseSingleton;
};
