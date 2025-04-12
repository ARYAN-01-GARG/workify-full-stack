import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { connectToDB } from "./config/prisma";
import AuthRoutes from "./routes/auth/auth-routes";
import { healthCheckController } from "./controllers/health-check-controller";
import { limiter } from "./controllers/limiter";
import { reqLogger } from "./middlewares/global-middlewares/reqLogger";
import { globalErrorHandler } from "./middlewares/global-middlewares/errorHandler";
import { versionHandler } from "./middlewares/global-middlewares/versionHandler";

const app: Express = express();

// Load environment variables
dotenv.config();

// Connect to database
connectToDB();

const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(limiter(10 * 60 * 1000, 100));
app.use(express.json());
app.use(reqLogger);
app.use(versionHandler("v1"));

// Routes
app.get("/api/v1", healthCheckController);
app.use("/api/v1/auth", AuthRoutes);

// Error Handler
app.use(globalErrorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
