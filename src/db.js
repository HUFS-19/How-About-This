import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.REACT_APP_USER,
  password: process.env.REACT_APP_PASSWORD,
  database: '2023summer',
  multipleStatements: true,
});

db.connect();

export default db;
