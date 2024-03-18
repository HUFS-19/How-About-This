import React from 'react';

import '../../styles/components/button/_BlackBtn.scss';

const BlackBtn = ({ onClick, goToLink, id, text, disabled }) => {
  return (
    <button
      onClick={goToLink ? () => window.open(goToLink) : onClick}
      id={id}
      className='BlackBtn'
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default React.memo(BlackBtn);
