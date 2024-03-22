import styled from "styled-components";

const Wrapper = styled.main`
  flex-grow: 1;
  overflow-y: scroll;
  border-radius: var(--border-radius);
  background-color: var(--background-color-transparent);
  box-shadow: 0 0 10px var(--text-color);
  font-family: var(--main-font);
  padding: 2rem;
  margin: 1rem;
  font-size: 1.25rem;
  line-height: 1.2;

  .title {
    font-size: 1.75rem;
    font-family: var(--subtitle-font);
    margin-bottom: 0.5rem;
  }
`;

export default Wrapper;
