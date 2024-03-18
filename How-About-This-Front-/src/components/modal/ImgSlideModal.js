import React from 'react';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import '../../styles/components/modal/_ImgSlideModal.scss';

const variants = {
  enter: (direction) => {
    if (direction === 0) {
      return {
        x: 0,
        opacity: 0,
        scale: 0.2,
      };
    }
    return {
      x: direction > 0 ? 700 : -700,
      opacity: 0,
      scale: 0.2,
    };
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => {
    return {
      x: direction < 0 ? 700 : -700,
      opacity: 0,
      scale: 0.2,
    };
  },
};

const ImgSlideModal = ({ imgs, startId, setOpenImgModal }) => {
  const MIN_ORDER = 0;
  const MAX_ORDER = imgs.length - 1;
  const [[page, direction], setPage] = useState([startId - 1, 0]);

  const closeModal = (target) => {
    if (target.className === 'ImgSlideModal') {
      setOpenImgModal(false);
    }
  };

  const paginate = (newDirection) => {
    if (page + newDirection < MIN_ORDER || page + newDirection > MAX_ORDER) {
      return;
    }

    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className='ImgSlideModal' onMouseDown={(e) => closeModal(e.target)}>
      <AnimatePresence custom={direction}>
        <motion.img
          key={page}
          src={imgs[page].img}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: {
              type: 'spring',
              stiffness: 300,
              damping: 30,
            },
            scale: {
              type: 'spring',
              damping: 30,
              stiffness: 300,
            },
            // opacity: { duration: 0.5 },
          }}
          className='img'
        />
      </AnimatePresence>
      <div className='next' onClick={() => paginate(1)}>
        {'‣'}
      </div>
      <div className='prev' onClick={() => paginate(-1)}>
        {'‣'}
      </div>
    </div>
  );
};

export default React.memo(ImgSlideModal);
