import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/button/_WhiteBtn.scss';

const WhiteBtn = ({ onClick, goToLink, id, text }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={goToLink ? () => navigate(goToLink) : onClick}
      id={id}
      className='WhiteBtn'
    >
      {text}
    </button>
  );
};

export default React.memo(WhiteBtn);
