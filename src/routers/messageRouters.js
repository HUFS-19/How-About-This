import express from 'express';

import { getAllMessage, postMessage } from '../controllers/messageControllers';

const messageRouters = express.Router();

messageRouters.route('/').post(postMessage);
messageRouters.get('/chatroom/:chatroomId', getAllMessage);

export default messageRouters;
