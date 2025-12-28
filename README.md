# Billing Software - Full Stack Application

A professional and robust Full Stack Billing Software built using **Spring Boot** (Backend) and **React.js** (Frontend). This application provides a complete solution for managing inventory, processing orders, handling payments, and monitoring business performance through a dashboard.

## 🚀 Project Overview

This project is designed to streamline billing processes for businesses. It includes features for user authentication, category and item management, order creation, payment integration, and a comprehensive dashboard for real-time insights.

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.5.4
- **Language:** Java 21
- **Security:** Spring Security (JWT-based Authentication)
- **Database:** MySQL
- **ORM:** Spring Data JPA (Hibernate)
- **Cloud Integration:** Cloudinary (for image uploads)
- **Payment Gateway:** Razorpay
- **Build Tool:** Maven

### Frontend
- **Library:** React.js 19
- **Build Tool:** Vite
- **Styling:** Bootstrap 5 & Custom CSS
- **Routing:** React Router Dom 7
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

## 🔐 Spring Security & Authentication

The application implements a secure, **stateless** authentication mechanism using Spring Security.

- **JWT (JSON Web Tokens):** Used for secure transmission of information between the client and server. Tokens are generated upon login and verified for every restricted request.
- **Stateless Session:** The server does not store session data, making the application scalable.
- **Password Encoding:** Uses `BCryptPasswordEncoder` for hashing and storing user passwords securely.
- **CORS Configuration:** Explicitly configured to allow requests from the React frontend (`http://localhost:5173`).
- **Role-Based Access Control (RBAC):**
    - `ADMIN`: Full access to manage users, categories, items, and view detailed reports.
    - `USER`: Access to manage inventory, process orders, and view their dashboard.
    - Public: Access to login endpoints only.

## ✨ Key Features

- **📊 Dashboard:** Real-time statistics on sales, orders, and inventory.
- **📦 Inventory Management:** Add, update, and organize items by categories.
- **🛒 Order Processing:** Seamlessly create and manage customer orders.
- **💳 Payment Integration:** Secure payment processing with Razorpay.
- **☁️ Cloud Storage:** Automated image hosting for products using Cloudinary.
- **👤 User Management:** Secure admin controls for managing staff accounts.

## 📂 API Structure

The backend API follows a RESTful architecture with a base context path of `/api/v1.0`.

- `/api/v1.0/login` - Public authentication
- `/api/v1.0/categories` - Category management
- `/api/v1.0/items` - Product inventory
- `/api/v1.0/orders` - Order handling
- `/api/v1.0/payments` - Payment processing
- `/api/v1.0/dashboard` - Business analytics

## 🛠️ Getting Started

### Prerequisites
- JDK 21
- Node.js & npm
- MySQL Server

### Backend Setup
1. Configure your database in `application.properties`.
2. Add your Cloudinary and Razorpay credentials.
3. Run the Spring Boot application using Maven: `./mvnw spring-boot:run`

### Frontend Setup
1. Navigate to the `Client` directory.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
