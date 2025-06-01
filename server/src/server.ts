import dotenv from "dotenv";
import express, { Express } from "express";
import { connectToDB } from "./config/prisma";
import AuthRoutes from "./routes/auth/auth-routes";
import PostRoutes from "./routes/posts/post-routes";
import UserRoutes from "./routes/user/user-routes";
import { healthCheckController } from "./controllers/health-check-controller";
import { limiter } from "./controllers/limiter";
import { globalErrorHandler } from "./middlewares/global-middlewares/errorHandler";
import reqLogger from "./middlewares/global-middlewares/reqLogger";
import { versionHandler } from "./middlewares/global-middlewares/versionHandler";
import corsConfig from "./config/corsConfig";
import helmet from "helmet";

const app: Express = express();

// Load environment variables
dotenv.config();

// Connect to database
connectToDB();

const port = process.env.PORT || 3000;

// Middlewares
app.use(corsConfig);
app.use(reqLogger);
app.use(helmet());
app.use(limiter(10 * 60 * 1000, 100));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(versionHandler("v1"));

// Routes
app.get("/api/v1", healthCheckController);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/post", PostRoutes);
app.use('/api/v1/user', UserRoutes);

// Error Handler
app.use(globalErrorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port} and URL is http://localhost:${port}`);
});
