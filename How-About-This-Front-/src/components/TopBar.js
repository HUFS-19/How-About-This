import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { categoryApi } from '../api/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CategorySetStateContext, SearchSetStateContext } from '../App';

import '../styles/components/_TopBar.scss';

const TopBar = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [selectedCate, setSelectedCate] = useState('all');
  const [type, setType] = useState('product');
  const [text, setText] = useState('');

  const setCate = useContext(CategorySetStateContext);
  const setSearch = useContext(SearchSetStateContext);

  useEffect(() => {
    const getCategories = async () => {
      categoryApi.getAllCateName().then((res) => setCategory(res.data));
    };
    getCategories();
  }, []);

  const onKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      setSearch({ category: selectedCate, type: type, search: text });
      setText('');
      setCate(0);
      setCate(-2);
      navigate('/');
    }
  };

  const onChangeCate = (e) => {
    setSelectedCate(e.target.value);
  };
  const onChangeType = (e) => {
    setType(e.target.value);
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <div className='TopBar'>
      <select className='category-selector' onChange={onChangeCate}>
        <option value='all'>전체</option>
        {category.map((category) => {
          return <option value={category.cateID}>{category.cateNAME}</option>;
        })}
      </select>
      <select className='search-selector' onChange={onChangeType}>
        <option value='product'>상품명</option>
        <option value='uploader'>작성자명</option>
        <option value='tag'>태그명</option>
      </select>
      <div className='search_wrapper'>
        <FontAwesomeIcon className='search-icon' icon={faSearch} />
        <input
          className='search-bar'
          type='text'
          placeholder='검색어를 입력해주세요'
          onChange={onChangeText}
          onKeyDown={onKeyDownEnter}
          value={text}
        />
      </div>
    </div>
  );
};

export default TopBar;
