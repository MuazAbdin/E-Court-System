import React from "react";
import Wrapper from "../assets/stylingWrappers/CaseCard";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
export default function CaseCard({ cases }) {
  return (
    <Wrapper>
      <div className="cards">
        <div className="create-new">
          <Card>
            <Button component={Link} to="/user/cases/add-new">
              <span className="new-case-btn" style={{ fontSize: "2rem" }}>
                +
              </span>
            </Button>
            <CardContent>
              <Typography className="create-new-case-text">
                Create New Case
              </Typography>
            </CardContent>
          </Card>
        </div>
        {cases.map((caseItem) => (
          <Card key={caseItem._id} className="card" component="div">
            <CardContent>
              <Typography className="create-new-case-text">
                <Link to={`/user/cases/${caseItem._id}`}>
                  {caseItem.title}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {caseItem.createdAt}
              </Typography>
            </CardContent>
            <div className="link-btn">
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/dashboard/document/${caseItem.id}`}
                >
                  Create Document
                </Button>
              </CardActions>
            </div>
            <div className="link-btn">
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/dashboard/event/${caseItem.id}`}
                >
                  Add Event
                </Button>
              </CardActions>
            </div>
          </Card>
        ))}
      </div>
    </Wrapper>
  );
}
