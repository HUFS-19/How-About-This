import React, { useState } from 'react';
import {
  AiFillInstagram as Instagram,
  AiFillYoutube as Youtube,
  AiOutlineYoutube as OutlineYoutube,
  AiTwotoneMail as Email,
  AiFillFacebook as Facebook,
  AiOutlinePlusCircle as Plus,
} from 'react-icons/ai';
import { FaBloggerB as Blog } from 'react-icons/fa';
import { RiKakaoTalkFill as Kakao } from 'react-icons/ri';

import '../../styles/components/profileEdit/_AddSnsInfo.scss';

const AddSnsInfo = ({ snsList, setSnsList }) => {
  const [snsOptionOpen, setSnsOption] = useState(false);
  const [selectedSns, selectSns] = useState('');
  const [tempSnsList, setTempSnsList] = useState({ ...snsList });

  const sns = {
    카카오톡: <Kakao size={32} color='black' />,
    인스타그램: <Instagram size={31} color='black' />,
    유튜브: <Youtube size={32} color='black' />,
    페이스북: <Facebook size={28} color='black' />,
    이메일: <Email size={28} color='black' />,
    블로그: <Blog size={25} color='black' />,
  };

  const OnChange = (e) => {
    const { value, name } = e.target;
    if (value === '') {
      let { [name]: value, ...newList } = tempSnsList;
      setTempSnsList(newList);
    } else {
      setTempSnsList({
        ...tempSnsList,
        [name]: value,
      });
    }
  };

  const onClickSns = (data) => {
    // 다른 sns 클릭하면 snsList에 반영되지 않은 수정사항을 초기화
    if (data !== selectedSns) {
      setTempSnsList({ ...snsList });
    }
    //새로운 sns 아이콘 클릭시 임시 데이터에 sns 추가
    // if (tempSnsList[data] === undefined) {
    //   setTempSnsList({
    //     ...tempSnsList,
    //     [data]: '',
    //   });
    // }
    //현재 선택중인 아이콘 저장
    selectSns(data);
  };

  return (
    <div className='AddSnsInfo'>
      <div className='snsIco-container'>
        {Object.keys(snsList).map((data) => (
          <li
            key={data}
            onClick={() => {
              onClickSns(data);
            }}
          >
            {sns[data]}
          </li>
        ))}
        <div className='slctNewSns-section'>
          <span
            className='snsListCntr'
            onClick={() => {
              setSnsOption(!snsOptionOpen);
            }}
          >
            <Plus size={27} color='black' />
          </span>
          {/* 다른 sns 주소 추가  */}
          <ul className={snsOptionOpen ? 'snsList-open' : 'snsList-close'}>
            {Object.keys(sns).map((data) => (
              <li
                key={data}
                onClick={() => {
                  onClickSns(data);
                }}
              >
                {sns[data]}
              </li>
            ))}
            {/* <li>
              <OutlineYoutube size={32} color='black' />
            </li> */}
            {/* {Object.keys(sns).map((data) => {
              return <li>{sns[data]}</li>;
            })} */}
          </ul>
        </div>
      </div>
      <div className={selectedSns ? 'snsEdit-open' : 'snsEdit-close'}>
        {sns[selectedSns]}
        <input
          type='text'
          name={selectedSns}
          value={tempSnsList[selectedSns] || ''}
          onChange={OnChange}
        />
        <button
          onClick={() => {
            setSnsList({ ...tempSnsList });
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};
export default AddSnsInfo;
