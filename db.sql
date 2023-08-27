-- Create user and set password
CREATE USER 'qwert'@'%' IDENTIFIED BY '12345';

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS nodejs;

-- Grant all privileges to the user on the database
GRANT ALL PRIVILEGES ON nodejs.* TO 'qwert'@'%';

-- Apply the changes and reload privileges
FLUSH PRIVILEGES;

-- Use the newly created database
USE nodejs