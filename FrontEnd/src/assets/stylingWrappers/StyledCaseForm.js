import styled from "styled-components";
import { CaseForm } from "../../components";

const StyledCaseForm = styled(CaseForm)`
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  position: relative;

  padding: 2rem;
  font-family: var(--main-font);
  font-size: 1.65rem;
  line-height: 1.2;

  .title {
    font-size: 2rem;
    font-family: var(--subtitle-font);
    grid-column: 1 / 3;
    padding-bottom: 1rem;
  }

  & > .MuiFormControl-root {
    width: 60%;
    margin: auto;
  }

  .case-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem 1rem;

    /* fieldset:nth-child(3) {
      grid-column: 1/3;
    } */
  }

  .parties {
    border-top: 1px dashed;
    padding-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    & > section {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .title {
        font-family: var(--main-font);
        font-size: 1.2rem;
        font-weight: 600;
        padding-bottom: 0;
      }
    }
  }

  .notes {
    border-top: 1px dashed;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .title {
      font-family: var(--main-font);
      font-size: 1.35rem;
      font-weight: 600;
      padding-bottom: 0;
    }
  }

  fieldset {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border: none;
  }

  /* .MuiFormControl-root:has(textarea.Mui-readOnly) {
    cursor: not-allowed;
    background-color: var(--grey-200);
  } */

  .btn {
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

  .MuiInputBase-input {
    font-family: var(--main-font);
  }

  .add-doc,
  .add-stakeholder,
  .add-event {
    /* margin: 0 auto 0 0; */
    gap: 0.5rem;
    width: fit-content;
    padding: 0.25rem 1rem;
    font-size: 1rem;
    background-color: hsla(214, 32%, 91%, 0.75);
    color: rgba(0, 0, 0, 0.6);
    border-radius: 50px;

    &:hover {
      box-shadow: 0 0 10px var(--highlight-color);
    }

    a {
      display: flex;
      /* justify-content: center; */
      align-items: center;
      gap: 0.5rem;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .disabled-link {
    cursor: not-allowed;
    &:hover {
      box-shadow: none;
    }

    & > a {
      color: rgba(0, 0, 0, 0.6);
      pointer-events: none;
      text-decoration: none;
    }
  }

  .documents,
  .stakeholders,
  .events {
    border-top: 1px dashed;
    padding-top: 1rem;
    grid-column: 1 / 3;
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    gap: 0.5rem;

    .section-title {
      font-family: var(--main-font);
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .add-doc,
    .add-stakeholder,
    .add-event {
      margin: 0 auto 0 0;
    }

    fieldset {
      .MuiFormControl-root {
        background-color: hsla(214, 32%, 91%, 0.75);
        border-radius: var(--border-radius);

        label,
        input,
        textarea {
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
  }

  .ant-upload-wrapper {
    background-color: hsla(214, 32%, 91%, 0.75);
    font-family: var(--main-font);
  }

  .pdf-btn {
    position: absolute;
    top: 1rem;
    left: 1.25rem;
    width: fit-content;
    font-size: 1.75rem;
    padding: 0.75rem;
    background-color: transparent;
    color: var(--text-color);
    box-shadow: none;

    &:hover {
      background-color: transparent;
      color: var(--text-color);
    }
  }
`;
export default StyledCaseForm;
