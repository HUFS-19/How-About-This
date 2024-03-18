import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { FaInfoCircle } from 'react-icons/fa';

import { prodEditApi, categoryApi } from '../api/API';
import { catchError } from '../utils/catchError';

import BlackBtn from '../components/button/BlackBtn';
import WhiteBtn from '../components/button/WhiteBtn';

import '../styles/pages/_Upload.scss';

const convertUrlToFile = async (img) => {
  const url = img;
  const response = await fetch(url);
  const data = await response.blob();
  const filename = url.split('/').pop();
  const file = new File([data], filename, { type: data.type });

  return file;
};

const Upload = ({ isEdit, product, productId }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  let [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [link, setLink] = useState('');
  const [shownImages, setShownImages] = useState(['', '', '', '']);
  const [images, setImages] = useState([]);

  const isFirstCateUpdate = useRef(true);
  const isFirstTitleUpdate = useRef(true);
  const isFirstDescUpdate = useRef(true);
  const isFirstLinkUpdate = useRef(true);
  const isFirstImgUpdate = useRef(true);

  const titleInput = useRef();
  const descInput = useRef();
  const linkInput = useRef();

  const [isValidCate, setValidCate] = useState(true);
  const [isValidTitle, setValidTitle] = useState(true);
  const [isValidDesc, setValidDesc] = useState(true);
  const [isValidLink, setValidLink] = useState(true);
  const [isValidImg, setValidImg] = useState(true);

  const [showTagMethod, setTagMethod] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const { title, description, link, category, tags, images } = product;
      setTitle(title);
      setDescription(description);
      setLink(link);
      setCategory(category);
      setTags(tags);
      setShownImages(images);

      let imgArray = [];
      images.forEach((img) => {
        convertUrlToFile(img).then((file) => imgArray.push(file));
      });

      setImages(imgArray);
    }
  }, [isEdit, product]);

  useEffect(() => {
    if (isFirstCateUpdate.current) {
      isFirstCateUpdate.current = false;
      return;
    }

    setValidCate(category ? true : false);
  }, [category]);

  useEffect(() => {
    if (isFirstTitleUpdate.current) {
      isFirstTitleUpdate.current = false;
      return;
    }

    setValidTitle(title ? true : false);
  }, [title]);

  useEffect(() => {
    if (isFirstDescUpdate.current) {
      isFirstDescUpdate.current = false;
      return;
    }

    setValidDesc(description ? true : false);
  }, [description]);

  useEffect(() => {
    if (isFirstLinkUpdate.current) {
      isFirstLinkUpdate.current = false;
      return;
    }

    setValidLink(link ? true : false);
  }, [link]);

  useEffect(() => {
    if (isEdit) {
      return;
    }

    if (isFirstImgUpdate.current) {
      isFirstImgUpdate.current = false;
      return;
    }

    setValidImg(images.length > 0 ? true : false);
  }, [images, isEdit]);

  const hasBlankInput = () => {
    if (!category) {
      setValidCate(false);
      return true;
    }

    if (!title) {
      titleInput.current.focus();
      setValidTitle(false);
      return true;
    }

    if (!description) {
      descInput.current.focus();
      setValidDesc(false);
      return true;
    }

    if (!link) {
      linkInput.current.focus();
      setValidLink(false);
      return true;
    }

    if (images.length === 0) {
      setValidImg(false);
      return true;
    }
  };

  const onEditProduct = async () => {
    prodEditApi
      .editProd(productId, category, title, description, link)
      .then((res) => console.log(res.statusText))
      .catch((error) => catchError(error));

    const formData = new FormData();
    images.forEach((image, i) => {
      formData.append(
        'image',
        image,
        `${productId}_${image.name.slice(0, 1)}_${i}.jpg`,
      );
    });

    prodEditApi
      .editProdImg(productId, formData)
      .then((res) => console.log(res.statusText))
      .catch((error) => catchError(error));

    prodEditApi
      .editProdTag(productId, tags)
      .then((res) => console.log(res.statusText))
      .catch((error) => catchError(error));

    navigate(`/product/${productId}`);
    return;
  };

  const onUploadProduct = async () => {
    if (hasBlankInput()) {
      return;
    }

    if (isEdit) {
      onEditProduct();
      return;
    }

    const uploadedProduct = await prodEditApi.postProd(
      category,
      title,
      description,
      link,
    );

    const uploadedProductId = uploadedProduct.data[0];

    const formData = new FormData();
    images.forEach((image, i) => {
      formData.append(
        'image',
        image,
        `${uploadedProductId}_${image.name.slice(0, 1)}_${i}.jpg`,
      );
    });

    prodEditApi
      .postProdImg(uploadedProductId, formData)
      .then((res) => console.log(res.statusText))
      .catch((error) => catchError(error));

    prodEditApi
      .postProdTag(uploadedProductId, tags)
      .then((res) => console.log(res.statusText))
      .catch((error) => catchError(error));

    navigate(`/product/${uploadedProductId}`);
  };

  const onPushTag = (e) => {
    if (e.key === 'Enter') {
      if (tag === '') {
        return;
      }

      if (tags.includes(tag) || tags.length >= 4) {
        setTag('');
        return;
      }

      if (tag[0] === '#') {
        tag = [...tag].splice(1).join('');
      }

      setTags([...tags, tag]);
      setTag('');
    }
  };

  const onDeleteTag = (e) => {
    let new_tags = tags.filter((tag, i) => i !== parseInt(e.target.id));
    setTags(new_tags);
  };

  const onUploadImage = (e) => {
    const fileArray = e.target.files;

    let temp = [];
    let temp2 = [];

    Object.values(fileArray).forEach((file, i) => {
      if (i >= 4) {
        return false;
      }

      const imageUrl = URL.createObjectURL(file);
      temp.push(imageUrl);
      temp2.push(file);
    });

    setShownImages(temp);
    setImages(temp2);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const currentShownImgs = [...shownImages];
    const currentImgs = [...images];

    const draggingItemIndex = result.source.index;
    const afterDragItemIndex = result.destination.index;

    const removeShownImgs = currentShownImgs.splice(draggingItemIndex, 1);
    const removeImgs = currentImgs.splice(draggingItemIndex, 1);

    currentShownImgs.splice(afterDragItemIndex, 0, removeShownImgs[0]);
    currentImgs.splice(afterDragItemIndex, 0, removeImgs[0]);

    setShownImages(currentShownImgs);
    setImages(currentImgs);
  };

  useEffect(() => {
    categoryApi.getAllCateName().then((res) => setCategories(res.data));
  }, []);

  return (
    <div className='Upload'>
      <div className='Upload-wrapper'>
        <div className='Upload-content'>
          <div className='Upload-title'>
            {isEdit ? '추천 제품 수정' : '추천 제품 등록'}
          </div>
          <div className='Upload-input-row1'>
            {isValidCate ? (
              <></>
            ) : (
              <p className='caution' id='cate-caution'>
                <FaInfoCircle className='icon' />
                카테고리를 설정해주세요
              </p>
            )}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='category-selector'
            >
              <option value=''>카테고리</option>
              {categories.map((category) => {
                return (
                  <option key={category.cateID} value={category.cateID}>
                    {category.cateNAME}
                  </option>
                );
              })}
            </select>
            {isValidTitle ? (
              <></>
            ) : (
              <p className='caution' id='title-caution'>
                <FaInfoCircle className='icon' />
                상품명(제목)을 작성해주세요
              </p>
            )}
            <input
              ref={titleInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxlength={20}
              className='input-title'
              type='text'
              placeholder='제품명을 입력해주세요'
            />
          </div>
          <div className='Upload-input-row2'>
            {isValidDesc ? (
              <></>
            ) : (
              <p className='caution' id='desc-caution'>
                <FaInfoCircle className='icon' />
                제품 소개를 위한 내용을 작성해주세요
              </p>
            )}
            <textarea
              ref={descInput}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxlength={1000}
              className='input-contents'
              cols='30'
              rows='10'
              placeholder='추천하는 제품을 소개해주세요'
            ></textarea>
          </div>
          <div className='Upload-input-row3'>
            <div className='tags'>
              {tags.map((tag, i) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.2,
                      delay: 0,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    className='tag'
                    id={i}
                    key={i}
                    onClick={(e) => onDeleteTag(e)}
                  >
                    {tag}
                  </motion.div>
                );
              })}
            </div>
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onFocus={() => setTagMethod(true)}
              onBlur={() => setTagMethod(false)}
              onKeyPress={(e) => onPushTag(e)}
              className='input-tags'
              type='text'
              placeholder='제품과 관련된 태그를 입력해주세요 (최대 4개)'
              maxlength='10'
            />
            {showTagMethod ? (
              <motion.div
                initial={{ opacity: 0, transform: 'translateY(-10px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{
                  duration: 0.4,
                  delay: 0,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className='tag-method'
              >
                <p>엔터를 입력하여 태그를 등록할 수 있습니다.</p>
                <p>등록된 태그를 클릭하면 삭제됩니다.</p>
              </motion.div>
            ) : (
              <></>
            )}
          </div>
          <div className='Upload-input-row4'>
            {isValidLink ? (
              <></>
            ) : (
              <p className='caution' id='link-caution'>
                <FaInfoCircle className='icon' />
                제품 소개를 위한 내용을 작성해주세요
              </p>
            )}
            <input
              ref={linkInput}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className='input-link'
              type='text'
              placeholder='제품 구매 링크를 복사 붙여넣기 해주세요'
            />
          </div>
          <div className='Upload-image'>
            {isValidImg ? (
              <></>
            ) : (
              <p className='caution' id='img-caution'>
                <FaInfoCircle className='icon' />
                제품 이미지를 추가해주세요
              </p>
            )}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='img-wrapper' direction='horizontal'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='img-wrapper'
                  >
                    {shownImages.map((image, i) => {
                      return (
                        <Draggable
                          draggableId={`${i}`}
                          isDragDisabled={image === ''}
                          key={i}
                          index={i}
                        >
                          {(provided) =>
                            image === '' ? (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                key={i}
                              ></div>
                            ) : (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                key={i}
                              >
                                <img src={image} alt='' />
                              </div>
                            )
                          }
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className='img-upload-wrapper'>
              <label for='img-upload-btn'>
                <p className='img-upload-btn'>+ 제품 사진 등록</p>
              </label>
            </div>

            <input
              type='file'
              accept='image/*'
              multiple='multiple'
              id='img-upload-btn'
              onChange={(e) => onUploadImage(e)}
              style={{ display: 'none' }}
            />
          </div>
          <div className='Upload-btn'>
            <WhiteBtn
              onClick={() => navigate(-1)}
              text={isEdit ? '수정 취소' : '작성 취소'}
            />
            <BlackBtn
              onClick={onUploadProduct}
              text={isEdit ? '수정 완료' : '작성 완료'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Upload);
