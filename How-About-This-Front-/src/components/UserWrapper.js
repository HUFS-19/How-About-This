import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { userApi } from '../api/API';
import BlackBtn from './button/BlackBtn';
import WhiteBtn from './button/WhiteBtn';

import '../styles/components/_UserWrapper.scss';

const UserWrapper = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');

  const [icon, setIcon] = useState('');

  useEffect(() => {
    const getUser = async () => {
      userApi.getUser().then((res) => {
        if (res.data.login) {
          setId(res.data.id);
          setNickname(res.data.nickname);
          setIcon(res.data.icon);
        }
      });
    };
    getUser();
  });

  const tryLogout = () => {
    setId('');
    setNickname('');
    setIcon('');
    userApi.logout();
    window.location.reload();
  };

  if (!id) {
    return (
      <div className='UserWrapper'>
        <Link to='/login'>
          <BlackBtn className='BlackBtn' text={'로그인'} />
        </Link>
        <Link to='/join'>
          <WhiteBtn className='WhiteBtn' text={'회원가입'} />
        </Link>
      </div>
    );
  } else {
    return (
      <div className='UserWrapper'>
        <Link to={`/profile/${id}`}>
          <img className='NavIcon' src={icon}></img>
        </Link>
        <Link to={`/profile/${id}`}>
          <p className='NavId'>{nickname}</p>
        </Link>
        <BlackBtn className='BlackBtn' text={'로그아웃'} onClick={tryLogout} />
      </div>
    );
  }
};

export default UserWrapper;
