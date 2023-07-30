import 'dotenv/config';
import express from 'express';
import path from 'path';
import db from './db.js';
import cors from 'cors';

import productRouters from './routers/productRouters';

const __dirname = path.resolve();
const app = express();

app.set('port', process.env.PORT || 5000);

//프론트 통신을 위한 CORS 설정
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.static(path.join(__dirname, '../front-end/build')));

app.use('/product', productRouters);

app.get('*', (req, res) => {
  //나머지 경로로 요청이 올 시 front의 빌드 파일 반환
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
