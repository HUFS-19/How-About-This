import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import {
  prodInfoApi,
  prodEditApi,
  profileApi,
  userApi,
  categoryApi,
} from '../api/API';
import { catchError } from '../utils/catchError';

import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import {
  FaAngleLeft,
  FaAngleRight,
  FaCircle,
  FaShareAlt,
} from 'react-icons/fa';

import '../styles/pages/_Product.scss';

import CommentWrapper from '../components/CommentWrapper';
import BlackBtn from '../components/button/BlackBtn';
import WhiteBtn from '../components/button/WhiteBtn';
import Modal from '../components/modal/Modal';
import ImgSlideModal from '../components/modal/ImgSlideModal';

const Product = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [imgArray, setImgArray] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [slidePx, setSlidePx] = useState(0);
  const [userProfile, setUserProfile] = useState({});
  const [isUploader, setIsUploader] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [startId, setStartId] = useState(0);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const imgDiv = useRef();
  const heartIcon = useRef();
  const IMG_WIDTH = 500;

  if (heartIcon.current) {
    if (clicked && !heartIcon.current.classList.contains('clicked')) {
      heartIcon.current.classList.add('clicked');
      prodEditApi.addLike(id).catch((error) => catchError(error));
    } else if (!clicked && heartIcon.current.classList.contains('clicked')) {
      heartIcon.current.classList.remove('clicked');
      prodEditApi.deleteLike(id).catch((error) => catchError(error));
    }
  }

  const deleteProduct = () => {
    prodEditApi.deleteProd(id).catch((error) => catchError(error));

    navigate('/');
  };

  useEffect(() => {
    if (isNaN(id)) {
      navigate('/*');
    }

    const getProduct = async () => {
      const productInfo = await prodInfoApi
        .getProd(id)
        .catch((error) => catchError(error));

      if (productInfo.data.length === 1) {
        navigate('/*');
        return;
      }

      const product = productInfo.data[0];
      const isUploader = productInfo.data[1].isUploader;
      setIsUploader(isUploader);

      const profile = await profileApi
        .getProfile(product.userID)
        .catch((error) => catchError(error));
      setUserProfile(profile.data.profileData);

      const category = await categoryApi
        .getCateName(product.cateID)
        .catch((error) => catchError(error));
      const categoryName = category.data[0].cateNAME;

      const tags = await prodInfoApi
        .getTag(id)
        .catch((error) => catchError(error));

      setProduct({
        ...product,
        cateNAME: categoryName,
        tags: tags.data,
      });
    };

    const getImgs = () => {
      prodInfoApi.getProdImgs(id).then((res) => {
        setImgArray(res.data);
      });
    };

    const getLikeState = () => {
      prodInfoApi.likeCheck(id).then((res) => {
        if (res.data.state) {
          setClicked(true);
        }
        setLikeCount(res.data.likecount);
      });
    };

    getProduct();
    getImgs();
    getLikeState();
  }, [id, clicked]);

  const onClickLike = () => {
    userApi.checkLogin().then((res) => {
      if (!res.data.login) {
        Swal.fire({
          title: '로그인이 필요한 서비스입니다.',
          confirmButtonColor: '#000000',
        });
      } else {
        setClicked(!clicked);
      }
    });
  };

  const onClickDm = () => {
    try {
      userApi.checkLogin().then((res) => {
        if (!res.data.login) {
          Swal.fire({
            title: '로그인이 필요한 서비스입니다.',
            confirmButtonColor: '#000000',
          });
          return;
        }

        navigate(`/product/${id}/chat?inquirer=${res.data.userId}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (product.tags) {
    return (
      <div className='Product'>
        <div className='Product-wrapper'>
          <div className='Product-background'>
            <section id='Product-detail'>
              <div className='Product-imgs'>
                <div className='Product-slider'>
                  <div
                    className='img-wrapper'
                    ref={imgDiv}
                    style={{
                      transform: `translateX(${slidePx}px)`,
                      transition: '0.5s ease',
                    }}
                    onClick={(e) => {
                      setStartId(parseInt(e.target.id));
                      setOpenImgModal(true);
                    }}
                  >
                    {imgArray.map((img) => {
                      return (
                        <img
                          className='Product-img'
                          id={img.imgOrder}
                          key={img.imgOrder}
                          src={img.img}
                          alt=''
                        />
                      );
                    })}
                  </div>
                  {openImgModal && (
                    <ImgSlideModal
                      imgs={imgArray}
                      startId={startId}
                      setOpenImgModal={setOpenImgModal}
                    />
                  )}
                </div>
                {imgArray.length === 1 ? (
                  <></>
                ) : (
                  <div>
                    <div className='img-circle-btn-wrapper'>
                      {imgArray.map((img) => {
                        return (
                          <div
                            key={img.imgOrder}
                            id={img.imgOrder}
                            className='icon-wrapper'
                            onClick={(e) => {
                              setSlidePx(
                                -IMG_WIDTH *
                                  (e.target.closest('div.icon-wrapper').id - 1),
                              );
                            }}
                          >
                            <FaCircle className='circle-btn' />
                          </div>
                        );
                      })}
                    </div>
                    <FaAngleLeft
                      onClick={() => {
                        if (slidePx === 0) {
                          return;
                        }
                        setSlidePx(slidePx + IMG_WIDTH);
                      }}
                      className='img-left-btn'
                    />
                    <FaAngleRight
                      onClick={() => {
                        if (
                          slidePx - IMG_WIDTH <=
                          -IMG_WIDTH * imgArray.length
                        ) {
                          return;
                        }
                        setSlidePx(slidePx - IMG_WIDTH);
                      }}
                      className='img-right-btn'
                    />
                  </div>
                )}
              </div>
              <div className='Product-info'>
                <p id='category'>{product.cateNAME}</p>
                <p id='name'>{product.prodNAME}</p>
                <p id='tags'>
                  {product.tags.map((tag) => {
                    return <span key={tag.tagID}>#{tag.tagNAME}</span>;
                  })}
                </p>
                <div id='buttons'>
                  <div id='user-info'>
                    <Link to={`/profile/${product.userID}`}>
                      <div>
                        <img
                          className='profile'
                          src={userProfile.userIcon}
                          alt=''
                        />
                        <span id='username'>{userProfile.nickname}</span>
                      </div>
                    </Link>
                    <div className='btn-wrapper'>
                      {isUploader ? (
                        <div>
                          <WhiteBtn
                            id={'btn-revise'}
                            text={'수정'}
                            onClick={() => navigate(`/edit/${id}`)}
                          />
                          <BlackBtn
                            id={'btn-delete'}
                            text={'삭제'}
                            onClick={() => setOpenDeleteModal(true)}
                          />
                          {openDeleteModal && (
                            <Modal
                              className={'delete-modal'}
                              btnFunc1={setOpenDeleteModal}
                              btnFunc2={deleteProduct}
                            />
                          )}
                        </div>
                      ) : (
                        <div>
                          <WhiteBtn
                            id={'btn-dm'}
                            text={'DM'}
                            onClick={onClickDm}
                          />
                          <FontAwesomeIcon
                            className='message-icon'
                            icon={faMessage}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div id='btns-wrapper'>
                    <BlackBtn
                      goToLink={product.link}
                      id={'buy-btn'}
                      text={'구입하기'}
                    />
                    <div className='btns-col2'>
                      <FaShareAlt
                        onClick={() => setOpenShareModal(true)}
                        className='share-icon'
                      />
                      {openShareModal && (
                        <Modal
                          className={'share-modal'}
                          btnFunc1={setOpenShareModal}
                        />
                      )}
                      <div className='likeBtn'>
                        <FontAwesomeIcon
                          ref={heartIcon}
                          onClick={onClickLike}
                          className={`heart-icon ${clicked ? 'clicked' : ''}`}
                          icon={faHeart}
                        />
                        <p className='likeCount'>{likeCount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id='Product-desc'>
              <hr />
              {product.detail.split('\\n').map((sentence, i) => {
                return (
                  <p key={i} id='sentence'>
                    {sentence}
                  </p>
                );
              })}
            </section>
          </div>
        </div>
        <CommentWrapper />
      </div>
    );
  }
};

export default Product;
