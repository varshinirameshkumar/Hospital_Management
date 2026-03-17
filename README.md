Medicore - Hospital Management System

Medicore is a full-stack appointment booking platform. It allows patients to discover specialized doctors and book consultations seamlessly.

Tech Stack
- Frontend: React.js, Tailwind CSS, Lucide Icons
- Backend: Spring Boot (Java 21), Maven
- Database: MongoDB Atlas (Cloud)
- API Client: Axios

Project Structure

├── appointment-system (Backend - Spring Boot)
│   ├── src/main/java/com/hospital/controller  <-- REST API Endpoints
│   ├── src/main/java/com/hospital/model       <-- Data Models
│   └── src/main/resources/application.properties <-- DB Config
└── frontend (Frontend - React)
    ├── src/pages/PatientDashboard.jsx         <-- Main UI Logic
    └── src/api/axiosConfig.js                 <-- Connection Settings