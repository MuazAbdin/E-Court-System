import { Form, useNavigation } from "react-router-dom";
import { Input } from "../../components";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import StyledInputSelect from "../../assets/stylingWrappers/StyledInputSelect";

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
            { id: 1, value: "General" },
            { id: 2, value: "Hearing" },
            { id: 3, value: "Trial" },
            { id: 4, value: "Appeal" },
          ]}
        />
      </fieldset>

      <fieldset>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            margin="normal"
            id={`${formID}-date`}
            label="Date"
            name={`${formID}-date`}
            value={eventDate}
            onChange={(newValue) => setEventDate(newValue)}
            minDate={dayjs()}
            format="DD-MM-YYYY"
            slotProps={{ textField: { size: "small", variant: "filled" } }}
          />
        </LocalizationProvider>
      </fieldset>

      <Input
        key={`${formID}-decription`}
        label="Decription"
        type="text"
        id={`${formID}-decription`}
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
