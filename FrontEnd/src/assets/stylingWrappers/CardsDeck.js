import styled from "styled-components";

const Wrapper = styled.section`
  border: 1px solid var(--text-color);
  border-radius: var(--border-radius);
  box-shadow: 0 0 5px var(--text-color);
  padding: 0.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 0.5rem;
  position: relative;

  .arrows {
    font-size: 1.5rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 3px;
    color: var(--text-color);
    background-color: var(--background-color-transparent);
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 10;
  }

  .left {
    left: 0;
  }
  .right {
    right: 0;
  }

  .title {
    /* align-self: flex-start; */
    font-size: 1.5rem;
    font-weight: 600;
  }

  .cards-container {
    /* display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr)); */
    display: flex;
    gap: 1rem;
    position: relative;
    overflow-x: hidden;

    menu {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1rem;
      position: relative;

      li {
        flex: 0 0 7rem;
      }
    }

    .card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;

      color: var(--grey-900);
      font-weight: 500;
      text-transform: capitalize;
      background-color: var(--grey-300);
      border-radius: 0.5rem;

      div {
        padding: 0.5rem;
      }

      .date {
        border-radius: 0.5rem 0.5rem 0 0;
        border: none;
        background-color: var(--red-dark);
        color: var(--grey-300);
      }

      .time {
        border-radius: 0 0 0.5rem 0.5rem;
        border: 2px solid var(--red-dark);
        background-color: var(--grey-300);
        color: var(--red-dark);
      }

      .event {
        color: var(--primary-600);
        border-top: 2px dashed var(--primary-600);
        font-weight: 600;
        font-size: 1.2rem;
      }
    }
  }
`;

export default Wrapper;
