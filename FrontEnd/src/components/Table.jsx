import Wrapper from "../assets/stylingWrappers/Table";

function Table({ tableCaption, tableHeader, children }) {
  return (
    <Wrapper>
      <caption>{tableCaption}</caption>
      <thead
        className="table-head"
        style={{ backgroundColor: "var(--yellow-light)" }}
      >
        <tr>
          {tableHeader.map((h, index) => (
            <th key={`${index}-${h}`}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Wrapper>
  );
}

export default Table;
