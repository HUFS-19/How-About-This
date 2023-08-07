import { useState, useEffect } from 'react';
import axios from 'axios';

import BlackBtn from '../components/button/BlackBtn';
import WhiteBtn from '../components/button/WhiteBtn';

import '../styles/pages/_Upload.scss';

const Upload = () => {
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [link, setLink] = useState('');
  // const [images, setImages] = useState([]);

  const uploadProduct = async () => {
    await axios
      .post(
        'http://localhost:5000/product/upload',
        {
          category: category,
          prodNAME: title,
          detail: description,
          tags: tags,
          link: link,
          //Mimg
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    const getCategories = async () => {
      await axios
        .get('http://localhost:5000/category/all')
        .then((res) => setCategories(res.data));
    };

    getCategories();
  }, []);
  return (
    <div className='Upload'>
      <div className='Upload-wrapper'>
        <div className='Upload-content'>
          <div className='Upload-title'>추천 제품 등록</div>
          <div className='Upload-input-row1'>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='category-selector'
            >
              <option value=''>카테고리</option>
              {categories.map((category) => {
                return (
                  <option key={category.cateID} value={category.cateNAME}>
                    {category.cateNAME}
                  </option>
                );
              })}
            </select>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='input-title'
              type='text'
              placeholder='제품명을 입력해주세요'
            />
          </div>
          <div className='Upload-input-row2'>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='input-contents'
              cols='30'
              rows='10'
              placeholder='추천하는 제품을 소개해주세요'
            ></textarea>
          </div>
          <div className='Upload-input-row3'>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className='input-tags'
              type='text'
              placeholder='제품과 관련된 태그를 입력해주세요 (최대 4개)'
            />
          </div>
          <div className='Upload-input-row4'>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className='input-link'
              type='text'
              placeholder='제품 구매 링크를 복사 붙여넣기 해주세요'
            />
          </div>
          <div className='Upload-image'>
            <div className='img-wrapper'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className='img-btn-wrapper'>
              <WhiteBtn id={'img-upload-btn'} text={'제품 사진 등록'} />
            </div>
          </div>
          <div className='Upload-btn'>
            <BlackBtn onClick={uploadProduct} text={'작성 완료'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
