import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { router as usersRoutes } from "./routes/users.route.js";
import { router as authRoutes } from "./routes/auth.route.js";
import { router as casesRoutes } from "./routes/cases.route.js";
import { router as courtsRoutes } from "./routes/courts.route.js";
import { router as documentsRoutes } from "./routes/documents.route.js";
import { router as eventsRoutes } from "./routes/events.route.js";
import { router as partiesRoutes } from "./routes/parties.route.js";
import { router as stakeholdersRoutes } from "./routes/stakeholders.route.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    credentials: true, // important part here
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/cases", casesRoutes);
app.use("/courts", courtsRoutes);
app.use("/documents", documentsRoutes);
app.use("/events", eventsRoutes);
app.use("/parties", partiesRoutes);
app.use("/stakeholders", stakeholdersRoutes);

export default app;
