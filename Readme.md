# Complaint Management System

This project is a Complaint Management System built using React, Node.js, Express, and MongoDB. It allows users to submit complaints, track their statuses, and enables admins to manage them effectively. The application includes email notifications for complaint updates.

---

## Features
- User registration and login functionality.
- Role-based access (Admin/User).
- Users can submit complaints.
- Admins can view, update, and delete complaints.
- Email notifications for complaint submissions and updates.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/misterraina/Complaint-Full-stack
cd folder
```

### 2. Install Dependencies
#### Backend
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```
#### Frontend
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

### 3. Environment Variables
#### Backend
Create a `.env` file in the `backend` directory with the following content:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
ADMIN_EMAIL=admin_email@example.com
```
- Replace `your_mongodb_connection_string` with your MongoDB connection string.
- Replace `your_email@example.com` and `your_email_password` with your SMTP credentials.
- Replace `admin_email@example.com` with the admin’s email address for notifications.

### 4. Run the Application
#### Backend
Start the backend server:
```bash
cd backend
npm start
```
#### Frontend
Start the frontend development server:
```bash
cd ../frontend
npm start
```
The application will be accessible at `http://localhost:3000`.

---

## How to Use the Application

### 1. Register and Login
- Users can register with their name, email, and password.
- After registration, log in to access the dashboard.

### 2. Submit a Complaint
- Navigate to the “Submit Complaint” section.
- Fill in the title, description, category, and priority of your complaint.

### 3. Manage Complaints (Admin)
- Admins can view all complaints in the dashboard.
- Admins can update the status of complaints and delete them if necessary.

---

## Email Functionality

### SMTP Configuration
The application uses Nodemailer for email functionality. Configure the following environment variables in the backend `.env` file:
```env
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
ADMIN_EMAIL=admin_email@example.com
```

- **EMAIL_USER**: Your SMTP email address.
- **EMAIL_PASS**: Your SMTP email password.
- **ADMIN_EMAIL**: Email address to receive complaint notifications.

### Email Notifications
- Users receive email notifications when their complaints are updated.
- Admins receive email notifications when a new complaint is submitted.

---

## MongoDB Setup Instructions

### 1. Create a MongoDB Cluster
- Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.

### 2. Configure Database
- Add a new database named `complaintDB`.

### 3. Whitelist IP Address
- In the MongoDB Atlas dashboard, whitelist your IP address to connect to the cluster.

### 4. Get Connection String
- Copy the connection string from the cluster dashboard.
- Replace `your_mongodb_connection_string` in the backend `.env` file with the connection string.

---

## Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

