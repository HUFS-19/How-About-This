/* db 재생성 */

DROP DATABASE IF EXISTS 2023summer;
CREATE DATABASE 2023summer;

USE 2023summer;

DROP TABLE IF EXISTS `ProdIMG`;
DROP TABLE IF EXISTS `Tag`;
DROP TABLE IF EXISTS `UserLike`;
DROP TABLE IF EXISTS `Comment`;
DROP TABLE IF EXISTS `Message`;
DROP TABLE IF EXISTS `ChatRoom`;
DROP TABLE IF EXISTS `Product`;
DROP TABLE IF EXISTS `Category`;
DROP TABLE IF EXISTS `UserSNS`;
DROP TABLE IF EXISTS `SNSType`;
DROP TABLE IF EXISTS `UserInfo`;
DROP TABLE IF EXISTS `User`;



CREATE TABLE User (
  `userID` VARCHAR(20) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `salt` VARCHAR(200) NOT NULL,
  PRIMARY KEY(`userID`)
);

CREATE TABLE UserInfo (
  `userID` VARCHAR(20) NOT NULL,
  `userIcon` VARCHAR(100) NOT NULL ,
  `introduce` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(20) NOT NULL,
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
  `prodNAME` NVARCHAR(20) NOT NULL,
  `detail` NVARCHAR(1000) NOT NULL,
  `link` NVARCHAR(200) NOT NULL,
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
  `img` NVARCHAR(100) NOT NULL,
  `imgOrder` INT NOT NULL,
  PRIMARY KEY (`imgID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Tag (
  `tagID` INT NOT NULL AUTO_INCREMENT,
  `prodID` INT NOT NULL,
  `tagNAME` NVARCHAR(10) NOT NULL,
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
  UNIQUE KEY uniqueSns (`userID`, `snsID`),
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

CREATE TABLE Comment (
  `commentID` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(20) NOT NULL,
  `nickname` VARCHAR(20) NOT NULL,
  `prodID` INT NOT NULL,
  `content` NVARCHAR(500) NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`nickname`) REFERENCES UserInfo(`nickname`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
);

CREATE TABLE ChatRoom (
	`chatroomID` INT NOT NULL AUTO_INCREMENT,
	`prodID` INT NOT NULL,
	`userID` VARCHAR(20) NOT NULL,
	`cateID` INT NOT NULL,
	`inquirerID` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`chatroomID`),
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`cateID`) REFERENCES Category(`cateID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (`inquirerID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE Message (
	`msgID`	INT NOT NULL AUTO_INCREMENT,
	`chatroomID` INT NOT NULL,
	`prodID` INT NOT NULL,
	`userID` VARCHAR(20) NOT NULL,
	`cateID` INT NOT NULL,
	`inquirerID` VARCHAR(20) NOT NULL,
  `senderID` VARCHAR(20) NOT NULL,
	`content` VARCHAR(1000)	NOT NULL,
	`time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`msgID`),
  FOREIGN KEY (`chatroomID`) REFERENCES ChatRoom(`chatroomID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`prodID`) REFERENCES Product(`prodID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`userID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`cateID`) REFERENCES Category(`cateID`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (`inquirerID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`senderID`) REFERENCES User(`userID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE OR REPLACE VIEW snsInfo AS 
  SELECT userID, snsLINK, snsTYPE
    FROM (SNSType NATURAL JOIN UserSNS);

CREATE OR REPLACE VIEW LikeList AS
  SELECT prodID, count(*) as likeCount from userLike
  GROUP BY prodID ORDER BY likeCount DESC;

/*userInfo 세팅 트리거*/
DROP TRIGGER IF EXISTS `setUserInfo`;

CREATE TRIGGER setUserInfo
  AFTER INSERT 
  ON User FOR EACH ROW
    INSERT INTO UserInfo(userID, nickname, introduce, userIcon)
    VALUES(NEW.userID, NEW.userID, CONCAT('안녕하세요, ', userID, '입니다!'), 'src/profile/default.jpg')
    ;


/* 데이터 삽입 */

INSERT INTO User values
  ('testID', 'sOsmrxiui+vLJhOnUrz7rBB8SPS+si65yNfAewNCB9juUaYZxq+bbQICkLUM9c9aloizqa1l5VebIMlWae61cQ==', '5wKYkTVqX2TFvFVpW83OoaYpGN6o4P8b39G2X6g/n6O7mKuZ3jyKfm6PoKNqBhUwhVKt9SPLDlhNtRpjCmKkEw=='),
  ('lucky777', '0tG8duagQKfskh00cyHc5FxU0Z6lw7thxLLSMYKYZY54K7h3Yuje92vKLYYTwzCKe9R6jhWHcshdjhPbulHrUQ==', 'XO+/WewHua65PL8UfTOsRQwfAgjWwaBgivT4xpxkqqpn+LE72H1AkhB39By+KxJM+MG0EGOisli2XyCX0it5Mg=='),
  ('niceto', 'wWXAl5c9LWy55UJ6GEtS7LyO07M9YAVtXkEtA4FYPSukPoeken0KW5DoJvwD21U78Dh7iN3CPQcH43iDaIXzbA==', 'V4DGyXl4TjJg7hPb2nlKaZnLckjD/ltLlGTeTBEw5sslHnLjfAcI1U37tK39SvN4tim/4VWcSgleKqw4FhwH8A=='),
  ('user4444', 'zopE0cpIA7zTwGdohTaNXgVVXpgO1xdSTxhfAoLLGEX8xvOq3jJaTxV5RY6oA3ur443TWflGnin3AdX+o39+MQ==', 'BYMtm5KotGMHwedgv2TEGd5ZSBNNAy4fniDOT/dlL94kyXNRQ5ywczEpegsGkjTWvVbaLa/GVQH3vxFBQxjScg==');

/* 비밀번호 참고용   
  ('testID', 'password1!'),
  ('lucky777', '9luck9^'),
  ('niceto', 'meetyou2#'),
  ('user4444', 'u@ser!4four44'); 
*/

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
  ('testID', '7', '손선풍기', '작은 크기의 손선풍기! 가벼워서 외출할 때 들고가기 좋아요!', 'https://emart.ssg.com/item/itemView.ssg?itemId=1000543697191&siteNo=6001&salestrNo=6005', 'src\mimg'),
  ('lucky777', '4', '바인더', '소중하게 보관하고 싶은 포토카드를 위한 키치한 바인더!', 'https://www.brandi.co.kr/products/57774253?srsltid=ASuE1wTNaXKR3C6EcwA1VXCb0GpQIWlGmkhFOVcNmBQJb2gG4En0ZpzGOto', 'src\mimg'),
  ('niceto', '8', '빔프로젝터', '가격 대비 선명하게 나와요! 침대 헤드에 설치하면 분위기 좋아요.', 'https://www.coupang.com/vp/products/7345745988', 'src\mimg'),
  ('niceto', '1', '테니스라켓', '가성비 좋아요. 초보분들 이거로 시작해보세요.', 'https://www.coupang.com/vp/products/6764434634', 'src\mimg'),
  ('user4444', '6', '화장대', '원룸에 딱 좋은 사이즈!\n 실사용 1년차인데 만족해요.', 'https://www.coupang.com/vp/products/63242351', 'src\mimg'),
  ('user4444', '4', '다꾸 랜덤박스', '랜덤박스 여기저기서 사봤는데\n활용도 높은 스티커가 진짜 많아요.\n입문자 특히 추천!', 'https://www.coupang.com/vp/products/7295210801', 'src\mimg'),
  ('user4444', '3', '아이라이너', '저번에 구매했다가 너무 좋아서\n3번쩨 재구매한 제품이에요.\n믿고 쓰는 아이템 추천합니다.', 'https://www.coupang.com/vp/products/252982015', 'src\mimg'),
  ('user4444', '5', '패브릭 포스터', '휑한 벽에 붙이면 확실히 달라요.', 'https://www.coupang.com/vp/products/4696336018', 'src\mimg');

INSERT INTO ProdIMG(prodID, img, imgOrder) values
  ('1', 'src/img/1.jpg', '1'), 
  ('1', 'src/img/2.jpg', '2'),
  ('1', 'src/img/3.jpg', '3'),
  ('2', 'src/img/4.jpg', '1'),
  ('3', 'src/img/5.jpg', '1'),
  ('3', 'src/img/6.jpg', '2'),
  ('4', 'src/img/7.jpg', '1'),
  ('4', 'src/img/8.jpg', '2'),
  ('5', 'src/img/9.jpg', '1'),
  ('5', 'src/img/10.jpg', '2'),
  ('6', 'src/img/11.jpg', '1'),
  ('6', 'src/img/12.jpg', '2'),
  ('7', 'src/img/13.jpg', '1'),
  ('7', 'src/img/14.jpg', '2'),
  ('8', 'src/img/15.jpg', '1'),
  ('8', 'src/img/16.jpg', '2');



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
  ('testID', '5', 'https://www.youtube.com/@test'),
  ('lucky777', '7', 'https://www.tistory.com/'),
  ('lucky777', '1', 'lucky777@email.com'),
  ('user4444', '2', 'https://www.instagram.com/user4444_test'),
  ('user4444', '3', 'https://www.facebook.com/people/Yuna-Kim/100044604661723/');
  


INSERT INTO UserLike(userID, prodID, cateID) values
  ('testID', '1', '7'),
  ('testID', '2', '4'),
  ('user4444', '1', '7'),
  ('user4444', '2', '4'),
  ('user4444', '3', '8'),
  ('lucky777', '2', '4');
