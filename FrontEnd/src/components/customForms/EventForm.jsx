import { Form, useNavigation } from "react-router-dom";
import { Input } from "../../components";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import StyledInputSelect from "../../assets/stylingWrappers/StyledInputSelect";
import dayjs from "dayjs";

function EventForm({
  children,
  className,
  formID,
  title,
  method,
  buttonText,
  values,
}) {
  const [eventDate, setEventDate] = useState(dayjs());

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <h3 className="title">{title}</h3>
      <fieldset key="fs-eventType">
        <StyledInputSelect
          id={`${formID}-type`}
          label="Type"
          menuItems={[
            { id: "General", value: "General" },
            { id: "Hearing", value: "Hearing" },
            { id: "Trial", value: "Trial" },
            { id: "Appeal", value: "Appeal" },
          ]}
        />
      </fieldset>

      <fieldset>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            margin="normal"
            id={`${formID}-date`}
            label="Date & Time"
            name={`${formID}-date`}
            value={eventDate}
            onChange={(newValue) => setEventDate(newValue)}
            disablePast
            // minDateTime={dayjs()}
            ampm={false}
            format="DD MMM YYYY - HH:mm"
            slotProps={{ textField: { size: "small", variant: "filled" } }}
          />
        </LocalizationProvider>
      </fieldset>

      <Input
        key={`${formID}-description`}
        label="Description"
        type="text"
        id={`${formID}-description`}
        multiline={true}
        rows={7}
        prevValue={""}
      />

      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>

      {children}
    </Form>
  );
}

export default EventForm;
