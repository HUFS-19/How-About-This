import React from 'react';
import { useLocation } from 'react-router-dom';

import { motion } from 'framer-motion';
import { FaTrashAlt, FaTimes, FaLink } from 'react-icons/fa';
import swal from 'sweetalert';

import WhiteBtn from '../button/WhiteBtn';
import BlackBtn from '../button/BlackBtn';

import '../../styles/components/_Modal.scss';

const modal = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const Modal = ({ className, btnFunc1, btnFunc2 }) => {
  const location = useLocation();
  const BASE_URL = 'http://localhost:3000';

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      swal({
        buttons: false,
        timer: 1000,
        className: 'copy-success-modal',
        text: '링크가 복사되었습니다.',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='Modal-wrapper' onClick={() => btnFunc1(false)}>
      <motion.ul
        onClick={(e) => e.stopPropagation()}
        className={['modal', `${className}`].join(' ')}
        variants={modal}
        initial='hidden'
        animate='visible'
      >
        {className === 'delete-modal' && (
          <>
            <FaTrashAlt className='delete-icon' />
            <p className='title'>정말 삭제하시겠습니까?</p>
            <div className='btns'>
              <WhiteBtn text='취소' onClick={() => btnFunc1(false)} />
              <BlackBtn text='삭제' onClick={btnFunc2} />
            </div>
          </>
        )}
        {className === 'share-modal' && (
          <>
            <div className='share-row1'>
              <p className='share-title'>공유하기</p>
              <FaTimes className='x-icon' onClick={() => btnFunc1(false)} />
            </div>
            <div className='share-row2'>
              <div className='share-icon-wrapper'>
                <img src='http://localhost:5000/src/icon/kakao.png' alt='' />
                <p>카카오톡</p>
              </div>
              <div
                className='share-icon-wrapper'
                onClick={() => copy(`${BASE_URL}${location.pathname}`)}
              >
                <FaLink className='icon' />
                <p>링크 복사</p>
              </div>
            </div>
          </>
        )}
      </motion.ul>
    </div>
  );
};

export default React.memo(Modal);
