import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.alert('페이지를 찾을 수 없습니다.');
    navigate('/');
  }, []);

  return <p>Not Found</p>;
};

export default NotFound;
