import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/components/_Messages.scss';

const Messages = ({ msgArray, loggedInUser }) => {
  const navigate = useNavigate();
  const msgEndRef = useRef();

  const alterToString = (date) => {
    const YEAR = date.slice(0, 4);
    const MONTH = date.slice(5, 7);
    const DATE = date.slice(8);

    return `${YEAR}년 ${MONTH}월 ${DATE}일`;
  };

  useEffect(() => {
    msgEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [msgArray]);

  return (
    <div className='Messages'>
      <ul>
        {msgArray.map((msg, i, array) =>
          loggedInUser === msg.senderId ? (
            <>
              {i === 0 || (i >= 1 && array[i - 1].date !== msg.date) ? (
                <li className='msg-wrapper date'>
                  <p className='date'>{alterToString(msg.date)}</p>
                </li>
              ) : (
                <></>
              )}
              <li key={i} className='msg-wrapper self'>
                <p className='time'>{msg.time}</p>
                <div className='msg-text'>{msg.text}</div>
              </li>
            </>
          ) : (
            <>
              {i === 0 || (i >= 1 && array[i - 1].date !== msg.date) ? (
                <li className='msg-wrapper date'>
                  <p className='date'>{alterToString(msg.date)}</p>
                </li>
              ) : (
                <></>
              )}
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
            </>
          ),
        )}
        <div ref={msgEndRef}></div>
      </ul>
    </div>
  );
};

export default React.memo(Messages);
