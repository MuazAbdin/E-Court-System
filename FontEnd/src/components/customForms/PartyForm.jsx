import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import { StyledForms } from "../../assets/stylingWrappers/StyledForms";
import {
  LEGAL_PARTY_FIELDS,
  PARTY_DETAILS_FIELDS,
} from "../../utils/constants";
import Input from "../Input";
import { FaTrashCan } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { MdNoteAdd } from "react-icons/md";

export default function PartyForm({
  children,
  className,
  formID,
  title,
  method,
  buttonText,
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [persons, setPersons] = useState([0]);

  function handleAdd(event) {
    event.preventDefault();
    setPersons((prev) => [...prev, prev[prev.length - 1] + 1]);
  }

  function handleDelete(event, idx) {
    event.preventDefault();
    setPersons((prev) => prev.slice(0, idx).concat(prev.slice(idx + 1)));
  }

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <h3 className="title">{title}</h3>
      <menu>
        {persons.map((pNum, i) => (
          <li key={pNum} className="party-details">
            <div className="person">
              <span>Person {i + 1}</span>
              <button
                className="btn del-btn"
                onClick={(e) => handleDelete(e, i)}
              >
                <FaTrashCan />
              </button>
            </div>
            {PARTY_DETAILS_FIELDS.map((f) => (
              <Input
                key={`${formID}${title}${i}-${f.id}`}
                label={f.label}
                type="text"
                id={`${formID}${title}${i}-${f.id}`}
                icon={f.icon}
                ref={null}
                autoComplete={f.autoComplete ?? "off"}
                validator={f.validator}
                required={f.required}
                severErrorMsg={""}
                multiline={f.multiline ?? false}
                rows={f.rows ?? undefined}
                prevValue={""}
                isSubmitted={false}
              />
            ))}
          </li>
        ))}
      </menu>

      <section className="btn-container c-flex">
        <button name="submit" className="btn c-flex" disabled={isSubmitting}>
          <MdNoteAdd />
          {isSubmitting ? "submitting ..." : `${buttonText}`}
        </button>
        <button className="btn c-flex add-btn" onClick={handleAdd}>
          <IoPersonAdd />
          add person
        </button>
      </section>
    </Form>
  );
}
