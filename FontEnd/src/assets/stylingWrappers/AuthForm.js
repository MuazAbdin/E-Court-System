import styled from "styled-components";

const Wrapper = styled.main`
.auth-form {
    transform-style: preserve-3d;
  transition: transform 0.6s;
}

.auth-form.flipped {
  transform: rotateY(180deg);
}

.auth-form.flipped .auth-form-content {
  transform: rotateY(180deg);
}
`

export default Wrapper