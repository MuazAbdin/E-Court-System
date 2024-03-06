import styled from "styled-components";

const Wrapper = styled.aside`
  grid-area: aside;
  height: calc(100% - 1rem);
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--background-color-transparent);
  box-shadow: 0 0 10px var(--text-color);
`;

export default Wrapper;
