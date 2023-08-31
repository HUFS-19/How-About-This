import express from 'express';

import {
  getAllMessage,
  postMessage,
  getLastMessage,
} from '../controllers/messageControllers';

const messageRouters = express.Router();

messageRouters.route('/').post(postMessage);
messageRouters.get('/chatroom/:chatroomId', getAllMessage);
messageRouters.get('/chatroom/:chatroomId/lastMessage', getLastMessage);

export default messageRouters;
