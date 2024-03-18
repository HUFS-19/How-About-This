import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { commentApi } from '../api/API';

import '../styles/components/_CommentWrapper.scss';

const CommentWrapper = () => {
  const { id } = useParams();
  const [commentData, setCommentData] = useState([]);
  const [userCheck, setUserCheck] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const getComment = async () => {
      // await axios
      //   .get(`http://localhost:5000/commentAPI/${id}`, {
      //     withCredentials: true,
      //   })
      await commentApi.getComments(id).then((res) => {
        setCommentData(res.data.comments);
        if (res.data.user) {
          setUserCheck(res.data.user.id);
        }
      });
    };
    getComment();
  }, [id, userCheck]);

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onClickAdd = () => {
    commentApi.postComment(id, userCheck, content);
    setUserCheck('');
  };

  const onClickDelete = (e) => {
    let commentID = e.target.value;
    commentApi.deleteComments(commentID);
    setUserCheck('');
  };

  return (
    <div className='CommentWrapper'>
      <div className='CommentBackground'>
        <p className='commentTitle'>COMMENT</p>

        {userCheck !== '' && (
          <div className='AddComment'>
            <input
              className='commentInput'
              placeholder='댓글을 등록해주세요!'
              onChange={onChangeContent}
            ></input>
            <button className='addBtn' onClick={onClickAdd}>
              등록
            </button>
          </div>
        )}

        {commentData.length === 0 && (
          <p className='noComment'>첫 댓글을 등록해주세요!</p>
        )}

        {commentData.map((comment) => {
          return (
            <div className='comment'>
              <img className='commentIcon' src={comment.userIcon} alt=''></img>
              <div className='commentContent'>
                <div className='commentHeader'>
                  <p className='commentNickname'>{comment.nickname}</p>
                  <p className='commentDate'>{comment.date}</p>
                  {userCheck === comment.userID && (
                    <button
                      className='deleteBtn'
                      onClick={onClickDelete}
                      value={comment.commentID}
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className='commentBody'>{comment.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentWrapper;
