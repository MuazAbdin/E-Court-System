import styled from "styled-components";
import AuthForm from "../../components/AuthForm";

export const StyledRegisterForm = styled(AuthForm)`
  display: grid;
  align-content: start;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--background-color-transparent);
  box-shadow: 0 0 10px var(--text-color);
  font-family: var(--main-font);
  font-size: 1.65rem;
  line-height: 1.2;

  .title {
    font-size: 2.5rem;
    font-family: var(--subtitle-font);
    grid-column: 1 / 3;
    padding-bottom: 1rem;
  }

  .switch-form {
    grid-column: 1 / 3;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 1.5rem 0;
    cursor: pointer;

    &:hover {
      text-decoration-line: underline;
    }
  }

  fieldset:nth-of-type(3) {
    grid-column: 1;
  }

  fieldset {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    border: none;
  }

  .btn {
    grid-column: 1 / 3;
    padding-top: 1.5rem;
    height: fit-content;
    width: 50%;
    justify-self: center;
    padding: 0.75rem 0;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .btn:disabled {
    cursor: not-allowed;
    background-color: var(--grey-500);
  }

  input:disabled,
  input:read-only {
    cursor: not-allowed;
    background-color: var(--grey-200);
  }

  .google-auth {
    grid-column: 1 / 3;
    border-width: 2px;
    border-style: solid;
    border-image: linear-gradient(
        to right,
        var(--text-color) 0 33%,
        transparent 33% 67%,
        var(--text-color) 67%
      )
      1;
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2.5rem;

    .separator-text {
      position: absolute;
      top: 0;
      transform: translateY(-60%);
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
`;

export const StyledLoginForm = styled(StyledRegisterForm)`
  grid-template-columns: 1fr;

  .title,
  .switch-form,
  .btn,
  fieldset,
  .google-auth {
    grid-column: unset;
  }

  fieldset {
    width: 70%;
    justify-self: center;
  }
`;

export const StyledEditDetailsForm = styled(StyledRegisterForm)`
  background: none;
  box-shadow: none;

  fieldset,
  fieldset:nth-of-type(3) {
    grid-column: unset;
  }

  fieldset:nth-of-type(2) {
    grid-column: 1;
  }
`;

export const StyledResponseForm = styled(StyledRegisterForm)`
  background: none;
  box-shadow: none;

  fieldset {
    grid-column: 1/3;
    width: 60%;
    justify-self: center;
  }
`;

export const StyledStakeholderForm = styled(StyledRegisterForm)`
  background: none;
  box-shadow: none;
  padding-top: 0;

  .title {
    font-size: 2.1rem;
  }

  fieldset {
    grid-column: unset;
  }

  fieldset:first-of-type {
    grid-column: 1 / 3;
    width: 50%;
    justify-self: center;

    & > .MuiFormControl-root {
      width: 100%;
    }
  }

  fieldset:nth-of-type(3) {
    grid-column: 1;
  }
`;
