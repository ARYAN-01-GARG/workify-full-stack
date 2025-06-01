# Workify Project

Workify is a full-stack web application designed to streamline work management and collaboration. It features a modern React (Bun + Vite) frontend and a robust Node.js/Express backend, with PostgreSQL as the primary database. The project is fully containerized using Docker and orchestrated with Docker Compose for easy local development and deployment.

## Main Features

- User authentication and profile management
- Post creation, editing, and deletion
- Image uploads and cloud storage integration
- Real-time collaboration features (planned)
- Responsive, modern UI with Tailwind CSS

## Tech Stack

- **Frontend:** React 19, Bun, Vite, Tailwind CSS
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** PostgreSQL (local or cloud, e.g., Neon)
- **Containerization:** Docker, Docker Compose

## Development

- Run the full stack locally with `docker-compose up --build`
- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend API: [http://localhost:3000](http://localhost:3000)

---

For more details, see the documentation in the respective `client` and `server` folders.
