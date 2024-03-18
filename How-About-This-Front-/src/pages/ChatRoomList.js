import { useEffect, useState } from 'react';

import { userApi, messageApi } from '../api/API';
import { catchError } from '../utils/catchError';

import ChatRoomBlock from '../components/ChatRoomBlock';

import '../styles/pages/_ChatRoomList.scss';

const ChatRoomList = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [chatRoomList, setChatRoomList] = useState([]);

  useEffect(() => {
    const getChatRoomList = async () => {
      const loggedIn = await userApi
        .checkLogin()
        .catch((error) => catchError(error));

      const loggedInUserId = loggedIn.data.userId;
      setLoggedInUser(loggedInUserId);

      const chatRoomList = await userApi
        .getChatRoom(loggedInUserId)
        .catch((error) => catchError(error));

      chatRoomList.data.forEach(async (room) => {
        const lastMsg = await messageApi.getLastMsg(room.chatroomID);

        if (lastMsg.data.length > 0) {
          setChatRoomList((chatRoomList) => [...chatRoomList, room]);
        }
      });
    };

    getChatRoomList();
  }, []);

  return (
    <div className='ChatRoomList'>
      <div className='ChatRoomList-wrapper'>
        <div className='ChatRoomList-background'>
          <div className='ChatroomList-topbar'>
            <p className='topbar-title'>채팅</p>
          </div>
          <section>
            <ul>
              {chatRoomList.map((room) => (
                <ChatRoomBlock room={room} loggedInUser={loggedInUser} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomList;
