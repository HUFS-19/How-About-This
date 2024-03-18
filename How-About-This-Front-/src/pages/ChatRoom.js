import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import { prodInfoApi, messageApi, prodEditApi, userApi } from '../api/API';
import { catchError } from '../utils/catchError';
import { io } from 'socket.io-client';

import { GoChevronLeft } from 'react-icons/go';
import { LiaPaperPlane } from 'react-icons/lia';
import Swal from 'sweetalert2';

import Messages from '../components/Messages';

import '../styles/pages/_ChatRoom.scss';

const alterDateExpression = () => {
  const YEAR = new Date().getFullYear();
  const MONTH = new Date().getMonth() + 1;
  const MONTH_EXPRESSION = MONTH < 10 ? '0' + String(MONTH) : String(MONTH);
  const DATE = new Date().getDate();
  const DATE_EXPRESSION = DATE < 10 ? '0' + String(DATE) : String(DATE);

  return `${YEAR}-${MONTH_EXPRESSION}-${DATE_EXPRESSION}`;
};

const ChatRoom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const inquirerId = searchParams.get('inquirer');

  const [loggedInUser, setLoggedInUser] = useState('');
  const [product, setProduct] = useState({});
  const [productImg, setProductImg] = useState('');
  const [input, setInput] = useState('');
  const [msgArray, setMsgArray] = useState([]);
  const [chatRoomId, setChatRoomId] = useState('');

  let socket = io(process.env.REACT_APP_HOST, {
    transports: ['websocket'],
  });
  socket.connect();

  const sendMsg = async (e) => {
    if (!input) {
      return;
    }

    if (e.type === 'keydown' && e.key !== 'Enter') {
      return;
    }

    setMsgArray((msgArray) => [
      ...msgArray,
      {
        text: input,
        senderId: loggedInUser,
        time: new Date().toLocaleTimeString().slice(0, -3),
        date: alterDateExpression(),
      },
    ]);

    socket.emit('sendMsg', chatRoomId, input, loggedInUser);
    pushNewMsgInDB(input);
    setInput('');
  };

  const pushNewMsgInDB = (message) => {
    messageApi
      .pushMsg({
        chatRoomId,
        product,
        inquirerId,
        senderId: loggedInUser,
        message,
      })
      .then((res) => console.log(res.statusText))
      .catch((error) => catchError(error));
  };

  const joinChatRoom = (chatRoomId) => {
    socket.emit('joinRoom', chatRoomId);
  };

  useEffect(() => {
    socket.on('sendMsg', async (msg, senderId) => {
      const loggedInUser = await userApi
        .checkLogin()
        .catch((error) => catchError(error));

      const loggedInUserId = loggedInUser.data.userId;

      if (loggedInUserId !== senderId) {
        setMsgArray((msgArray) => [
          ...msgArray,
          {
            text: msg,
            senderId: senderId,
            time: new Date().toLocaleTimeString().slice(0, -3),
            date: alterDateExpression(),
          },
        ]);
      }
    });
  }, []);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const loggedInUser = await userApi
        .checkLogin()
        .catch((error) => catchError(error));

      const loggedIn = loggedInUser.data.login;

      if (!loggedIn) {
        Swal.fire({
          title: '로그인이 필요한 서비스입니다.',
          confirmButtonColor: '#000000',
        });

        navigate(-1);
        return;
      }

      setLoggedInUser(loggedInUser.data.userId);
    };

    const getProductInfo = async () => {
      const product = await prodInfoApi
        .getProd(id)
        .catch((error) => catchError(error));

      const productId = product.data[0];
      setProduct(productId);

      const productImgs = await prodInfoApi
        .getProdImgs(id)
        .catch((error) => catchError(error));

      const MAIN_IMG = productImgs.data.filter((img) => img.imgOrder === 1);
      const MAIN_IMG_URL = MAIN_IMG[0].img;
      setProductImg(MAIN_IMG_URL);
    };

    const setPreviousMsg = async (chatRoomId) => {
      const messages = await messageApi
        .getMsgAll(chatRoomId)
        .catch((error) => catchError(error));

      const RECEIVED_MSG_ARRAY = JSON.parse(JSON.stringify(messages.data));

      RECEIVED_MSG_ARRAY.forEach((msg) => {
        const KR_TIME = String(new Date(msg.time));
        const TIME = KR_TIME.slice(16, 21);
        const HOUR = parseInt(TIME.slice(0, 2));
        const AM_OR_PM = HOUR >= 12 ? '오후 ' : '오전 ';

        const HOUR_EXPRESSION = HOUR <= 12 ? HOUR : HOUR - 12;
        setMsgArray((msgArray) => [
          ...msgArray,
          {
            text: msg.content,
            senderId: msg.senderID,
            time: AM_OR_PM + String(HOUR_EXPRESSION) + TIME.slice(2),
            date: msg.time.slice(0, 10),
          },
        ]);
      });
    };

    const setNewChatRoom = async () => {
      const newChatRoom = await prodEditApi
        .createChatRoom(id, inquirerId)
        .catch((error) => catchError(error));

      const newChatRoomId = newChatRoom.data[0];

      setChatRoomId(newChatRoomId);
      joinChatRoom(newChatRoomId);
    };

    const getChatRoom = async () => {
      const chatRoomInfo = await prodInfoApi
        .getChatRoom(id, inquirerId)
        .catch((error) => catchError(error));

      if (chatRoomInfo.data.length === 0) {
        setNewChatRoom();
        return;
      }

      const chatRoomId = chatRoomInfo.data[0].chatroomID;
      setChatRoomId(chatRoomId);
      joinChatRoom(chatRoomId);

      setPreviousMsg(chatRoomId);
    };

    checkLoggedIn();
    getProductInfo();
    getChatRoom();
  }, []);

  return (
    <div className='Chatroom'>
      <div className='Chatroom-wrapper'>
        <div className='Chatroom-background'>
          <div className='Chatroom-topbar'>
            <GoChevronLeft
              className='goback-icon'
              onClick={() => navigate(-1)}
            />
            <p
              className='user-name'
              onClick={() => {
                product.userID === loggedInUser
                  ? navigate(`/profile/${inquirerId}`)
                  : navigate(`/profile/${product.userID}`);
              }}
            >
              {product.userID === loggedInUser ? inquirerId : product.userID}
            </p>
            <div></div>
          </div>
          <div className='Chatroom-productInfo'>
            <div
              className='product-img'
              onClick={() => navigate(`/product/${product.prodID}`)}
            >
              <img src={productImg} alt='' />
            </div>
            <div
              className='product-name'
              onClick={() => navigate(`/product/${product.prodID}`)}
            >
              {product.prodNAME}
            </div>
            <div className='product'></div>
          </div>
          <div className='Chatroom-chatplace'>
            <Messages msgArray={msgArray} loggedInUser={loggedInUser} />
          </div>
          <div className='Chatroom-bottombar'>
            <input
              value={input}
              onKeyDown={(e) => sendMsg(e)}
              onChange={(e) => setInput(e.target.value)}
              className='msg-input'
              type='text'
              placeholder='메시지 보내기'
            />
            <LiaPaperPlane className='send-icon' onClick={sendMsg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
