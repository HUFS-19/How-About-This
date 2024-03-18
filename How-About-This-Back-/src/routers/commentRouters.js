import express from 'express';
import { jwtAuth } from '../controllers/jwtAuth';
import {
  deleteComment,
  getComments,
  postComment,
} from '../controllers/commentControllers';

const CommentRouters = express.Router();

CommentRouters.route('/:id')
  .get(jwtAuth, getComments)
  .post(postComment)
  .delete(deleteComment);

export default CommentRouters;
