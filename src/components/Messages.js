import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/components/_Messages.scss';

const Messages = ({ msgArray, chatRoomId, loggedInUser }) => {
  const navigate = useNavigate();
  const msgEndRef = useRef();

  console.log(msgArray);

  useEffect(() => {
    msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [msgArray]);

  return (
    <div className='Messages'>
      <ul>
        {msgArray.map((msg, i) =>
          loggedInUser === msg.senderId ? (
            <li key={i} className='msg-wrapper self'>
              <p className='time'>{msg.time}</p>
              <div className='msg-text'>{msg.text}</div>
            </li>
          ) : (
            <li key={i} className='msg-wrapper opponent'>
              <img
                onClick={() => navigate(`/profile/${msg.senderId}`)}
                src='http://localhost:5000/src/profile/default.jpg'
                alt=''
              />
              <div>
                <p
                  onClick={() => navigate(`/profile/${msg.senderId}`)}
                  className='opponent-username'
                >
                  {msg.senderId}
                </p>
                <p className='msg-text'>{msg.text}</p>
              </div>
              <p className='time'>{msg.time}</p>
            </li>
          ),
        )}
        <div ref={msgEndRef}></div>
      </ul>
    </div>
  );
};

export default React.memo(Messages);
