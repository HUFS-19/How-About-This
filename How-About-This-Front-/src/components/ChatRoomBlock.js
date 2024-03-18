import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { prodInfoApi, messageApi } from '../api/API';
import { catchError } from '../utils/catchError';

import '../styles/components/_ChatRoomBlock.scss';

const ChatRoomBlock = ({ room, loggedInUser }) => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [lastMsg, setLastMsg] = useState('');
  const [lastMsgDate, setLastMsgDate] = useState('');

  useEffect(() => {
    const getProductName = async () => {
      const product = await prodInfoApi
        .getProd(room.prodID)
        .catch((error) => catchError(error));

      const productName = product.data[0].prodNAME;
      setProductName(productName);
    };

    const getLastMsgDate = (lastMsg) => {
      const DATE = lastMsg.data[0].time.slice(0, 10).split('-');
      DATE.splice(1, 0, '년 ');
      DATE.splice(3, 0, '월 ');
      DATE.splice(5, 0, '일 ');

      setLastMsgDate(DATE.join(''));
    };

    const getLastMsg = async () => {
      const lastMsg = await messageApi
        .getLastMsg(room.chatroomID)
        .catch((error) => catchError(error));

      const lastMsgContent = lastMsg.data[0].content;
      setLastMsg(lastMsgContent);

      getLastMsgDate(lastMsg);
    };

    getProductName();
    getLastMsg();
  }, []);

  return (
    <div
      className='ChatRoomBlock'
      onClick={() =>
        navigate(`/product/${room.prodID}/chat?inquirer=${room.inquirerID}`)
      }
    >
      <div className='ChatRoomBlock-left'>
        <img
          className='inquirer-profile'
          src='http://localhost:5000/src/profile/default.jpg'
          alt=''
        />
        <div className='chatroom-info'>
          <div>
            <p className='chatroom-inquirerId'>
              {loggedInUser === room.inquirerID ? room.userID : room.inquirerID}
            </p>
            <p className='chatroom-productName'>{productName}</p>
          </div>
          <p className='chatroom-lastMsg'>{lastMsg}</p>
        </div>
      </div>
      <div className='ChatRoomBlock-right'>
        <p className='chatroom-lastDate'>{lastMsgDate}</p>
      </div>
    </div>
  );
};

export default React.memo(ChatRoomBlock);
