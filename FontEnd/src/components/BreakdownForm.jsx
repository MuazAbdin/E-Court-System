import React from "react";
import { Form } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function BreakdownForm({ className }) {
  const [from, setFrom] = React.useState(null);
  const [to, setTo] = React.useState(null);
  return (
    <Form noValidate className={className}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          margin="normal"
          disableFuture
          label="From"
          name="from"
          value={from}
          onChange={(newValue) => setFrom(newValue)}
          format="DD-MM-YYYY"
        />
        <DatePicker
          margin="normal"
          disableFuture
          label="To"
          name="to"
          value={to}
          onChange={(newValue) => setTo(newValue)}
          format="DD-MM-YYYY"
          color="var(--text-color)"
        />
      </LocalizationProvider>
    </Form>
  );
}

export default BreakdownForm;
