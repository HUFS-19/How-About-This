import app from './app';
import db from './db';
import socket from 'socket.io';
import http from 'http'; // node.js 기본 내장 모듈

const server = http.createServer(app);
const io = socket(server);

io.sockets.on('connection', (socket) => {
  socket.on('entrance', (entrant, waiter) => {
    // console.log(socket);
    io.emit('entrance', `${entrant} 님이 입장하였습니다.`);

    // chat db에 메시지 추가
  });

  socket.on('send', (data) => {
    console.log(`${data.userId}가 보낸 메시지: ${data.body}`);
    // chat db에 메시지 추가
  });

  socket.on('disconnect', () => {
    console.log('접속 종료');
  });
});

server.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
