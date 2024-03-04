import styled from "styled-components";

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  align-items: stretch;
  border-radius: 1rem;
  font-family: var(--title-font);
  font-size: 1.75rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    box-shadow: 0 0 10px black;
  }

  .brand {
    padding: 0.5rem 0.5rem;
    border-radius: 1rem 0 0 1rem;
    border: 2px solid var(--primary-600);
    background-color: var(--primary-600);
    color: var(--grey-50);
    letter-spacing: 2.5px;
    display: flex;
    align-items: center;
  }

  .name {
    font-size: 2.25rem;
    padding: 0.5rem 0.5rem;
    border: 2px solid var(--primary-600);
    background-color: var(--grey-200);
    color: var(--primary-600);
    border-radius: 0 1rem 1rem 0;
  }
`;

export default Wrapper;
