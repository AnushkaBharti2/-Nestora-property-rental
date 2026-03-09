# House Rent App - MERN Stack Application

A full-stack rental property management application built with MongoDB, Express, React, and Node.js.

## Features

- **User Authentication**: Register, login, logout with JWT tokens
- **Role-based Access Control**: Tenant, Landlord, and Agent roles
- **Property Management**: Create, read, update, delete property listings
- **Search & Filter**: Filter properties by city, price, bedrooms, bathrooms, etc.
- **Booking System**: Request bookings, approve/reject bookings
- **Real-time Chat**: Socket.io powered messaging system
- **Reviews & Ratings**: Leave reviews for properties

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.io for real-time communication
- Cloudinary for image uploads
- Multer for file handling

### Frontend
- React with Vite
- React Router for navigation
- Axios for API calls
- Socket.io-client for real-time chat
- CSS for styling

## Project Structure

```
house-rent-app/
├── server/                 # Backend server
│   ├── config/            # Database & cloudinary config
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth, role, upload middleware
│   ├── controllers/      # Business logic
│   ├── socket/           # Socket.io logic
│   └── server.js         # Entry point
│
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   ├── hooks/        # Custom hooks
│   │   ├── utils/        # Utility functions
│   │   └── App.jsx       # Main app component
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

2. **Install server dependencies**
   
```
bash
   cd server
   npm install
   
```

3. **Install client dependencies**
   
```
bash
   cd client
   npm install
   
```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:
   
```
env
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   CLIENT_URL=http://localhost:5173
   
```

5. **Start MongoDB** (if using local)

6. **Run the server**
   
```
bash
   cd server
   npm run dev
   
```

7. **Run the client**
   
```
bash
   cd client
   npm run dev
   
```

8. **Open your browser**
   Navigate to `http://localhost:5173`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (Landlord/Agent)
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/properties/featured` - Get featured properties

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/status` - Update booking status

### Reviews
- `GET /api/reviews/property/:id` - Get property reviews
- `POST /api/reviews` - Create review

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:conversationId` - Get messages
- `POST /api/messages` - Send message

## User Roles

### Tenant
- Browse properties
- Make booking requests
- Leave reviews
- Chat with landlords/agents

### Landlord
- All tenant features
- Create/manage properties
- Approve/reject booking requests
- View earnings dashboard

### Agent
- All tenant features
- Create/manage properties (multiple landlords)
- Approve/reject booking requests

## License

ISC
