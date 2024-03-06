import styled from "styled-components";

const Wrapper = styled.main`
  width: min(100%, 1024px);
  margin: auto;
  flex-grow: 1;
  overflow-y: scroll;
  /* background-color: var(--background-color-transparent); */
  font-family: var(--main-font);
  padding: 1rem;
  padding-bottom: 0;
  display: grid;
  gap: 1rem;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "aside header"
    "aside content";
  justify-items: stretch;
  align-items: flex-start;

  a:link {
    text-decoration: none;
    color: var(--text-color);
  }
`;

export default Wrapper;
