CREATE TABLE account_info (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    user_type VARCHAR(30) NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    account_password VARCHAR(15) NOT NULL,
    email_address VARCHAR(30) NOT NULL
);