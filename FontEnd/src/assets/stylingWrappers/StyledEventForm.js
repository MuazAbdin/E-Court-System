import styled from "styled-components";
import { EventForm } from "../../components";

const StyledEventForm = styled(EventForm)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  padding: 2rem;
  padding-top: 0;
  font-family: var(--main-font);
  font-size: 1.65rem;
  line-height: 1.2;

  .title {
    grid-column: 1 / 3;
    font-size: 2rem;
    font-family: var(--subtitle-font);
    padding-bottom: 1rem;
  }

  fieldset {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border: none;

    & > .MuiFormControl-root {
      width: 100%;
    }
  }

  fieldset:last-of-type {
    grid-column: 1/3;
  }

  .btn {
    grid-column: 1 / 3;
    height: fit-content;
    width: 50%;
    padding: 0.75rem 0;
    font-size: 1.25rem;
    font-weight: 500;
    margin: auto;
  }

  .btn:disabled {
    cursor: not-allowed;
    background-color: var(--grey-500);
  }

  input:disabled,
  input:read-only,
  textarea:disabled,
  textarea:read-only {
    cursor: not-allowed;
    background-color: var(--grey-200);
  }

  fieldset {
    .MuiFormControl-root {
      background-color: hsla(214, 32%, 91%, 0.75);
      border-radius: var(--border-radius);

      label,
      input {
        font-family: var(--main-font);
        /* text-transform: capitalize; */
      }

      label > span {
        color: var(--red-dark);
      }

      /* input, */
      .MuiSvgIcon-root {
        color: var(--primary-600);
      }
    }
  }
`;

export default StyledEventForm;
