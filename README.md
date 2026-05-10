# Social Media App — RESTful APIs

A backend REST API for a social media application built with Node.js, Express, and MongoDB. Users can sign up, log in, create posts with image uploads, and manage their own content.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Multer
- **Validation:** Express Validator
- **Password Hashing:** Bcrypt
- **Environment Variables:** Dotenv

---

## API Endpoints

### Auth Routes 

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/login` | Login user, get JWT token | No |

### Post Routes `

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/posts` | Create new post (with image) | Yes |
| GET | `/posts` | Get all posts | Yes |
| PUT | `/api/updatePost/:postId` | Update your own post | Yes |
| DELETE | `/post/postId` | Delete your own post | Yes |

---

## Testing with Postman

This project has no frontend — all APIs are tested via **Postman**.

## Features

- User registration and login with JWT authentication
- Password hashing with Bcrypt
- Protected routes using JWT middleware
- Image upload with Multer
- Post CRUD — users can only edit/delete their own posts
- Request validation with Express Validator
- Clean MVC folder structure
