import styled from "styled-components";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-family: var(--main-font);
  font-size: 1.25rem;
  border-bottom: 1px solid black;
  box-shadow: 0 1px 15px black;
  background-color: var(--background-color-transparent);
  z-index: 10;

  nav > menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.25rem;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      color: var(--highlight-color);
      font-size: 1.25rem;
      font-weight: 600;
      border: 1px solid transparent;
      border-radius: var(--border-radius);
      padding: 0.5rem;
      transition: var(--transition);
      position: relatives;

      span {
        color: var(--text-color);
      }
    }

    li:hover {
      box-shadow: 0 0 5px var(--text-color);
    }
  }

  .services-list {
    display: ${(props) => props.display};
    flex-direction: column;
    position: absolute;
    bottom: 0;
    transform: translate(-20%, 90%);
    background-color: var(--background-color);
    border-radius: var(--border-radius);

    li {
      font-size: 1.2rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      text-transform: capitalize;
    }
  }

  .theme-btn {
    padding: 0;
    border-radius: 50%;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 3rem;
    font-family: var(--title-font);
    font-size: 2rem;
    color: #ee94a9;
    background-color: white;
    padding: 0 1rem;
    border-radius: 0.5rem;
  }

  .logo:hover {
    cursor: pointer;
    box-shadow: 0 0 5px black;
  }

  img {
    height: 90%;
  }
`;

export default Wrapper;
