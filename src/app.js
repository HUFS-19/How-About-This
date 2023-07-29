import 'dotenv/config';
import express from 'express';
import db from './db';

import productRouters from './routers/productRouters';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/product', productRouters);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
