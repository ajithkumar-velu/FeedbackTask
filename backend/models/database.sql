
-- create products database
create database products;

-- feedback table
create table feedback(
    id serial primary key,
    name varchar(100),
    email varchar(100),
    rating int,
    comment text,
    userType varchar(50) check (userType= 'CUSTOMER' or userType = 'SELLER'),
	date date
)