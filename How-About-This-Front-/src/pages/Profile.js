import { useState, useEffect } from 'react';
import axios from 'axios';
import { profileApi } from '../api/API';
import { useParams, useNavigate } from 'react-router-dom';

import '../styles/components/profile/_ProfileArea.scss';
import ProfileProdList from '../components/profile/ProfileProdList';
import UserProfile from '../components/profile/UserProfile';
import BlackBtn from '../components/button/BlackBtn';
import WhiteBtn from '../components/button/WhiteBtn';

const Profile = () => {
  const { userId } = useParams();

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [snsData, setSnsData] = useState({});
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    profileApi.getProfile(userId).then((res) => {
      if (res.data.profileData) {
        setProfileData(res.data.profileData);
        setSnsData(res.data.snsList);
        if (res.data.loginState.id === userId) {
          setLogin(true);
        }
      } else {
        navigate('/*');
      }
    });
  }, [userId]);

  if (profileData && snsData) {
    return (
      <div className='ProfileArea'>
        <div className='Profile-wrapper'>
          <UserProfile
            profileData={profileData}
            snsData={snsData}
            isLogin={isLogin}
          ></UserProfile>

          {isLogin ? (
            <WhiteBtn
              id='addProductBtn'
              goToLink='/upload'
              text='신규 상품 추가'
            />
          ) : (
            <hr />
          )}
          <ProfileProdList userId={userId}></ProfileProdList>
        </div>
      </div>
    );
  } else return null;
};

export default Profile;
