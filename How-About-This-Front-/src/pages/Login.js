import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { userApi } from '../api/API';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../styles/pages/_Login.scss';

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    userApi.checkLogin().then((res) => {
      if (res.data.login === true) {
        Swal.fire({
          title: '이미 로그인된 상태입니다.',
          confirmButtonColor: '#000000',
        });
        navigate('/');
      }
    });
  }, []);

  const onIdHandler = (e) => {
    setId(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onClickJoin = () => {
    navigate('/join');
  };

  const tryLogin = () => {
    userApi.login(id, password).then((res) => {
      if (!res.data.success) {
        console.log(res.data.msg);
        Swal.fire({
          title: '다시 시도해주세요',
          confirmButtonColor: '#000000',
        });
      } else {
        navigate('/');
        window.location.reload();
      }
    });
  };

  return (
    <div className='Container'>
      <div className='LoginContainer'>
        <h2>로그인</h2>
        <h4>아이디</h4>
        <input className='IdInputBox' onChange={onIdHandler}></input>
        <h4>비밀번호</h4>
        <div className='PasswordWrapper'>
          <input
            className='PasswordInputBox'
            type={showPassword ? 'text' : 'password'}
            onChange={onPasswordHandler}
          ></input>
          <button className='ShowPassword' onClick={onShowPassword}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <div className='LoginBtns'>
          <button
            className='LoginBtn'
            disabled={id.length < 1 || password.length < 1}
            type='submit'
            onClick={tryLogin}
          >
            로그인
          </button>
          <button className='JoinBtn' onClick={onClickJoin}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
