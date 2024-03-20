import styled from "styled-components";
import InputSelect from "../../components/InputSelect";

const StyledInputSelect = styled(InputSelect)`
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
`;

export default StyledInputSelect;
