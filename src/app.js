import 'dotenv/config';
import express from 'express';
import db from './db';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  // db 잘 연결되었는지 확인 위한 test 코드
  db.query('select * from user', function (error, results) {
    if (error) {
      console.log(error);
    }
    console.log(results);
    res.send(results);
  });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
