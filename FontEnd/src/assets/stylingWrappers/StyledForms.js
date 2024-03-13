import styled from "styled-components";
import Forms from "../../components/Forms";

export const StyledForms = styled(Forms)`
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
z-index: 3;
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
  .court-judge{
   
  }
.court-judge #court-dropdown-label,
 .court-judge .MuiInputBase-root,
 .court-judge #case-dropdown,
 .court-judge #judge-dropdown-label,
 .court-judge #stakeholder-dropdown-label{
    width: 100%;
    display: flex;
    align-items: start;
    align-content: start;
    justify-items: start;
    background-color: hsla(214, 32%, 91%, 0.75);
    border-radius: var(--border-radius);
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
  .pdf-btn {
    grid-column: 1 / 3;
    padding-top: 1.5rem;
    height: fit-content;
    width: 20%;
    justify-self: end;
    padding: 0.75rem 0;
    font-size: 1rem;
    font-weight: 500;
    margin-top: 2%;
    margin-bottom: 2%;
    font-family: var(--main-font);
    background-color: var(--primary-400);
    border-radius: var(--border-radius);
  }
  .btn:disabled {
    cursor: not-allowed;
    background-color: var(--grey-500);
  }

  input:disabled {
    cursor: not-allowed;
    background-color: var(--grey-400);
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