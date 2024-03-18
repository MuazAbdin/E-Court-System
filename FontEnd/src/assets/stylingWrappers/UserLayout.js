import styled from "styled-components";

const Wrapper = styled.main`
  width: min(100%, 1124px);
  margin: auto;
  flex-grow: 1;
  overflow-y: scroll;
  /* background-color: var(--background-color-transparent); */
  font-family: var(--main-font);
  padding: 0.5rem;
  padding-bottom: 0;
  display: grid;
  gap: 0.5rem;
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

  & > header {
    grid-area: header;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    background-color: var(--background-color-transparent);
    box-shadow: 0 0 10px var(--text-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.25em;
    color: var(--text-color);

    .welcome-msg {
      text-transform: capitalize;
    }

    .logout-btn {
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-radius: 1rem;
      padding: 0.5rem 1.25rem;
      width: fit-content;
    }
  }

  .content {
    grid-area: content;
    height: 100%;
    padding: 0.5rem;
    overflow-y: scroll;
    border-radius: var(--border-radius);
    background-color: var(--background-color-transparent);
    box-shadow: 0 0 10px var(--text-color);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .section-title {
      font-size: 2.25rem;
      font-family: var(--subtitle-font);
      margin-bottom: 0.5rem;
    }
  }
`;

export default Wrapper;
