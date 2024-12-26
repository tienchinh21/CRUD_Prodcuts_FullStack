# Products Management System

This is a full-stack application for managing products, built with React for the frontend and Node.js for the backend

## Features

- View, create, edit, and delete products
- Pagination support
- User library Ant Design

---

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js**: Version v18.17.0
- **npm** or **yarn**: Package manager
- **MySQL**: Database system

---

## Getting Started

Follow the steps below to set up and run the project:

### 1. Clone the Repository

git clone https://github.com/tienchinh21/CRUD_Products_FullStack.git
cd CRUD_Products_FullStack
code .

### 2. Setup BackEnd

- cd BackEnd
- npm i
- Create a .env file in the backend folder and configure the following

#### .env

PORT=8888
DB_HOST=localhost
DB_PORT=3309
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=products_db

- then npm run dev

### 3. Setup FontEnd

- cd ../FrontEnd
- npm i
  npm run dev
