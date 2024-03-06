import express from "express";
import cors from "cors";

import { router as userTypesRouter } from "./routes/userTypes.route.js";
import { router as usersRouter } from "./routes/users.route.js";
import { router as authRouter } from "./routes/auth.route.js";
import { router as casesRouter } from "./routes/cases.route.js";
import { router as caseStatusTypesRouter } from "./routes/caseStatusTypes.route.js";
import { router as courtsRouter } from "./routes/courts.route.js";
import { router as documentsRouter } from "./routes/documents.route.js";
import { router as eventsRouter } from "./routes/events.route.js";
import { router as eventTypesRouter } from "./routes/eventTypes.route.js";
import { router as partiesRouter } from "./routes/parties.route.js";
import { router as stakeholdersRouter } from "./routes/stakeholders.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/cases", casesRouter);
app.use("/case-status-types", caseStatusTypesRouter);
app.use("/courts", courtsRouter);
app.use("/documents", documentsRouter);
app.use("/events", eventsRouter);
app.use("/eventTypes", eventTypesRouter);
app.use("/parties", partiesRouter);
app.use("/stakeholders", stakeholdersRouter);
app.use("/user-types", userTypesRouter);

export default app;