import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
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
import { router as typesRoutes } from "./routes/types.route.js"
import { router as caseRespondsRoutes } from "./routes/caseResponds.route.js"

import { authorizationMiddleWare } from "./middlewares/userAuth.middleware.js";
import { permissionsMiddleWare } from "./middlewares/userPermissions.middleware.js";

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

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", [authorizationMiddleWare], usersRoutes);
app.use("/cases", [authorizationMiddleWare], casesRoutes);
app.use("/courts", authorizationMiddleWare, courtsRoutes);
app.use("/documents", authorizationMiddleWare, documentsRoutes);
app.use("/events", authorizationMiddleWare, eventsRoutes);
app.use("/parties", authorizationMiddleWare, partiesRoutes);
app.use("/stakeholders", authorizationMiddleWare, stakeholdersRoutes);
app.use("/case-responds", authorizationMiddleWare, caseRespondsRoutes);
app.use("/types", typesRoutes);

export default app;
