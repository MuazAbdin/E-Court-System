import styled from "styled-components";

const Wrapper = styled.table`
  width: 100%;
  font-size: 1.15rem;
  line-height: 1.5;
  text-align: center;
  text-transform: capitalize;
  counter-reset: rowNumber;

  caption {
    font-family: var(--subtitle-font);
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
  }

  .table-head th {
    /* background-color: var(--highlight-background-color); */
    color: var(--primary-600);
    border-top: 1.5px dashed;
    border-bottom: 1.5px dashed;
  }

  tr:nth-child(even) {
    background-color: var(--highlight-background-color);
  }
  tr:not(:has(th)):hover {
    background-color: var(--background-secondary-color);
  }
  tr:not(:has(th))::before {
    display: table-cell;
    counter-increment: rowNumber;
    content: counter(rowNumber) ".";
    /* padding-right: 0.3rem; */
    /* text-align: right; */
  }

  a:link {
    font-weight: bold;
    cursor: pointer;
  }

  .accept,
  .reject {
    font-size: 1.5rem;
    cursor: pointer;
    text-align: center;
    line-height: 1;
  }

  .accept {
    background-color: var(--green-light);
    color: var(--green-dark);
  }

  .reject {
    background-color: var(--red-light);
    color: var(--red-dark);
  }
`;

export default Wrapper;
