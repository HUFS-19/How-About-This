import multerS3 from 'multer-s3';
import multer from 'multer';
import aws from 'aws-sdk';
import path from 'path';

aws.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.IAM_ACCESS,
  secretAccessKey: process.env.IAM_SECRET,
});

const prodImgStorage = multerS3({
  s3: new aws.S3(),
  bucket: 'hufs19-bucket', // 객체를 업로드할 버킷 이름
  acl: 'public-read', // Access control for the file
  key: function (req, file, cb) {
    db.query('select COUNT(*) from prodimg', (error, results) => {
      cb(null, `img/${decodeURIComponent(file.originalname)}`);
    });
  },
});

const userIconStorage = multerS3({
  s3: new aws.S3(),
  bucket: 'hufs19-bucket', // 객체를 업로드할 버킷 이름
  acl: 'public-read', // Access control for the file
  key: function (req, file, cb) {
    cb(
      null,

      `userIcon/${file.originalname}`,
    );
  },
});

export const uploadProdImgS3 = multer(prodImgStorage);
export const uploadUserIconS3 = multer(userIconStorage);
