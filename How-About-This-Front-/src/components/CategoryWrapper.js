import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { categoryApi } from '../api/API';
import { CategorySetStateContext } from '../App';

import '../styles/components/_CategoryWrapper.scss';

const CategoryWrapper = () => {
  const [categories, setCategories] = useState([]);
  const [clicked, setClicked] = useState('0');

  const setCategory = useContext(CategorySetStateContext);

  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const clickCategory = (e) => {
    let clickedLi = e.target.closest('li');

    if (clickedLi === null) {
      return;
    }

    setCategory(clickedLi.id);
  };

  useEffect(() => {
    const getCategories = async () => {
      await categoryApi.getAllCateName().then((res) => setCategories(res.data));
    };

    getCategories();
  }, []);

  return (
    <div className='CategoryWrapper' onClick={(e) => clickCategory(e)}>
      <li
        id='0'
        onClick={() => {
          setClicked('0');
          goHome();
        }}
        className={clicked === '0' ? 'clicked' : ''}
      >
        전체
      </li>
      <li
        id='-1'
        onClick={() => {
          setClicked('-1');
          goHome();
        }}
        className={clicked === '-1' ? 'clicked' : ''}
      >
        좋아요 목록
      </li>
      {categories.map((category) => {
        return (
          <li
            key={category.cateID}
            id={category.cateID}
            onClick={() => {
              setClicked(category.cateID);
              goHome();
            }}
            className={clicked === category.cateID ? 'clicked' : ''}
          >
            {category.cateNAME}
          </li>
        );
      })}
    </div>
  );
};

export default CategoryWrapper;
