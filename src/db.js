import mysql from 'mysql';

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.REACT_APP_USER,
  password: process.env.REACT_APP_PASSWORD,
  database: 'hufs19',
  multipleStatements: true,
});

db.connect();

export default db;
