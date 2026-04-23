# Assignment

A full-stack web application where users can explore companies, view ratings, and add reviews. Built using **React (Frontend)** and **Node.js + Express + MongoDB (Backend)**.
---
##  Features

### Company Management

* Add new companies with details:

  * Name
  * Location
  * City
  * Founded Date
* Prevent duplicate companies (same name + city)

### Review System

* Add reviews for each company
* Fields:

  * User Name
  * Subject
  * Rating (1–5)
  * Comment
* Dynamic average rating calculation

### Company Listing

* Pagination support
* Filter by city
* Sort by:
  * Name (A → Z)
  * Rating (High → Low)

### Company Detail Page

* View company details
* See all reviews
* Sort reviews by:
  * Date
  * Rating

---

## Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## Project Structure

```
client/
  src/
    components/
    pages/
    App.jsx

server/
  controllers.js
  Schema.js
  index.js
```

---

## Installation & Setup

### 1.Clone repository

```bash
git clone <your-repo-link>
cd project-folder
```

---

###  2. Backend setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
```

Run server:

```bash
npm run dev
```

---

### 3. Frontend setup

```bash
cd client
npm install
npm run dev
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

## API Endpoints

### Company APIs

#### ➤ Add Company

```http
POST /company
```

Body:

```json
{
  "name": "Google",
  "location": "Bangalore",
  "city": "Bangalore",
  "foundedOn": "1998"
}
```

---

#### ➤ Get All Companies

```http
GET /company?page=1&limit=10&city=Indore&sort=Rating
```

---

#### ➤ Get Company Details

```http
GET /:companyId
```

---

###  Review APIs

#### ➤ Add Review

```http
POST /company/:companyId/reviews
```

Body:

```json
{
  "userName": "Sanskar",
  "subject": "Great Company",
  "rating": 5,
  "comment": "Amazing culture"
}
```

---

#### Get Reviews by Company

```http
GET /company/:companyId/reviews
```

---

## Key Concepts Used

### Pagination

* Implemented using `skip` and `limit`
* Helps handle large datasets efficiently

---

### Sorting

* Name sorting → MongoDB
* Rating sorting → computed using reviews

---

### Mongoose Relationships

* Company stores `reviewIds`
* Reviews store `companyId`
* Used `.populate()` to fetch related data

---

### Reusable Components

* Star Rating Component
* Used for:
  * Display rating
  * Input rating

---

## How Star Rating Works

* Loop from 1 → 5
* Compare with rating
* Render:
  * Filled star 
  * Empty star 

---

## Performance Considerations

* Pagination prevents large data load
* Filtering reduces DB queries
* Sorting handled efficiently

## Author

**Sanskar Jhala**
Final Year AIML Student
MERN + AI Developer
