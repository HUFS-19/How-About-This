/* db 재생성 */

DROP DATABASE IF EXISTS 2023summer;
CREATE DATABASE 2023summer;

USE 2023summer;

DROP TABLE IF EXISTS `product_img`;
DROP TABLE IF EXISTS `tag`;
DROP TABLE IF EXISTS `user_like`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `message`;
DROP TABLE IF EXISTS `chat_room`;
DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `user_sns`;
DROP TABLE IF EXISTS `sns_type`;
DROP TABLE IF EXISTS `user_info`;
DROP TABLE IF EXISTS `user`;



CREATE TABLE user (
  `user_id` VARCHAR(20) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `salt` VARCHAR(200) NOT NULL,
  PRIMARY KEY(`user_id`)
);

CREATE TABLE user_info (
  `user_id` VARCHAR(20) NOT NULL,
  `user_icon` VARCHAR(100) NOT NULL ,
  `introduce` VARCHAR(100) NOT NULL,
  `nickname` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE category (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`category_id`)
);

CREATE TABLE product (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(20) NOT NULL,
  `category_id` INT NOT NULL,
  `product_name` NVARCHAR(20) NOT NULL,
  `detail` NVARCHAR(1000) NOT NULL,
  `link` NVARCHAR(200) NOT NULL,
  `main_img` VARCHAR(100) NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES category(`category_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE product_img (
  `img_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `img` NVARCHAR(100) NOT NULL,
  `img_order` INT NOT NULL,
  PRIMARY KEY (`img_id`),
  FOREIGN KEY (`product_id`) REFERENCES product(`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE tag (
  `tag_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `tag_name` NVARCHAR(10) NOT NULL,
  PRIMARY KEY (`tag_id`),
  FOREIGN KEY (`product_id`) REFERENCES product(`product_id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE sns_type (
  `sns_id` INT NOT NULL AUTO_INCREMENT,
  `sns_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`sns_id`)
);

CREATE TABLE user_sns (
  `user_id` VARCHAR(20) NOT NULL,
  `sns_id` INT NOT NULL,
  `sns_link` VARCHAR(100) NOT NULL,
  UNIQUE KEY uniqueSns (`user_id`, `sns_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`sns_id`) REFERENCES sns_type(`sns_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE user_like (
  `user_id` VARCHAR(20) NOT NULL,
  `product_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES product(`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES category(`category_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

CREATE TABLE comment (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` VARCHAR(20) NOT NULL,
  `product_id` INT NOT NULL,
  `content` NVARCHAR(500) NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES product(`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE chat_room (
	`chat_room_id` INT NOT NULL AUTO_INCREMENT,
	`product_id` INT NOT NULL,
	`user_id` VARCHAR(20) NOT NULL,
	`category_id` INT NOT NULL,
	`inquirer_id` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`chat_room_id`),
  FOREIGN KEY (`product_id`) REFERENCES product(`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES category(`category_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (`inquirer_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE message (
	`msg_id`	INT NOT NULL AUTO_INCREMENT,
	`chat_room_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`user_id` VARCHAR(20) NOT NULL,
	`category_id` INT NOT NULL,
	`inquirer_id` VARCHAR(20) NOT NULL,
  `sender_id` VARCHAR(20) NOT NULL,
	`content` VARCHAR(1000)	NOT NULL,
	`time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`msg_id`),
  FOREIGN KEY (`chat_room_id`) REFERENCES chat_room(`chat_room_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES product(`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES category(`category_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  FOREIGN KEY (`inquirer_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`sender_id`) REFERENCES user(`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE OR REPLACE VIEW sns_info AS 
  SELECT user_id, sns_link, sns_name
    FROM (sns_type NATURAL JOIN user_sns);

CREATE OR REPLACE VIEW product_like_count AS
  SELECT product_id, count(*) AS like_count FROM user_like
  GROUP BY product_id ORDER BY like_count DESC;

CREATE OR REPLACE VIEW comment_list AS
  SELECT c.comment_id, c.user_id, c.product_id, c.content, c.date, u.user_icon, u.nickname
  FROM comment c, user_info u WHERE u.user_id = c.user_id
  ORDER BY c.date DESC;

/*user_info 세팅 트리거*/
DROP TRIGGER IF EXISTS `set_user_info`;

CREATE TRIGGER set_user_info
  AFTER INSERT 
  ON user FOR EACH ROW
    INSERT INTO user_info(user_id, nickname, introduce, user_icon)
    VALUES(NEW.user_id, NEW.user_id, CONCAT('안녕하세요, ', user_id, '입니다!'), 'http://localhost:5000/src/profile/default.jpg')
    ;




/* 데이터 삽입 */

INSERT INTO user values
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

INSERT INTO category(category_name) values
  ('기타'),
  ('패션·의류'),
  ('뷰티'),
  ('취미생활'),
  ('데코·소품'),
  ('가구'),
  ('생활잡화'),
  ('전자기기'),
  ('식품');

INSERT INTO product(user_id, category_id, product_name, detail, link, main_img) values
  ('testID', '7', '손선풍기', '작은 크기의 손선풍기! 가벼워서 외출할 때 들고가기 좋아요!', 'https://emart.ssg.com/item/itemView.ssg?itemId=1000543697191&siteNo=6001&salestrNo=6005', 'src\mimg'),
  ('lucky777', '4', '바인더', '소중하게 보관하고 싶은 포토카드를 위한 키치한 바인더!', 'https://www.brandi.co.kr/products/57774253?srsltid=ASuE1wTNaXKR3C6EcwA1VXCb0GpQIWlGmkhFOVcNmBQJb2gG4En0ZpzGOto', 'src\mimg'),
  ('niceto', '8', '빔프로젝터', '가격 대비 선명하게 나와요! 침대 헤드에 설치하면 분위기 좋아요.', 'https://www.coupang.com/vp/products/7345745988', 'src\mimg'),
  ('niceto', '1', '테니스라켓', '가성비 좋아요. 초보분들 이거로 시작해보세요.', 'https://www.coupang.com/vp/products/6764434634', 'src\mimg'),
  ('user4444', '6', '화장대', '원룸에 딱 좋은 사이즈!\n 실사용 1년차인데 만족해요.', 'https://www.coupang.com/vp/products/63242351', 'src\mimg'),
  ('user4444', '4', '다꾸 랜덤박스', '랜덤박스 여기저기서 사봤는데\n활용도 높은 스티커가 진짜 많아요.\n입문자 특히 추천!', 'https://www.coupang.com/vp/products/7295210801', 'src\mimg'),
  ('user4444', '3', '아이라이너', '저번에 구매했다가 너무 좋아서\n3번쩨 재구매한 제품이에요.\n믿고 쓰는 아이템 추천합니다.', 'https://www.coupang.com/vp/products/252982015', 'src\mimg'),
  ('user4444', '5', '패브릭 포스터', '휑한 벽에 붙이면 확실히 달라요.', 'https://www.coupang.com/vp/products/4696336018', 'src\mimg');

INSERT INTO product_img(product_id, img, img_order) values
  ('1', 'http://localhost:5000/src/img/1.jpg', '1'), 
  ('1', 'http://localhost:5000/src/img/2.jpg', '2'),
  ('1', 'http://localhost:5000/src/img/3.jpg', '3'),
  ('2', 'http://localhost:5000/src/img/4.jpg', '1'),
  ('3', 'http://localhost:5000/src/img/5.jpg', '1'),
  ('3', 'http://localhost:5000/src/img/6.jpg', '2'),
  ('4', 'http://localhost:5000/src/img/7.jpg', '1'),
  ('4', 'http://localhost:5000/src/img/8.jpg', '2'),
  ('5', 'http://localhost:5000/src/img/9.jpg', '1'),
  ('5', 'http://localhost:5000/src/img/10.jpg', '2'),
  ('6', 'http://localhost:5000/src/img/11.jpg', '1'),
  ('6', 'http://localhost:5000/src/img/12.jpg', '2'),
  ('7', 'http://localhost:5000/src/img/13.jpg', '1'),
  ('7', 'http://localhost:5000/src/img/14.jpg', '2'),
  ('8', 'http://localhost:5000/src/img/15.jpg', '1'),
  ('8', 'http://localhost:5000/src/img/16.jpg', '2');



INSERT INTO tag(product_id, tag_name) values
  ('1', '귀여움'),
  ('1', '가벼움'),
  ('3', '가성비'),
  ('3', '감성'),
  ('4', '초보추천');

INSERT INTO sns_type(sns_name) values
  ('이메일'),
  ('인스타그램'),
  ('페이스북'),
  ('트위터'),
  ('유튜브'),
  ('카카오톡'),
  ('블로그');

INSERT INTO user_sns values
  ('testID', '1', 'sample@email.com'),
  ('testID', '5', 'https://www.youtube.com/@test'),
  ('lucky777', '7', 'https://www.tistory.com/'),
  ('lucky777', '1', 'lucky777@email.com'),
  ('user4444', '2', 'https://www.instagram.com/user4444_test'),
  ('user4444', '3', 'https://www.facebook.com/people/Yuna-Kim/100044604661723/');
  


INSERT INTO user_like(user_id, product_id, category_id) values
  ('testID', '1', '7'),
  ('testID', '2', '4'),
  ('user4444', '1', '7'),
  ('user4444', '2', '4'),
  ('user4444', '3', '8'),
  ('lucky777', '2', '4');

INSERT INTO comment(user_id, product_id, content) values
  ('testID', '1', '이거짱인듯.. 잘쓰고있어요'),
  ('user4444', '1', '댓글뭐쓰지 아무튼 추천드립니다'),
  ('lucky777', '1', '더쓸말도없다.... 위에 사람들 다 거짓말임 전 별로였어요');
