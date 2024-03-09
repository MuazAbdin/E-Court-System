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
      <fieldset>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            margin="normal"
            disableFuture
            label="Start"
            name="start"
            value={from}
            onChange={(newValue) => setFrom(newValue)}
            format="DD-MM-YYYY"
            slotProps={{ textField: { size: "small", variant: "filled" } }}
          />
          <span className="separator">to</span>
          <DatePicker
            margin="normal"
            disableFuture
            label="End"
            name="end"
            value={to}
            onChange={(newValue) => setTo(newValue)}
            format="DD-MM-YYYY"
            slotProps={{ textField: { size: "small", variant: "filled" } }}
          />
        </LocalizationProvider>
      </fieldset>
      <button className="btn">show results</button>
    </Form>
  );
}

export default BreakdownForm;
