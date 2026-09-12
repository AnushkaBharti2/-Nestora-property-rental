# House Rent App - MERN Stack Project Plan

## Project Overview
Create a full-stack MERN (MongoDB, Express, React, Node.js) rental property application with real-time chat, booking management, and role-based access control.

## Task Breakdown

### Phase 1: Project Setup
- [ ] Create main project directory: house-rent-app/
- [ ] Initialize server with package.json and dependencies
- [ ] Initialize client with Vite + React
- [ ] Set up environment variables for both server and client

### Phase 2: Server/Backend Implementation
- [ ] Create server entry point (server.js)
- [ ] Set up MongoDB connection (config/db.js)
- [ ] Configure Cloudinary for image uploads (config/cloudinary.js)
- [ ] Create Mongoose models:
  - [ ] User.js (tenant/landlord/agent roles)
  - [ ] Property.js
  - [ ] Booking.js
  - [ ] Review.js
  - [ ] Message.js
- [ ] Implement middleware:
  - [ ] auth.middleware.js (JWT verification)
  - [ ] role.middleware.js (RBAC)
  - [ ] upload.middleware.js (Multer)
- [ ] Create controllers:
  - [ ] auth.controller.js
  - [ ] property.controller.js
  - [ ] booking.controller.js
  - [ ] review.controller.js
  - [ ] message.controller.js
- [ ] Set up routes:
  - [ ] auth.routes.js
  - [ ] user.routes.js
  - [ ] property.routes.js
  - [ ] booking.routes.js
  - [ ] review.routes.js
  - [ ] message.routes.js
- [ ] Implement Socket.io for real-time chat (socket/socket.js)

### Phase 3: Client/Frontend Implementation
- [ ] Set up main entry files (main.jsx, App.jsx, index.css)
- [ ] Create utility files:
  - [ ] utils/api.js (Axios instance)
  - [ ] utils/helpers.js
- [ ] Create context providers:
  - [ ] context/AuthContext.jsx
  - [ ] context/SocketContext.jsx
- [ ] Create custom hooks:
  - [ ] hooks/useAuth.js
  - [ ] hooks/useSocket.js
  - [ ] hooks/useFetch.js
- [ ] Build common components:
  - [ ] components/common/Navbar.jsx
  - [ ] components/common/Footer.jsx
  - [ ] components/common/Loader.jsx
  - [ ] components/common/ProtectedRoute.jsx
- [ ] Build property components:
  - [ ] components/property/PropertyCard.jsx
  - [ ] components/property/PropertyList.jsx
  - [ ] components/property/PropertyFilter.jsx
  - [ ] components/property/PropertyForm.jsx
- [ ] Build chat components:
  - [ ] components/chat/ChatWindow.jsx
  - [ ] components/chat/ChatList.jsx
  - [ ] components/chat/MessageBubble.jsx
- [ ] Build booking components:
  - [ ] components/booking/BookingForm.jsx
  - [ ] components/booking/BookingCard.jsx
  - [ ] components/booking/BookingCalendar.jsx
- [ ] Build review components:
  - [ ] components/review/ReviewForm.jsx
  - [ ] components/review/ReviewList.jsx
- [ ] Create pages:
  - [ ] pages/Home.jsx
  - [ ] pages/Login.jsx
  - [ ] pages/Register.jsx
  - [ ] pages/Properties.jsx
  - [ ] pages/PropertyDetail.jsx
  - [ ] pages/AddProperty.jsx
  - [ ] pages/Chat.jsx
  - [ ] pages/Bookings.jsx
  - [ ] pages/dashboard/TenantDashboard.jsx
  - [ ] pages/dashboard/LandlordDashboard.jsx
  - [ ] pages/dashboard/AgentDashboard.jsx

### Phase 4: Configuration Files
- [ ] Create .gitignore files
- [ ] Create README.md
- [ ] Configure vite.config.js
- [ ] Set up client .env

## Implementation Order
1. First create directory structure
2. Create package.json files with dependencies
3. Implement server-side code (models, routes, controllers)
4. Implement client-side code (components, pages, context)
5. Test and verify the application

## Dependencies Needed

### Server Dependencies
- express, mongoose, dotenv, cors, bcryptjs, jsonwebtoken
- multer, cloudinary, multer-storage-cloudinary
- socket.io, helmet, morgan

### Client Dependencies
- react, react-dom, react-router-dom
- axios, socket.io-client
- jwt-decode
