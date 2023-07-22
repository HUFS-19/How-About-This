CREATE TABLE  `User` (
  `userID` INT NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `userIcon` VARCHAR(100) NOT NULL DEFAULT 'default',
  `introduce` VARCHAR(100) NOT NULL DEFAULT '안녕하세요',
  `nickname` VARCHAR(100) NOT NULL
);

CREATE TABLE  `Product` (
  `prodID` INT NOT NULL,
  `userID` INT NOT NULL,
  `cateID` INT NOT NULL,
  `prodNAME` VARCHAR(20) NOT NULL,
  `detail` VARCHAR(1000) NOT NULL,
  `link` VARCHAR(100) NOT NULL,
  `Mimg` VARCHAR(100) NOT NULL,
  `date` DATETIME NOT NULL,
);

CREATE TABLE  `ProdIMG` (
  `imgID` INT NOT NULL,
  `prodID` INT NOT NULL,
  `img` VARCHAR(100) NOT NULL,
  `imgOrder` INT NOT NULL 
);

CREATE TABLE  `Category` (
  `cateID` INT NOT NULL,
  `cateNAME` VARCHAR(10) NOT NULL
);

CREATE TABLE  `Tag` (
  `tagID` INT NOT NULL,
  `prodID` INT NOT NULL,
  `tagNAME` VARCHAR(10) NOT NULL
);

CREATE TABLE  `UserSNS` (
  `userID` INT NOT NULL,
  `snsID` INT NOT NULL,
  `snsLINK` VARCHAR(100) NOT NULL
);

CREATE TABLE  `SNSType` (
  `snsID` INT NOT NULL,
  `snsTYPE` VARCHAR(10) NOT NULL
);

CREATE TABLE  `Like` (
  `userID` INT NOT NULL,
  `prodID` INT NOT NULL,
  `cateID` INT NOT NULL,
  `date` DATETIME NOT NULL
);

ALTER TABLE `User` ADD CONSTRAINT  `PK_USER` PRIMARY KEY (
  `userID`
);

ALTER TABLE `Product` ADD CONSTRAINT `PK_PRODUCT` PRIMARY KEY (
  `prodID`,
  `userID`,
  `cateID`
);

ALTER TABLE `ProdIMG` ADD CONSTRAINT `PK_PRODIMG` PRIMARY KEY (
  `imgID`,
  `prodID`
);

ALTER TABLE `Category` ADD CONSTRAINT  `PK_CATEGORY` PRIMARY KEY (
  `cateID`
);

ALTER TABLE `Tag` ADD CONSTRAINT `PK_TAG` PRIMARY KEY (
  `tagID`,
  `prodID`
);

ALTER TABLE `UserSNS` ADD CONSTRAINT `PK_USERSNS` PRIMARY KEY (
  `userID`,
  `snsID`
);

ALTER TABLE `SNSType` ADD CONSTRAINT `PK_SNSTYPE` PRIMARY KEY (
  `snsID`
);

ALTER TABLE `Like` ADD CONSTRAINT  `PK_LIKE` PRIMARY KEY (
  `userID`,
  `prodID`,
  `cateID`
);

ALTER TABLE `Product` ADD CONSTRAINT `FK_User_TO_Product_1` FOREIGN KEY (
  `userID`
)
REFERENCES  `User` (
  `userID`
);

ALTER TABLE `Product` ADD CONSTRAINT `FK_Category_TO_Product_1` FOREIGN KEY (
  `cateID`
)
REFERENCES  `Category` (
  `cateID`
);

ALTER TABLE `ProdIMG` ADD CONSTRAINT `FK_Product_TO_ProdIMG_1` FOREIGN KEY (
  `prodID`
)
REFERENCES  `Product` (
  `prodID`
);

ALTER TABLE `Tag` ADD CONSTRAINT `FK_Product_TO_Tag_1` FOREIGN KEY (
  `prodID`
)
REFERENCES  `Product` (
  `prodID`
);

ALTER TABLE `UserSNS` ADD CONSTRAINT `FK_User_TO_UserSNS_1` FOREIGN KEY (
  `userID`
)
REFERENCES  `User` (
  `userID`
);

ALTER TABLE `UserSNS` ADD CONSTRAINT `FK_SNSType_TO_UserSNS_1` FOREIGN KEY (
  `snsID`
)
REFERENCES  `SNSType` (
  `snsID`
);

ALTER TABLE `Like` ADD CONSTRAINT  `FK_User_TO_Like_1` FOREIGN KEY (
  `userID`
)
REFERENCES  `User` (
  `userID`
);

ALTER TABLE `Like` ADD CONSTRAINT  `FK_Product_TO_Like_1` FOREIGN KEY (
  `prodID`
)
REFERENCES  `Product` (
  `prodID`
);

ALTER TABLE `Like` ADD CONSTRAINT  `FK_Product_TO_Like_2` FOREIGN KEY (
  `cateID`
)
REFERENCES  `Product` (
  `cateID`
);

