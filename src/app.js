import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import productRouters from './routers/productRouters';
import userRouters from './routers/userRouters';
import profileRouters from './routers/profileRouters';
import changePasswordRouters from './routers/changePasswordRouters';
import categoryRouters from './routers/categoryRouters';

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.set('port', 5000);

app.use(express.static(path.join(__dirname, '../front-end/build')));

app.use('/src/Mimg', express.static('src/Mimg'));
app.use('/src/profile', express.static('src/profile'));
app.use('/src/userIcon', express.static('src/userIcon'));
app.use('/src/img', express.static('src/img'));

app.use('/product', productRouters);
app.use('/user', userRouters);
app.use('/profile', profileRouters);
app.use('/changePassword', changePasswordRouters);
app.use('/category', categoryRouters);

app.get('*', (req, res) => {
  //나머지 경로로 요청이 올 시 front의 빌드 파일 반환
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
