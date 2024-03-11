import styled from "styled-components";

const Wrapper = styled.main`
  flex-grow: 1;
  overflow-y: scroll;

  /* ---- FLIPPING ---- */
  .flip-card {
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
  }

  /* This container is needed to position the front and back side */
  .flip-card-inner {
    position: relative;
    /* width: 100%;
    height: 100vh; */
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  /* Do an horizontal flip */
  .flip-card-inner.flipped {
    transform: rotateY(180deg);
  }

  /* Position the front and back side */
  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    /* height: 100%; */
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  .flip-card-back {
    transform: rotateY(180deg);
  }

  .active {
    z-index: 10;
  }
  /* ------------------ */

  .auth-forms-container {
    width: 750px;
    height: 100vh;
    margin: 2rem;
    margin-right: auto;
  }

  .nsm7Bb-HzV7m-LgbsSe-Bz112c {
    font-family: var(--main-font);
    font-size: 1.5rem;
  }

  .user-role {
    grid-column: 1 / 3;
    padding-bottom: 1rem;
    border-bottom: 1px dashed;
    border-top: 2px solid;

    legend {
      padding: 1rem;
      /* text-align: justify; */
      font-size: 1.5rem;
    }

    .d-selector {
      flex-grow: 1;
      width: 50%;
      color: var(--primary-600);
      padding: 0.5rem;
      background-color: hsla(214, 32%, 91%, 0.75);
      border-radius: var(--border-radius);

      &:hover {
        box-shadow: 0 0 5px var(--text-color);
      }

      &:has(> input:checked) {
        color: var(--red-dark);
        font-weight: 600;
        box-shadow: 0 0 5px var(--text-color);
      }

      input {
        display: none;
      }

      label {
        text-transform: capitalize;
        display: block;
        width: 100%;
        cursor: pointer;
        font-size: 1.25rem;
      }
    }
  }
`;

export default Wrapper;
