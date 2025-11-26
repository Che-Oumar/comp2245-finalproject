-- schema

-- Create Dolphincrm Database

DROP DATABASE IF EXISTS dolphin_crm;
CREATE DATABASE IF NOT EXISTS dolphin_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE dolphin_crm;

-- Table structure for Users
CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','user') NOT NULL DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Sample admin
-- Replace the hash below with password_hash('password123', PASSWORD_DEFAULT) in PHP
INSERT INTO Users (firstname, lastname, email, password, role)
VALUES ('Admin', 'User', 'admin@project2.com', 
        '$2y$10$uHcD7nZ1x4B0oaqe7i0r1uS5jN0rA6JH2h1C5yD6H7vJKz8QWmE5m', 'admin');

-- Table for Contacts
CREATE TABLE IF NOT EXISTS Contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(20),
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    company VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    assigned_to INT NULL,
    created_by INT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES Users(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Table for Notes
CREATE TABLE IF NOT EXISTS Notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contact_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_by INT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contact_id) REFERENCES Contacts(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE SET NULL
) ENGINE=InnoDB;
