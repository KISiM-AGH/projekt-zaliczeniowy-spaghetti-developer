DROP DATABASE ikup;
CREATE DATABASE ikup;
USE ikup;

CREATE TABLE Users(
  guid VARCHAR(100) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  CONSTRAINT PK_Users PRIMARY KEY (guid,email)
);

CREATE TABLE Passwords(
  userGuid VARCHAR(100) NOT NULL,
  hash VARCHAR(255) NOT NULL,
  CONSTRAINT PK_Passwords PRIMARY KEY (userGuid),
  FOREIGN KEY (userGuid) REFERENCES Users(guid)
);

CREATE TABLE Priviliges(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  CONSTRAINT PK_Priviliges PRIMARY KEY (id)
);

INSERT INTO Priviliges(id,name) VALUES (1,'Admin');

CREATE TABLE UserPriviliges(
  userGuid VARCHAR(100) NOT NULL,
  priviligeId INT NOT NULL,
  FOREIGN KEY (userGuid) REFERENCES Users(guid),
  FOREIGN KEY (priviligeId) REFERENCES Priviliges(id)
);

CREATE TABLE Advertisements(
  guid VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  price FLOAT NOT NULL,
  contact VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL,
  CONSTRAINT PK_Advertisement PRIMARY KEY (guid)
);

CREATE TABLE Images(
  guid VARCHAR(100) NOT NULL,
  advertisementGuid VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  orderNumber INT NOT NULL,
  CONSTRAINT PK_Image PRIMARY KEY (guid),
  FOREIGN KEY (advertisementGuid) REFERENCES Advertisements(guid)
);
