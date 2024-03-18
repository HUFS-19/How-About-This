import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  withCredentials: true,
});

export const userApi = {
  login: (id, pw) => {
    return API.post('userAPI/login', { id: id, password: pw });
  },

  logout: () => {
    return API.get('userAPI/logout');
  },

  join: (id, pw) => {
    return API.post('userAPI/join', {
      id: id,
      password: pw,
    });
  },

  idCheck: (id) => {
    return API.post('userAPI/join/idCheck', { id: id });
  },

  checkLogin: () => {
    return API.get('userAPI/checkLogin');
  },

  //로그인여부, 닉네임, 아이콘, 아이디 return
  getUser: () => {
    return API.get('userAPI/nav');
  },

  getChatRoom: (userId) => {
    return API.get(`userAPI/${userId}/chatRoomList`);
  },
};

export const profileApi = {
  getProfile: (userId) => {
    return API.get(`profileAPI/${userId}`);
  },

  changeUserIcon: (userId, formData) => {
    return API.put(`profileAPI/update/userIcon/${userId}`, formData);
  },

  deleteSns: (userId, deletedSns) => {
    return API.delete(`profileAPI/deleteSns/${userId}`, { data: deletedSns });
  },

  updateProfile: (userId, snsList, profileData) => {
    return API.put(`profileAPI/update/${userId}`, { snsList, profileData });
  },
};

export const prodInfoApi = {
  getProd: (prodId) => {
    return API.get(`productAPI/${prodId}`);
  },

  getUserProd: (userId) => {
    return API.get(`productAPI/user/${userId}`);
  },

  search: (cate, type, search) => {
    return API.post('productAPI/search', {
      category: cate,
      type: type,
      search: search,
    });
  },

  getCateProds: (cateId, sortMethod) => {
    return API.post('productAPI/list', { category: cateId, sort: sortMethod });
  },

  getProdImgs: (prodID) => {
    return API.get(`productAPI/${prodID}/imgs`);
  },

  getLike: () => {
    return API.get('productAPI/like');
  },

  getTag: (prodId) => {
    return API.get(`productAPI/${prodId}/tags`);
  },

  likeCheck: (prodID) => {
    return API.get(`productAPI/${prodID}/likeCheck`);
  },

  getChatRoom: (prodId, inquirerId) => {
    return API.get(`productAPI/${prodId}/chat/${inquirerId}`);
  },
};

export const prodEditApi = {
  deleteProd: (prodId) => {
    return API.delete(`productAPI/${prodId}`);
  },

  addLike: (prodId) => {
    return API.get(`productAPI/${prodId}/like`);
  },

  deleteLike: (prodId) => {
    return API.delete(`productAPI/${prodId}/like`);
  },

  createChatRoom: (prodId, inquirerId) => {
    return API.post(`productAPI/${prodId}/chat/${inquirerId}`);
  },

  editProd: (prodId, cate, title, desc, link) => {
    return API.put(`productApi/${prodId}`, {
      cateID: cate,
      prodNAME: title,
      detail: desc,
      link: link,
    });
  },

  editProdImg: (prodId, formData) => {
    return API.put(`productAPI/${prodId}/imgs`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  editProdTag: (prodId, tags) => {
    return API.put(`productAPI/${prodId}/tags`, { tags: tags });
  },

  postProd: (cate, title, desc, link) => {
    return API.post('productAPI/new', {
      cateID: cate,
      prodNAME: title,
      detail: desc,
      link,
    });
  },

  postProdImg: (prodId, formData) => {
    return API.post(`/productAPI/${prodId}/imgs`, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },

  postProdTag: (prodId, tags) => {
    return API.post(`/productAPI/${prodId}/tags`, { tags: tags });
  },
};

export const categoryApi = {
  getCateName: (cateNum) => {
    return API.get(`categoryAPI/${cateNum}`);
  },

  getAllCateName: () => {
    return API.get(`categoryAPI/all`);
  },
};

export const commentApi = {
  getComments: (prodId) => {
    return API.get(`commentAPI/${prodId}`);
  },
  postComment: (prodId, userId, content) => {
    return API.post(`commentAPI/${prodId}`, {
      userID: userId,
      content: content,
    });
  },
  deleteComments: (commentId) => {
    return API.delete(`commentAPI/${commentId}`);
  },
};

export const messageApi = {
  getLastMsg: (roomId) => {
    return API.get(`messageAPI/chatroom/${roomId}/lastMessage`);
  },
  getMsgAll: (chatroomId) => {
    return API.get(`messageAPI/chatroom/${chatroomId}`);
  },
  pushMsg: (msgData) => {
    return API.post('messageAPI', msgData);
  },
};

export const changePwApi = {
  changePw: (userId, inputs) => {
    return API.put(`changePasswordAPI/${userId}`, { inputs });
  },
};
