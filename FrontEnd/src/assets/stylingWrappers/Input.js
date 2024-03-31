import styled from "styled-components";

const Wrapper = styled.fieldset`
  .MuiFormControl-root {
    background-color: hsla(214, 32%, 91%, 0.75);
    border-radius: var(--border-radius);

    label,
    input {
      font-family: var(--main-font);
      /* text-transform: capitalize; */
    }

    label > span {
      color: var(--red-dark);
    }

    /* input, */
    .MuiSvgIcon-root {
      color: var(--primary-600);
    }
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export default Wrapper;
