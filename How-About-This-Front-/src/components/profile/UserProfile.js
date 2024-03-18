import { useNavigate } from 'react-router-dom';

import '../../styles/components/profile/_UserProfile.scss';

import SnsList from './SnsList';
import BlackBtn from '../button/BlackBtn';
import WhiteBtn from '../button/WhiteBtn';

const UserProfile = ({ profileData, snsData, isLogin }) => {
  const navigate = useNavigate();

  return (
    <div className='Profile-top'>
      <img className='Profile-top-userIcon' src={profileData.userIcon} alt='' />
      <div className='Profile-top-userText'>
        <p>{profileData.nickname}</p>
        <p>{profileData.introduce}</p>
      </div>
      <div className='Profile-top-sns'>
        <div className='profileEdit-btn-wrapper'>
          {isLogin ? (
            <div>
              <BlackBtn
                id='profileEdit-btn'
                text='수정'
                onClick={() => navigate(`/profile/edit/${profileData.userID}`)}
              />{' '}
              <WhiteBtn
                id='chatlist-btn'
                text='채팅'
                onClick={() => navigate('/chatlist')}
              />
            </div>
          ) : null}
        </div>

        <div className='Profile-sns'>
          <SnsList snsData={snsData}></SnsList>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
