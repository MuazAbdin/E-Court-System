import { Form, useNavigation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";

function BreakdownForm({ className, formID, method, buttonText }) {
  const [from, setFrom] = useState(dayjs());
  const [to, setTo] = useState(dayjs());

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <fieldset>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id={`${formID}-start`}
            margin="normal"
            label="Start"
            name={`${formID}-start`}
            disableFuture
            value={from}
            onChange={(newValue) => setFrom(newValue)}
            format="DD-MM-YYYY"
            slotProps={{ textField: { size: "small", variant: "filled" } }}
          />
          <span className="separator">to</span>
          <DatePicker
            id={`${formID}-end`}
            margin="normal"
            label="End"
            name={`${formID}-end`}
            disableFuture
            value={to}
            onChange={(newValue) => setTo(newValue)}
            format="DD-MM-YYYY"
            slotProps={{ textField: { size: "small", variant: "filled" } }}
          />
        </LocalizationProvider>
      </fieldset>
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>
    </Form>
  );
}

export default BreakdownForm;
