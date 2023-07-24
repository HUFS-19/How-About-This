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
  `cateID` INT NOT NULL AUTO_INCREMENT,
  `cateNAME` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`cateID`)
);

CREATE TABLE Product (
  `prodID` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(20) NOT NULL,
  `cateID` INT NOT NULL,
  `prodNAME` VARCHAR(20) NOT NULL,
  `detail` VARCHAR(1000) NOT NULL,
  `link` VARCHAR(200) NOT NULL,
  `Mimg` VARCHAR(100) NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`prodID`),
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`cateID`) REFERENCES Category(`cateID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE ProdIMG (
  `imgID` INT NOT NULL AUTO_INCREMENT,
  `prodID` INT NOT NULL,
  `img` VARCHAR(100) NOT NULL,
  `imgOrder` INT NOT NULL,
  PRIMARY KEY (`imgID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Tag (
  `tagID` INT NOT NULL AUTO_INCREMENT,
  `prodID` INT NOT NULL,
  `tagNAME` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`tagID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE SNSType (
  `snsID` INT NOT NULL AUTO_INCREMENT,
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
  `prodID` INT NOT NULL,
  `cateID` INT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

INSERT INTO Category(cateNAME) values
  ('기타'),
  ('패션·의류'),
  ('뷰티'),
  ('취미생활'),
  ('데코·소품'),
  ('가구'),
  ('생활잡화'),
  ('전자기기'),
  ('식품');

INSERT INTO Product(userID, cateID, prodNAME, detail, link, Mimg) values
  ('testID', '7', '손선풍기', '작은 크기의 손선풍기! 가벼워서 외출할 때 들고가기 좋아요!', 'https://emart.ssg.com/item/itemView.ssg?itemId=1000543697191&siteNo=6001&salestrNo=6005', 'mimgsrc'),
  ('lucky777', '4', '바인더', '소중하게 보관하고 싶은 포토카드를 위한 키치한 바인더!', 'https://www.brandi.co.kr/products/57774253?srsltid=ASuE1wTNaXKR3C6EcwA1VXCb0GpQIWlGmkhFOVcNmBQJb2gG4En0ZpzGOto', 'mimgsrc'),
  ('niceto', '8', '빔프로젝터', '가격 대비 선명하게 나와요! 침대 헤드에 설치하면 분위기 좋아요.', 'https://www.coupang.com/vp/products/7345745988', 'mimgsrc'),
  ('niceto', '1', '테니스라켓', '가성비 좋아요. 초보분들 이거로 시작해보세요.', 'https://www.coupang.com/vp/products/6764434634', 'mimgsrc');
;

INSERT INTO ProdIMG(prodID, img, imgOrder) values
  ('1', 'src', '1'), 
  ('1', 'src', '2'),
  ('1', 'src', '3'),
  ('2', 'src', '1');

INSERT INTO Tag(prodID, tagNAME) values
  ('1', '귀여움'),
  ('1', '가벼움'),
  ('3', '가성비'),
  ('3', '감성'),
  ('4', '초보추천');

INSERT INTO SNSType(SNSType) values
  ('이메일'),
  ('인스타그램'),
  ('페이스북'),
  ('트위터'),
  ('유튜브'),
  ('카카오톡'),
  ('블로그');

INSERT INTO UserSNS values
  ('testID', '1', 'sample@email.com'),
  ('testID', '5', 'https://www.youtube.com/@test');

INSERT INTO UserLike(userID, prodID, cateID) values
  ('testID', '1', '1'),
  ('testID', '2', '6');