import styled from "styled-components";

const Wrapper = styled.footer`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-family: var(--main-font);
  font-size: 1rem;
  border-top: 1px solid black;
  box-shadow: 0 -1px 15px black;
  color: var(--text-color);
  background-color: var(--background-color-transparent);
`;

export default Wrapper;
