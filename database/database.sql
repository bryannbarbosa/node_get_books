
create database maciv_flipbook default charset 'utf8' default collate 'utf8_general_ci';

use maciv_flipbook;

create table books(
id int not null auto_increment primary key,
book_name varchar(100) not null unique,
book_pdf_url text not null
);

select * from books;

