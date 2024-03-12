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
export default function CaseCard() {
  const dummyCases = [
    {
      id: 1,
      title: "Bankruptcy Proceedings",
      description: "Financial insolvency and debt resolution",
      status: "Open",
      court: "Bankruptcy Court",
      judge: "Judge Harris",
      creationDate: "2022-04-15",
    },
    {
      id: 2,
      title: "Medical Malpractice",
      description: "Legal action against medical professionals",
      status: "Pending",
      court: "Medical Board Court",
      judge: "Judge Lee",
      creationDate: "2022-04-20",
    },
    {
      id: 3,
      title: "Contract Dispute",
      description: "Dispute over a business contract",
      status: "Pending",
      court: "High Court",
      judge: "Judge Anderson",
      creationDate: "2022-03-10",
    },
    {
      id: 4,
      title: "Property Rights",
      description: "Dispute over property rights",
      status: "Open",
      court: "County Court",
      judge: "Judge Davis",
      creationDate: "2022-03-15",
    },
    {
      id: 5,
      title: "Personal Injury Claim",
      description: "Compensation for personal injury",
      status: "Closed",
      court: "District Court",
      judge: "Judge White",
      creationDate: "2022-03-20",
    },
    {
      id: 6,
      title: "Divorce Proceedings",
      description: "Legal separation between spouses",
      status: "Open",
      court: "Family Court",
      judge: "Judge Martinez",
      creationDate: "2022-03-25",
    },
    {
      id: 7,
      title: "Environmental Lawsuit",
      description: "Violation of environmental regulations",
      status: "Closed",
      court: "Federal Court",
      judge: "Judge Adams",
      creationDate: "2022-03-30",
    },
    {
      id: 8,
      title: "Criminal Trial",
      description: "Trial for a criminal offense",
      status: "Pending",
      court: "Circuit Court",
      judge: "Judge Brown",
      creationDate: "2022-04-01",
    },
    {
      id: 9,
      title: "Labor Dispute",
      description: "Disagreement between employer and employees",
      status: "Open",
      court: "Labor Court",
      judge: "Judge Taylor",
      creationDate: "2022-04-05",
    },
    {
      id: 10,
      title: "Intellectual Property",
      description: "Dispute over intellectual property rights",
      status: "Closed",
      court: "Patent Court",
      judge: "Judge Wilson",
      creationDate: "2022-04-10",
    },
  ];

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
        {dummyCases.map((caseItem) => (
          <Card key={caseItem.id} className="card" component="div">
            <CardContent>
              <Typography className="create-new-case-text">
                {caseItem.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {caseItem.creationDate}
              </Typography>
            </CardContent>
            <div className="link-btn">
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/dashboard/viewcase/${caseItem.id}`}
                >
                  View Case
                </Button>
              </CardActions>
            </div>
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
