import styled from "styled-components";

const Wrapper = styled.fieldset`
  font-size: 1.2rem;
  font-weight: 600;
  position: absolute;
  right: 2.5rem;
  top: 2.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  svg {
    font-size: 1.75rem;
    color: ${(props) => props.color};
    cursor: pointer;
  }
`;

export default Wrapper;
