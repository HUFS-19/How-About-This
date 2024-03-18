import { useRef } from 'react';
import { useState } from 'react';
import '../../styles/components/profile/_SnsModal.scss';
import BlackBtn from '../button/BlackBtn';

const SnsModal = ({ modalState, setModalState, snsData, snsSvg }) => {
  const modalWrapper = useRef();
  const [bottomModalState, setBottomModalState] = useState(false);
  let expUrl = /^http[s]?:\/\/([\S]{3,})/i;
  const urlCheck = expUrl.test(snsData.link);

  const onClose = (e) => {
    if (e.target === modalWrapper.current) setModalState(!modalState);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snsData.link);
      setBottomModalState(true);
      setTimeout(() => {
        setBottomModalState(false);
      }, 2000);
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };
  return (
    <div>
      <div className={modalState ? 'modal-overlay' : 'modal-overlay-invisible'}>
        <div
          className={modalState ? 'modal-wrapper' : 'modal-wrapper-invisible'}
          ref={modalWrapper}
          onClick={onClose}
        >
          <div tabIndex='0' className='modal-inner' onClick={() => {}}>
            <h3>SNS INFO</h3>
            <div className='sns-container'>
              {snsData.icon}
              <text text>{snsData.link}</text>
            </div>
            <div className='btn-container'>
              <BlackBtn text={'복사'} onClick={handleCopy}></BlackBtn>
              <BlackBtn
                text={'이동'}
                disabled={!urlCheck}
                onClick={() => window.open(snsData.link, '_blank')}
              ></BlackBtn>
            </div>
          </div>
        </div>
      </div>
      <div className={bottomModalState ? 'bottomModal' : 'bottomModal-close'}>
        클립보드에 복사했습니다.
      </div>
    </div>
  );
};

export default SnsModal;
