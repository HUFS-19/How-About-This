import express from 'express';

import { postMessage } from '../controllers/messageControllers';

const messageRouters = express.Router();

messageRouters.route('/').post(postMessage);

export default messageRouters;
