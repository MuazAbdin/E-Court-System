import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;

  & > section {
    flex-grow: 1;
    border: 1px solid var(--text-color);
    border-radius: var(--border-radius);
    box-shadow: 0 0 5px var(--text-color);
    padding: 0.5rem 1.5rem;
  }

  .breakdown-form {
    .title {
      font-size: 2rem;
      font-family: var(--subtitle-font);
      margin-bottom: 0.5rem;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      fieldset {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        border: none;

        & > div {
          background-color: var(--grey-200);
          border-radius: var(--border-radius);

          label,
          input {
            font-family: var(--main-font);
          }
        }
      }

      .btn {
        font-size: 1.2rem;
        width: max-content;
      }
    }
  }

  .breakdown-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .title {
      margin-top: 2rem;
      font-size: 1.5rem;
      font-weight: 500;
    }
    .arrow-continer {
      position: absolute;
      width: calc(3rem * 1.2);
      height: calc(3rem * 0.6);
      border-top: none;
      position: absolute;
      top: 0;
      box-shadow: inset 0 0 10px var(--text-color);
      border-radius: 0 0 3rem 3rem;

      .arrow-symbol {
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--background-color);
        color: var(--text-color);
        font-size: 1.5rem;
        position: absolute;
        top: 0;
        transform: translate(10%, -50%);
        border-radius: 50%;
        z-index: 2;
      }
    }

    svg text {
      font-family: var(--main-font) !important;
      fill: var(--text-color) !important;
    }
  }
`;

export default Wrapper;
