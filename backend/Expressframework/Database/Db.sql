create schema admindatabase;

use  admindatabase;

create table admin(
  roleid int primary key AUTO_INCREMENT,
  rolename varchar(100) ,
  phonenumber int(10),
  gender varchar(20),
  pages varchar(20),
  status varchar(20),
  createdby varchar (50),
  updatedate datetime default current_timestamp,
  createdate datetime default current_timestamp,
  updatedby varchar (50)
  
);
select * from admin;
INSERT INTO admin(rolename, pages, createdby, updatedby,status,phonenumber,gender,email,password)
values('yoga','admin','admin','admin','Active',"9866267369","female","Yoga@gmail.com","yoga@123");
Alter table admin 
ADD COLUMN phonenumber VARCHAR(10),
ADD COLUMN gender VARCHAR(20);
alter table admin 
add column email varchar(20);
alter table admin add column password varchar(300);

DESCRIBE admin;

ALTER TABLE admin
MODIFY email VARCHAR(100);


create table roles(
roleid int primary key AUTO_INCREMENT,
rolename varchar (20),
pages varchar (20)
);

select * from roles;
insert into roles(rolename,pages)
values('Admin','Dashboard,uesr,Roles');
ALTER TABLE roles
add column roleid int primary key AUTO_INCREMENT
