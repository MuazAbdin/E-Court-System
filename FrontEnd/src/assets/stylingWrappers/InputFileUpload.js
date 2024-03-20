import styled from "styled-components";

const Wrapper = styled.fieldset`
  height: 3rem;
  width: 100%;
  padding: 0 1rem;
  background-color: hsla(214, 32%, 91%, 0.75);
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-600);

  input,
  input:read-only {
    flex-grow: 1;
    background: none;
    color: rgba(0, 0, 0, 0.6);
    font-family: var(--main-font);
    font-size: 1rem;
    color: var(--red-dark);
    cursor: auto;
  }

  input::file-selector-button {
    background-color: transparent;
    font-family: var(--main-font);
    font-weight: 600;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.6);
    border: 2px solid;
    box-shadow: 0 0 10px;
    border-radius: var(--border-radius);
    height: 3rem;
    padding: 0 1rem;
    margin-right: 1rem;
    cursor: pointer;
  }
`;

export default Wrapper;
