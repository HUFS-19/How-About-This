import { Link } from 'react-router-dom';

import '../../styles/components/profile/_UserProfile.scss';
// import userIcon from '../../assets/profile.jpg';
import SnsList from './SnsList';

const UserProfile = ({ profileData, snsData, isLogin }) => {
  return (
    <div className='Profile-top'>
      <img className='Profile-top-userIcon' src={profileData.userIcon} alt='' />
      <div className='Profile-top-userText'>
        <p>{profileData.nickname}</p>
        <p>{profileData.introduce}</p>
      </div>
      <div className='Profile-top-sns'>
        <div className='profileEdit-btn-wrapper'>
          <Link
            to={`/profile/edit/${profileData.userID}`}
            className='profileEdit-link'
          >
            {isLogin ? <button className='profileEdit-btn'>수정</button> : null}
          </Link>
        </div>

        <div className='Profile-sns'>
          <SnsList snsData={snsData}></SnsList>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
