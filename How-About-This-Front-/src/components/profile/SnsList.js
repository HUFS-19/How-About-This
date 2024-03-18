import { useState } from 'react';
import {
  AiFillInstagram as Instagram,
  AiFillYoutube as Youtube,
  AiTwotoneMail as Email,
  AiFillFacebook as Facebook,
  AiOutlinePlusCircle as plus,
} from 'react-icons/ai';
import { FaBloggerB as Blog } from 'react-icons/fa';
import { RiKakaoTalkFill as Kakao } from 'react-icons/ri';
import SnsModal from './SnsModal';

import '../../styles/components/profile/_SnsList.scss';

const SnsList = ({ snsData }) => {
  const [modalState, setModalState] = useState(false);
  const [modalSnsData, setModalSnsData] = useState('');

  const sns = {
    카카오톡: <Kakao size={35} color='black' />,
    인스타그램: <Instagram size={34} color='black' />,
    유튜브: <Youtube size={35} color='black' />,
    페이스북: <Facebook size={31} color='black' />,
    이메일: <Email size={31} color='black' />,
    블로그: <Blog size={29} color='black' />,
  };

  const clickSns = (icon, link) => {
    setModalState(true);
    setModalSnsData({ icon: icon, link: link });
    console.log(modalSnsData);
  };
  return (
    <div className='SnsList'>
      <SnsModal
        setModalState={setModalState}
        modalState={modalState}
        snsData={modalSnsData}
      ></SnsModal>
      <ul>
        {Object.keys(snsData).map((data) => (
          <li
            onClick={() => {
              clickSns(sns[data], snsData[data]);
            }}
          >
            {/* <a href={snsData[data]} target='_blank' rel='noopener noreferrer'> */}
            {sns[data]}
            {/* </a> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnsList;
