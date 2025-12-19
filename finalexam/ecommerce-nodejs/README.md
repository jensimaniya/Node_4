# E-commerce Node.js Project (Express, EJS, MongoDB, JWT, Cookies, RBAC)

## Features
- Express + EJS views
- MongoDB with Mongoose (Product, Category, User)
- JWT authentication stored in HttpOnly cookie
- Role-based access control (admin, user)
- User-specific products (owner reference) with populate for category and owner
- Simple CRUD for products and categories
- Navbar partial, protected routes, multi-user support

## Installation
1. Clone or extract the project.
2. Copy `.env.example` to `.env` and set values.
3. Install dependencies:
```
npm install
```
4. Start MongoDB (e.g., locally `mongod`).
5. Run the app:
```
npm run dev
```
6. Open `http://localhost:3000`

## File structure
See the repository files included in the zip.

