import styled from "styled-components";
import Forms from "../../components/Forms";

export const StyledForms = styled(Forms)`
  display: grid;
  align-content: start;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  font-family: var(--main-font);
  font-size: 1.65rem;
  line-height: 1.2;

  .title {
    font-size: 2rem;
    font-family: var(--subtitle-font);
    grid-column: 1 / 3;
    padding-bottom: 1rem;
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

  input:disabled {
    cursor: not-allowed;
    background-color: var(--grey-400);
  }
`;
