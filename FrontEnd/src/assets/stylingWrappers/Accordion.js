import styled from "styled-components";

const Wrapper = styled.menu`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  font-size: 1.25em;
  text-transform: capitalize;

  .accordion-item {
    color: var(--highlight-color);
    &.open {
      box-shadow: 0 0 10px var(--text-color);
    }

    /* &:has(.active) .accordion-item__title {
      background-color: var(--highlight-background-color);
    } */
  }

  .accordion-item__title {
    font-size: 1.25em;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.75rem;
    border-top: 1px dashed var(--highlight-color);
    border-bottom: 1px dashed var(--highlight-color);

    &:hover,
    &.open {
      background-color: var(--highlight-background-color);
    }

    span {
      font-size: 1.25rem;
      flex-grow: 1;
      text-align: justify;
    }
  }

  .accordion-item__subsections {
    list-style-type: disclosure-closed;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* gap: 0.5rem; */
    font-size: 1.25rem;
    text-transform: capitalize;
    text-align: justify;

    li {
      padding: 0.5rem;
    }

    li:hover,
    li:has(> .active) {
      background-color: var(--highlight-background-color);
    }
  }

  a:visited {
    text-decoration: none;
    color: var(--highlight-color);
  }

  .active {
    /* background-color: var(--yellow-light); */
    text-decoration: underline;
    /* font-weight: 500; */
  }

`;

export default Wrapper;
