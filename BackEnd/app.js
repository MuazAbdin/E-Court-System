import express from "express";
import cors from "cors";

import { router as userTypesRoutes } from "./routes/userTypes.route.js";
import { router as usersRoutes } from "./routes/users.route.js";
import { router as authRoutes } from "./routes/auth.route.js";
import { router as casesRoutes } from "./routes/cases.route.js";
import { router as caseStatusTypesRoutes } from "./routes/caseStatusTypes.route.js";
import { router as courtsRoutes } from "./routes/courts.route.js";
import { router as documentsRoutes } from "./routes/documents.route.js";
import { router as eventsRoutes } from "./routes/events.route.js";
import { router as eventTypesRoutes } from "./routes/eventTypes.route.js";
import { router as partiesRoutes } from "./routes/parties.route.js";
import { router as stakeholdersRoutes } from "./routes/stakeholders.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/cases", casesRoutes);
app.use("/case-status-types", caseStatusTypesRoutes);
app.use("/courts", courtsRoutes);
app.use("/documents", documentsRoutes);
app.use("/events", eventsRoutes);
app.use("/eventTypes", eventTypesRoutes);
app.use("/parties", partiesRoutes);
app.use("/stakeholders", stakeholdersRoutes);
app.use("/user-types", userTypesRoutes);

export default app;