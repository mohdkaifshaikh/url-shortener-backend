# 🔗 URL Shortener API

A production-style URL Shortener backend built with **Node.js**, **Express**, and **MongoDB**.
It provides URL shortening, redirection, click tracking, and analytics using a clean **Controller → Service → Repository** architecture.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#️-environment-variables)
- [Run Locally](#-run-locally)
- [Architecture](#-architecture)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🚀 Features

- Shorten long URLs into unique short codes
- Redirect short URLs to their original URL
- Track number of clicks per URL
- Prevent duplicate URL creation
- Get analytics for each short URL
- Custom alias support for short URLs
- Expiry time for links
- Modular architecture (Controller → Service → Repository)
- Centralized error-handling middleware
- Input validation and safe URL handling

---

## 🛠 Tech Stack

| Category        | Technology      |
|------------------|------------------|
| Runtime          | Node.js          |
| Framework        | Express.js       |
| Database         | MongoDB + Mongoose |
| ID Generation    | Nanoid           |
| Config           | dotenv           |

---

## 📁 Folder Structure

```
url-shortener/
│
├── modules/
│   └── url/
│       ├── url.controller.js
│       ├── url.service.js
│       ├── url.model.js
│       ├── url.repository.js
│       ├── url.routes.js
│       ├── url.validator.js
│
├── middlewares/
│       ├── error.middleware.js
│       ├── validate.middleware.js
│       ├── asyncHandler.js
│
├── utils/
│       ├── safeURL.js
│
├── config/
│       ├── db.js
│
├── app.js
├── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 📡 API Endpoints

The app exposes two route groups: primary routes used for real redirection, and a parallel `/api/url` group intended for testing/integration (e.g. via Postman) without triggering an actual redirect.

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/shorten` | Create a short URL |
| `GET` | `/:code` | Redirect to the original URL |
| `DELETE` | `/delete/:code` | Delete a short URL |
| `POST` | `/api/url/shorten` | Create a short URL *(for API testing)* |
| `GET` | `/api/url/:code` | Get URL info without redirecting *(for API testing)* |

---

### 1. Create Short URL

**POST** `/shorten` &nbsp;·&nbsp; **POST** `/api/url/shorten`

Validated by the `validateShortUrl` middleware before a short code is generated.

**Request Body:**
```json
{
  "originalUrl": "https://example.com",
  "customAlias":"custom"
}
```

**Response:**
```json
{
  "success": true,
  "shortUrl": "http://localhost:3001/custom"
}
```

---

### 2. Redirect to Original URL

**GET** `/:code`

Looks up the short code, increments its click count, and redirects the browser to the original URL.

---

### 3. Get URL Info

**GET** `/api/url/:code`

Returns the stored details for a short code without redirecting — useful for testing or building a stats UI.

**Response:**
```json
{
  "originalUrl": "https://example.com",
  "clicks": 10,
  "createdAt": "2026-06-18"
}
```

---

### 4. Delete Short URL

**DELETE** `/delete/:code`

Removes the short URL mapping permanently.

**Response:**
```json
{
  "success": true,
  "message": "URL deleted successfully"
}
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
```

---

## ▶️ Run Locally

```bash
git clone https://github.com/mohdkaifshaikh/url-shortener.git
cd url-shortener
npm install
npm run dev
```

The server will start at `http://localhost:3001` (or the port you configured).

---

## 🧠 Architecture

```
Client → Routes → Controller → Service → Repository → Database
```

This layered approach keeps request handling, business logic, and data access cleanly separated, making the codebase easier to test and extend.

---

## 📌 Future Improvements

- [ ] JWT authentication
- [ ] QR code generation
- [ ] Analytics dashboard with charts

---

## 👨‍💻 Author

Built by **[Mohammad Kaif Shaikh]**

- GitHub: [@mohdkaifshaikh](https://github.com/mohdkaifshaikh)

---
