"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postUploadProductImage = exports.postUploadProduct = exports.getLikeProduct = exports.getImgs = exports.getTags = exports.getUserProducts = exports.getProductInCategory = exports.getProduct = exports.getProducts = void 0;

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getProducts = function getProducts(req, res) {
  _db["default"].query('select * from product', function (error, results) {
    if (error) {
      console.log(error);
    }

    res.send(results);
  });
};

exports.getProducts = getProducts;

var getProduct = function getProduct(req, res) {
  _db["default"].query("select * from product where prodID=".concat(req.params.id), function (error, results) {
    if (error) {
      console.log(error);
    }

    res.send(results);
  });
};

exports.getProduct = getProduct;

var getProductInCategory = function getProductInCategory(req, res) {
  _db["default"].query("select * from product where cateID=".concat(req.params.cateId), function (error, results) {
    if (error) {
      console.log(error);
    }

    res.send(results);
  });
};

exports.getProductInCategory = getProductInCategory;

var getUserProducts = function getUserProducts(req, res) {
  _db["default"].query("select * from product where userID='".concat(req.params.userId, "'"), function (error, results) {
    if (error) {
      console.log(error);
    }

    res.send(results);
  });
};

exports.getUserProducts = getUserProducts;

var getTags = function getTags(req, res) {
  _db["default"].query("select * from tag where prodID=".concat(req.params.id), function (error, results) {
    if (error) {
      console.log(error);
    }

    res.send(results);
  });
};

exports.getTags = getTags;

var getImgs = function getImgs(req, res) {
  _db["default"].query("select * from prodimg where prodID=".concat(req.params.id), function (error, results) {
    if (error) {
      console.log(error);
    }

    res.send(results);
  });
};

exports.getImgs = getImgs;

var getLikeProduct = function getLikeProduct(req, res) {
  if (!req.user) {
    res.send({
      alert: true
    });
  } else {
    _db["default"].query("select p.* from Product p, UserLike u where u.userID = '".concat(req.user.id, "' and p.prodID = u.prodID"), function (err, results) {
      try {
        res.send(results);
      } catch (err) {
        console.log('LikeProduct error');
        res.send([]);
      }
    });
  }
};

exports.getLikeProduct = getLikeProduct;

var postUploadProduct = function postUploadProduct(req, res) {
  if (!req.user) {
    res.status(500).send('No User');
    return;
  }

  var _req$body = req.body,
      cateID = _req$body.cateID,
      prodNAME = _req$body.prodNAME,
      detail = _req$body.detail,
      link = _req$body.link;

  _db["default"].query("insert into product (userID, cateID, prodNAME, detail, link, Mimg) values ('".concat(req.user.id, "', '").concat(cateID, "', '").concat(prodNAME, "', '").concat(detail, "', '").concat(link, "', 'srcmimg');"), function (error, results) {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('굿!');
    }
  });
};

exports.postUploadProduct = postUploadProduct;

var postUploadProductImage = function postUploadProductImage(req, res) {
  // console.log('req.files:', req.files);
  // console.log('req.user: ', req.user);
  // console.log(typeof req.params.id);
  if (!req.user) {
    return res.status(500).send('No User');
  }

  _db["default"].query("select * from product where prodNAME='".concat(req.params.id, "'"), function (error, results) {
    if (error) {
      console.log(error);
    } else {
      // 같은 이름의 제품인 경우는...?
      var prodID = results[0]['prodID'];
      req.files.forEach(function (file) {
        var imgOrder = parseInt(file.originalname);

        _db["default"].query("insert into prodimg (prodID, img, imgOrder) values ('".concat(prodID, "', 'srcimg', '").concat(imgOrder, "');"), function (error, results) {
          if (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
          } else {
            return res.redirect('/'); // 홈 화면으로 가는 게 적절한가?
          }
        });
      });
    }
  });
};

exports.postUploadProductImage = postUploadProductImage;