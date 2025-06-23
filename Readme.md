# Workify - Job Portal Platform

Workify is a comprehensive full-stack job portal application that connects job seekers with recruiters. Built with modern technologies, it provides a seamless experience for candidates to find opportunities and for recruiters to discover talent.

## 🚀 Features

### Authentication & User Management

- **Secure Authentication**: JWT-based authentication with email verification via OTP
- **Multi-Role System**: Support for Candidates, Recruiters, and Admin roles
- **Profile Management**: Comprehensive user profiles with image upload support
- **Password Security**: Bcrypt hashing for password protection

### For Job Seekers (Candidates)

- **Profile Creation**: Complete candidate profiles with resume, portfolio, and skills
- **Education & Experience**: Track educational background and work experience
- **Project Showcase**: Display personal projects with technologies used
- **Job Applications**: Apply to job postings with application tracking
- **Skill Management**: Maintain and showcase technical skills

### For Recruiters

- **Company Profiles**: Create detailed company and recruiter profiles
- **Job Posting**: Create, edit, and manage job postings
- **Application Management**: Review and manage candidate applications
- **Advanced Filtering**: Filter candidates by skills, experience, and location

### Job Management

- **Job Listings**: Browse and search job opportunities
- **Advanced Search**: Filter by location, remote work, salary range, and skills
- **Application Status**: Track application status (Pending, Accepted, Rejected)
- **Job Details**: Comprehensive job descriptions with company information

### Media & File Management

- **Cloud Storage**: Cloudinary integration for image and file uploads
- **Resume Upload**: Support for resume uploads and management
- **Profile Images**: User avatar management with cloud storage

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite with Bun package manager
- **Styling**: Tailwind CSS v4 with custom animations
- **UI Components**: Radix UI primitives for accessible components
- **State Management**: Redux Toolkit for global state
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios for API communication
- **Notifications**: React Toastify for user feedback

### Backend

- **Runtime**: Node.js with Express.js
- **Language**: TypeScript for type safety
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcryptjs
- **File Upload**: Multer with Cloudinary integration
- **Email Service**: Nodemailer for OTP verification
- **Security**: Helmet for security headers, CORS configuration
- **Rate Limiting**: Express rate limiter for API protection
- **Logging**: Winston for application logging

### Database Schema

- **Users**: Multi-role user system with profile management
- **Posts**: Job postings with detailed requirements
- **Applications**: Job application tracking system
- **Candidates**: Extended candidate profiles with education and projects
- **Recruiters**: Company and recruiter information
- **Images**: Cloud-based image management

### DevOps & Deployment

- **Containerization**: Docker for both frontend and backend
- **Orchestration**: Docker Compose for multi-service setup
- **Database**: PostgreSQL 16 Alpine container
- **Environment**: Environment-based configuration

## 🏗️ Project Structure

```text
workify-full-stack/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── layouts/       # Page layouts
│   │   ├── store/         # Redux store and slices
│   │   ├── hooks/         # Custom React hooks
│   │   ├── schemas/       # Zod validation schemas
│   │   └── types/         # TypeScript type definitions
│   └── public/            # Static assets and images
├── server/                # Node.js backend application
│   ├── src/
│   │   ├── controllers/   # API route controllers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── routes/        # API route definitions
│   │   ├── config/        # Configuration files
│   │   └── utilities/     # Helper functions
│   └── prisma/
│       └── schemas/       # Prisma database schema
└── docker-compose.yml     # Multi-service orchestration
```

## 🚦 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- PostgreSQL (if running locally)

### Quick Start with Docker

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd workify-full-stack
   ```

2. **Set up environment variables**

   ```bash
   # Create .env file in the server directory
   cp server/.env.example server/.env
   # Edit the .env file with your configuration
   ```

3. **Run the application**

   ```bash
   docker-compose up --build
   ```

4. **Access the application**

   - Frontend: [http://localhost:8080](http://localhost:8080)
   - Backend API: [http://localhost:3000](http://localhost:3000)
   - Database: PostgreSQL on port 5432

### Local Development

#### Backend Setup

```bash
cd server
npm install
npm run dev
```

#### Frontend Setup

```bash
cd client
bun install
bun run dev
```

## 📝 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - Email verification
- `POST /api/auth/logout` - User logout

### User Management

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/upload-image` - Upload profile image

### Job Posts Management

- `GET /api/posts` - Get all job posts
- `POST /api/posts` - Create new job post
- `PUT /api/posts/:id` - Update job post
- `DELETE /api/posts/:id` - Delete job post

### Application Management

- `POST /api/applications` - Apply for a job
- `GET /api/applications` - Get user applications
- `PUT /api/applications/:id` - Update application status

## 🔒 Environment Variables

### Server Configuration

```env
DATABASE_URL=postgresql://username:password@localhost:5432/workify
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
EMAIL_HOST=your-email-host
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
```

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
bun test
```

## 📦 Deployment

The application is containerized and ready for deployment on any Docker-compatible platform:

- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent database toolkit
- Tailwind CSS for the utility-first CSS framework
- All contributors and the open-source community

---

Built with ❤️ by the Workify team
