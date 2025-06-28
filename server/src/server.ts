import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { connectToDB } from "./config/prisma";
import AuthRoutes from "./routes/auth/auth-routes";
import PostRoutes from "./routes/posts/post-routes";
import UserRoutes from "./routes/user/user-routes";
import RecruiterRoutes from "./routes/recruiter/recruiter-routes";
import CandidateRoutes from "./routes/candidate/candidate-routes";
import { healthCheckController } from "./controllers/health-check-controller";
import { limiter } from "./controllers/limiter";
import { globalErrorHandler } from "./middlewares/global-middlewares/errorHandler";
import reqLogger from "./middlewares/global-middlewares/reqLogger";
import { versionHandler } from "./middlewares/global-middlewares/versionHandler";
import corsConfig from "./config/corsConfig";
import helmet from "helmet";

const app: Express = express();

// Connect to database
connectToDB();

const port = process.env.PORT || 3000;

// Middlewares
app.use(corsConfig);
app.use(reqLogger);
app.use(helmet());
app.use(limiter(10 * 60 * 1000, 200));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(versionHandler("v1"));

// Routes
app.get("/api/v1", healthCheckController);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/post", PostRoutes);
app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/recruiter', RecruiterRoutes);
app.use("/api/v1/candidate", CandidateRoutes);


app.all("*", (req : Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "This Route doesn't exist",
  });
});

// Error Handler
app.use(globalErrorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port} and URL is http://localhost:${port}`);
});
