/* db 재생성 */

DROP DATABASE IF EXISTS 2023summer;
CREATE DATABASE 2023summer;

USE 2023summer;

DROP TABLE IF EXISTS `ProdIMG`;
DROP TABLE IF EXISTS `Tag`;
DROP TABLE IF EXISTS `UserLike`;
DROP TABLE IF EXISTS `Product`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `UserSNS`;
DROP TABLE IF EXISTS `SNSType`;
DROP TABLE IF EXISTS `UserInfo`;
DROP TABLE IF EXISTS `User`;



CREATE TABLE User (
  `userID` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  PRIMARY KEY(`userID`)
);


CREATE TABLE UserInfo (
  `userID` VARCHAR(20) NOT NULL,
  `userIcon` VARCHAR(100) NOT NULL ,
  `introduce` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userID`),
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Category (
  `cateID` INT NOT NULL,
  `cateNAME` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`cateID`)
);

CREATE TABLE Product (
  `prodID` VARCHAR(20) NOT NULL,
  `userID` VARCHAR(20) NOT NULL,
  `cateID` INT NOT NULL,
  `prodNAME` VARCHAR(20) NOT NULL,
  `detail` VARCHAR(1000) NOT NULL,
  `link` VARCHAR(100) NOT NULL,
  `Mimg` VARCHAR(100) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`prodID`),
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`cateID`) REFERENCES Category(`cateID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE ProdIMG (
  `imgID` INT NOT NULL,
  `prodID` VARCHAR(20) NOT NULL,
  `img` VARCHAR(100) NOT NULL,
  `imgOrder` INT NOT NULL,
  PRIMARY KEY (`imgID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Tag (
  `prodID` VARCHAR(20) NOT NULL,
  `tagID` INT NOT NULL,
  `tagNAME` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`tagID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
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
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`snsID`) REFERENCES SNSType(`snsID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE UserLike (
  `userID` VARCHAR(20) NOT NULL,
  `prodID` VARCHAR(20) NOT NULL,
  `cateID` INT NOT NULL,
  `date` DATETIME NOT NULL,
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`cateID`) REFERENCES Category(`cateID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);


/*userInfo 세팅 트리거*/
DROP TRIGGER IF EXISTS `setUserInfo`;

CREATE TRIGGER setUserInfo
  AFTER INSERT 
  ON User FOR EACH ROW
    INSERT INTO UserInfo(userID, nickname, introduce, userIcon)
    VALUES(NEW.userID, NEW.userID, CONCAT('안녕하세요, ', userID, '입니다!'), 'src\default\profile.png')
    ;


/* 데이터 삽입 */

INSERT INTO User values
  ('testID', 'password1!'),
  ('lucky777', '9luck9^'),
  ('niceto', 'meetyou2#');

INSERT INTO Category values
  ('0', '기타'),
  ('1', '패션·의류'),
  ('2', '뷰티'),
  ('3', '취미생활'),
  ('4', '데코·소품'),
  ('5', '가구'),
  ('6', '생활잡화'),
  ('7', '전자기기'),
  ('8', '식품');

INSERT INTO Product values
  ('220518-1', 'testID', '6', '손선풍기', '작은 크기의 손선풍기! 가벼워서 외출할 때 들고가기 좋아요!', 'https://emart.ssg.com/item/itemView.ssg?itemId=1000543697191&siteNo=6001&salestrNo=6005', 'mimgsrc', '2022-05-18 03:45:55'),
  ('230630-1', 'lucky777', '3', '바인더', '소중하게 보관하고 싶은 포토카드를 위한 키치한 바인더!', 'https://www.brandi.co.kr/products/57774253?srsltid=ASuE1wTNaXKR3C6EcwA1VXCb0GpQIWlGmkhFOVcNmBQJb2gG4En0ZpzGOto', 'mimgsrc', '2023-06-30 20:11:26');

INSERT INTO ProdIMG values
  ('1', '220518-1', 'src', '1');

INSERT INTO Tag values
  ('220518-1', '1', '귀여움'),
  ('220518-1', '2', '가벼움');

INSERT INTO SNSType values
  ('email', '이메일'),
  ('instagram', '인스타그램'),
  ('facebook', '페이스북'),
  ('twitter', '트위터'),
  ('youtube', '유튜브'),
  ('kakaotalk', '카카오톡'),
  ('blog', '블로그');

INSERT INTO UserSNS values
  ('testID', 'email', 'sample@email.com'),
  ('testID', 'youtube', 'https://www.youtube.com/@test');

INSERT INTO UserLike values
  ('testID', '230630-1', '6', '2023-07-01 22:10:01');



/*

변경사항

더미데이터 조금... 추가해봄

prodID 타입: INT -> VARCHAR(20)
ㄴ방식: 날짜+번호 (EX. 230724-1)

Tag테이블 순서 변경: tagID, prodID -> prodID, tagID
ㄴ가독성을 위해...

snsID 타입: INT -> VARCHAR(20)
ㄴ방식: 영문으로 (EX. email)
ㄴ숫자 사용보다 직관적... 이라 편할거가틈

*/