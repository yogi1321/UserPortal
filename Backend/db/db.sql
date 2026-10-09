create schema Employee_management;
use Employee_management;
CREATE TABLE roles (
    roleID INT PRIMARY KEY AUTO_INCREMENT,
    roleName VARCHAR(100),
    pages VARCHAR(255),
    status VARCHAR(50),
    createdBy VARCHAR(100),
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedBy VARCHAR(100),
    updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO roles(roleName, pages, status, createdBy)
VALUES('Admin', 'Dashboard1,Dashboard2,Users,Role', 'Active', 'System');
Select * from roles;

CREATE TABLE users (
    userID INT PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    address VARCHAR(255),
    phoneNumber VARCHAR(20),
    gender VARCHAR(20),
    status VARCHAR(50),
    roleID INT,
    createdBy VARCHAR(100),
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedBy VARCHAR(100),
    updatedDate DATETIME,
	FOREIGN KEY (roleID) REFERENCES roles(roleID)
);
select * from users;

ALTER TABLE users ADD COLUMN email VARCHAR(100);
ALTER TABLE users MODIFY updatedDate DATETIME DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE users DROP COLUMN roleID;
ALTER TABLE users DROP FOREIGN KEY users_ibfk_1;
