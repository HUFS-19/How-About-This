import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { userApi, changePwApi } from '../api/API';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

import '../styles/pages/_ChangePassword.scss';
const ChangePassword = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [isLogin, setLogin] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [inputs, setInputs] = useState({
    curPw: '',
    newPw: '',
    newPwCheck: '',
  });

  useEffect(() => {
    userApi.checkLogin().then((res) => {
      if (!res.data.login || res.data.userId !== userId) {
        //alert 디자인 변경 필요
        alert('잘못된 경로');
        navigate(-1);
      } else {
        setLogin(true);
      }
    });
  }, [userId]);

  const onChangePw = (e) => {
    const { value, name } = e.target;
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,}$/;

    setInputs({
      ...inputs,
      [name]: value,
    });

    if (name === 'newPw') {
      if (value.length < 10) {
        setPwMsg('10글자 이상 입력해주세요.');
      } else if (!passwordReg.test(value)) {
        setPwMsg('최소 1개의 영문자, 숫자, 특수문자를 포함해주세요.');
      } else {
        setPwMsg('');
      }
    }
  };

  const tryChangePassword = (e) => {
    console.log(inputs);
    // axios;
    // .put(`http://localhost:5000/changePasswordAPI/${userId}`, { inputs })
    changePwApi.changePw(userId, inputs).then((res) => {
      if (res.data.success) {
        Swal.fire({
          title: '비밀번호 변경이 완료되었습니다.',
          confirmButtonColor: '#000000',
        });
        window.location.replace(`/profile/${userId}`);
      } else {
        Swal.fire({
          title: res.data.msg,
          confirmButtonColor: '#000000',
        });
      }
    });
  };

  if (isLogin) {
    return (
      <div className='ChangePassword'>
        <div className='ChangePassword-container'>
          <h2>비밀번호 변경</h2>

          <h4>현재 비밀번호</h4>
          <input
            className='InputBox'
            name='curPw'
            onChange={onChangePw}
            type='password'
          ></input>
          <h4>새 비밀번호</h4>

          <div>
            <input
              className='InputBox'
              name='newPw'
              type='password'
              onChange={onChangePw}
            ></input>
            <p className='errMsg'>{pwMsg}</p>
          </div>

          <h4>새 비밀번호 확인</h4>
          <input
            className='InputBox'
            name='newPwCheck'
            type='password'
            onChange={onChangePw}
          ></input>

          <button
            className='PwChangeBtn'
            type='submit'
            disabled={pwMsg}
            onClick={tryChangePassword}
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    );
  }
};

export default ChangePassword;
