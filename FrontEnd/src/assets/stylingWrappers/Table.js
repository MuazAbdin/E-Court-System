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
`;

export default Wrapper;
