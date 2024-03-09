import styled from "styled-components";

const Wrapper = styled.section`
  transition: transform 0.6s;
  transform-style: preserve-3d;

  .register-form-navigator {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    /* gap: 1rem; */

    li:not(:last-child) {
      padding: 0.75rem 1.5rem;
      border-right: 2px solid var(--text-color);
      border-bottom: 2px solid var(--text-color);
      border-radius: 0 1rem 0 0;
      cursor: pointer;
      text-transform: capitalize;

      &:hover {
        /* box-shadow: 3px 0 5px var(--text-color); */
        font-weight: 500;
        color: blue;
        border-bottom: none;
        /* background-color: var(--background-color-transparent); */
      }
    }

    li:last-child {
      flex-grow: 1;
      border-bottom: 2px solid var(--text-color);
    }
  }

  form {
    padding: 1.5rem;
  }

  .MuiInputBase-root {
    border-radius: 5px;
    transition: border-color 0.3s;
    margin-bottom: 3vh;
    /* margin-right: 5vh; */
    width: 15vw;
  }
  p {
    padding: 5vh;
    font-family: var(--subtitle-font);
  }
  button {
    height: 7lvh;
    width: 40%;
    font-family: var(--subtitle-font);
    font-size: 20px;
    background-color: #f2eee3;
    border-radius: 18px;
    margin-top: 5%;
  }
  .title {
    font-size: 2rem;
    font-family: var(--title-font);
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  .social-container .social {
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5vh;
    margin-right: 2vw;
    height: 50px;
    width: 50px;
    background: #f2eee3;
    cursor: pointer;
  }

  .or {
    font-family: var(--main-font);
    color: gray;
    margin-bottom: 2%;
    position: relative;
    text-align: center;
  }
  .or .line-before,
  .or .line-after {
    content: "";
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background-color: gray;
  }

  .or .line-before {
    left: 0;
  }

  .or .line-after {
    right: 0;
  }

  .signUpLink {
    text-decoration: underline;
    cursor: pointer;
  }
  .account-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
    width: 100%;
    font-family: var(--subtitle-font);
  }
  .full-name,
  .password-container,
  .contact-container,
  .address-container {
    display: flex;
    column-gap: 10%;
  }
  .eye-icon {
    background-color: transparent;
    margin-left: 50%;
  }
`;

export default Wrapper;
