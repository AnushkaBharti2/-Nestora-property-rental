# Nestora – House Rent Application (MERN Stack)

Nestora is a full-stack property rental platform designed to simplify the process of finding, listing, and managing rental properties. The application enables tenants to search and book properties while allowing landlords and agents to manage property listings efficiently.

The platform is built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** and includes features such as authentication, property management, booking workflows, reviews, and real-time messaging.

---

# Features

## User Authentication

* Secure user registration and login using **JWT authentication**
* Protected routes and session management
* User profile management

## Role-Based Access Control

The platform supports three types of users:

* **Tenant** – Browse and book properties
* **Landlord** – Manage owned properties
* **Agent** – Manage properties for multiple landlords

## Property Management

* Create, update, and delete property listings
* Upload property images
* Display property details including price, location, and amenities

## Property Search and Filters

Users can filter properties based on:

* City
* Price range
* Number of bedrooms
* Number of bathrooms
* Property type

## Booking System

* Tenants can request property bookings
* Landlords or agents can approve or reject booking requests
* Booking status tracking

## Real-Time Messaging

* Integrated chat system using **Socket.io**
* Allows direct communication between tenants and property owners

## Reviews and Ratings

* Users can leave ratings and reviews for properties
* Helps future tenants evaluate listings

---

# Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.io
* Cloudinary (Image storage)
* Multer (File upload handling)

## Frontend

* React.js
* Vite
* React Router
* Axios
* Socket.io Client
* CSS / Tailwind CSS

---

# Project Structure

```
house-rent-app
│
├── server
│   ├── config
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── controllers
│   ├── socket
│   └── server.js
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── hooks
│   │   ├── utils
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure the following tools are installed:

* Node.js (v14 or above)
* MongoDB (Local installation or MongoDB Atlas)
* npm or yarn

---

# Installation

## 1 Clone the Repository

```
git clone https://github.com/yourusername/nestora-property-rental.git
```

## 2 Install Backend Dependencies

```
cd server
npm install
```

## 3 Install Frontend Dependencies

```
cd client
npm install
```

---

# Environment Variables

Create a `.env` file inside the **server** folder.

```
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

CLIENT_URL=http://localhost:5173
```

---

# Running the Application

## Start Backend Server

```
cd server
npm run dev
```

## Start Frontend Client

```
cd client
npm run dev
```

Open the application in your browser:

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/auth/me`

## Properties

* GET `/api/properties`
* GET `/api/properties/:id`
* POST `/api/properties`
* PUT `/api/properties/:id`
* DELETE `/api/properties/:id`
* GET `/api/properties/featured`

## Bookings

* GET `/api/bookings`
* POST `/api/bookings`
* PUT `/api/bookings/:id/status`

## Reviews

* GET `/api/reviews/property/:id`
* POST `/api/reviews`

## Messages

* GET `/api/messages/conversations`
* GET `/api/messages/:conversationId`
* POST `/api/messages`

---

# Team

This project was developed as part of a collaborative group project.

### Team Members

* **Mayank Ahirwar** — Team Lead
* **Aryan Rai** — Member
* **Ayush Garhwal** — Member
* **Anushka Bharti** — Member

Each member contributed to different components of the project including frontend development, backend APIs, database integration, testing, and deployment.

---

# Project Purpose

This project demonstrates the development of a **full-stack MERN application** implementing authentication, role-based access control, property listing management, booking workflows, and real-time communication using Socket.io.

ISC
