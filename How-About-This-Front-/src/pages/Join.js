import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/API';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../styles/pages/_Join.scss';

const Join = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [checkId, setCheckId] = useState(false);
  const [usableId, setUsableId] = useState(false);
  const [idMsg, setIdMsg] = useState('');

  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState('');

  useEffect(() => {
    const loginCheckCall = async () => {
      const response = await userApi.checkLogin();
      if (response.data.login === true) {
        Swal.fire({
          title: '로그아웃 후 이용해 주세요.',
          confirmButtonColor: '#000000',
        });
        navigate('/');
      }
    };
    loginCheckCall();
  });
  const onChangeId = (e) => {
    const idReg = /^[a-zA-Z0-9]*$/;
    setId(e.target.value);
    setUsableId(false);
    if (!idReg.test(e.target.value)) {
      setIdMsg('영문자와 숫자만 사용해주세요.');
      setCheckId(false);
    } else if (e.target.value.length < 5 || e.target.value.length >= 12) {
      setIdMsg('5글자 이상 12글자 미만으로 입력해주세요.');
      setCheckId(false);
    } else {
      setIdMsg('중복 확인이 필요합니다.');
      setCheckId(true);
    }
  };

  const onChangePassword = (e) => {
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,}$/;
    setPassword(e.target.value);
    if (e.target.value.length < 10) {
      setPasswordMsg('10글자 이상 입력해주세요.');
      setCheckPassword(false);
    } else if (!passwordReg.test(e.target.value)) {
      setPasswordMsg('최소 1개의 영문자, 숫자, 특수문자를 포함해주세요.');
      setCheckPassword(false);
    } else {
      setPasswordMsg('');
      setCheckPassword(true);
    }
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChangePasswordConfirm = (e) => {
    if (e.target.value !== password) {
      setPasswordConfirmMsg('비밀번호가 일치하지 않습니다.');
      setPasswordConfirm(false);
    } else {
      setPasswordConfirmMsg('');
      setPasswordConfirm(true);
    }
  };

  const usableIdCheck = () => {
    userApi.idCheck(id).then((res) => {
      if (!res.data.success) {
        setUsableId(false);
        setIdMsg(res.data.msg);
      } else {
        setUsableId(true);
        setIdMsg('');
      }
    });
  };

  const tryJoin = () => {
    userApi.join(id, password).then((res) => {
      if (!res.data.success) {
        console.log(res.data.msg);
        Swal.fire({
          title: 'ERROR',
          confirmButtonColor: '#000000',
        });
      } else {
        console.log('SUCCESS');
        Swal.fire({
          title: `환영합니다! '${id}'님!`,
          confirmButtonColor: '#000000',
        });
        navigate('/login');
      }
    });
  };

  return (
    <div className='Container'>
      <div className='JoinContainer'>
        <h2>회원가입</h2>
        <h4>아이디</h4>
        <div className='IdWrapper'>
          <input className='IdInputBox' onChange={onChangeId}></input>
          <button
            className='IdCheckBtn'
            disabled={!checkId}
            onClick={usableIdCheck}
          >
            중복확인
          </button>
        </div>
        <p className='CheckMsg'>{idMsg}</p>

        <h4>비밀번호</h4>
        <div className='PasswordWrapper'>
          <input
            className='PasswordInputBox'
            type={showPassword ? 'text' : 'password'}
            onChange={onChangePassword}
          ></input>
          <button className='ShowPassword' onClick={onShowPassword}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        </div>
        <p className='CheckMsg'>{passwordMsg}</p>

        <h4>비밀번호 확인</h4>
        <input
          className='InputBox'
          type='password'
          onChange={onChangePasswordConfirm}
        ></input>
        <p className='CheckMsg'>{passwordConfirmMsg}</p>

        <button
          className='JoinBtn'
          disabled={!(checkId && usableId && checkPassword && passwordConfirm)}
          onClick={tryJoin}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default Join;
