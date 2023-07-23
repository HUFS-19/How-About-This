/* db 재생성 */

DROP DATABASE IF EXISTS 2023summer;
CREATE DATABASE 2023summer;

USE 2023summer;

DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Product`;
DROP TABLE IF EXISTS `ProdIMG`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `Tag`;
DROP TABLE IF EXISTS `UserSNS`;
DROP TABLE IF EXISTS `SNSType`;
DROP TABLE IF EXISTS `Like`;



CREATE TABLE User (
  `userID` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `userIcon` VARCHAR(100) NOT NULL DEFAULT 'default',
  `introduce` VARCHAR(100) NOT NULL DEFAULT '안녕하세요',
  `nickname` VARCHAR(100) NOT NULL,
  PRIMARY KEY(`userID`)
);

CREATE TABLE Category (
  `cateID` INT NOT NULL,
  `cateNAME` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`cateID`)
);

CREATE TABLE Product (
  `prodID` INT NOT NULL,
  `userID` VARCHAR(20) NOT NULL,
  `cateID` INT NOT NULL,
  `prodNAME` VARCHAR(20) NOT NULL,
  `detail` VARCHAR(1000) NOT NULL,
  `link` VARCHAR(100) NOT NULL,
  `Mimg` VARCHAR(100) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`prodID`),
  FOREIGN KEY (`userID`) REFERENCES User(`userID`),
  FOREIGN KEY (`cateID`) REFERENCES Category(`cateID`)
);

CREATE TABLE ProdIMG (
  `imgID` INT NOT NULL,
  `prodID` INT NOT NULL,
  `img` VARCHAR(100) NOT NULL,
  `imgOrder` INT NOT NULL,
  PRIMARY KEY (`imgID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
);

CREATE TABLE Tag (
  `tagID` INT NOT NULL,
  `prodID` INT NOT NULL,
  `tagNAME` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`tagID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
);

CREATE TABLE SNSType (
  `snsID` INT NOT NULL,
  `snsTYPE` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`snsID`)
);

CREATE TABLE UserSNS (
  `userID` VARCHAR(20) NOT NULL,
  `snsID` INT NOT NULL,
  `snsLINK` VARCHAR(100) NOT NULL,
  FOREIGN KEY (`userID`) REFERENCES User(`userID`),
  FOREIGN KEY (`snsID`) REFERENCES SNSType(`snsID`)
);

CREATE TABLE UserLike (
  `userID` VARCHAR(20) NOT NULL,
  `prodID` INT NOT NULL,
  `cateID` INT NOT NULL,
  `date` DATETIME NOT NULL,
  FOREIGN KEY (`userID`) REFERENCES User(`userID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`),
  FOREIGN KEY (`cateID`) REFERENCES Category(`cateID`)
);


/* 데이터 삽입 */

INSERT INTO User values
  ('testID', 'password', 'IMGsrc', '하이', '테스터'),
  ('secondID', 'password', 'IMGsrc2', '안녕', '유저');

INSERT INTO Category values
  ('0', '카테고리');

INSERT INTO Product values
  ('00', 'testID', '0', '상품명', '무척유용함', 'http..', 'mimgsrc', '1000-01-01 00:00:00');

INSERT INTO ProdIMG values
  ('000', '00', 'src', '1');

INSERT INTO Tag values
  ('0000', '00', '태그');

INSERT INTO SNSType values
  ('00000', '이메일');

INSERT INTO UserSNS values
  ('1', '00000', 'sample@email.com');

INSERT INTO UserLike values
  ('testID', '00', '0', '1000-01-01 00:00:00');