import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold; 

  .title {
    width: 80%;
    margin-top: 20px;
    font-weight: bold; 
  }

  .create-button {
    margin-top: 20px;
    margin-right: 25px; 
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px; 
    padding: 12px 25px;
    font-size: 16px; 
    font-weight: bold; 
    cursor: pointer;
    align-self: flex-end; 
  }

  .edit-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px; 
    padding: 12px 25px;
    font-size: 16px; 
    font-weight: bold; 
    cursor: pointer;
  }

  .title {
    font-family: Arial;
    font-weight: bold;
    color: var(--highlight-color); 
    margin-top: 25px; 
    font-weight: bold; 
  }

  .case-text {
    font-weight: bold; 
  }

  .case-row {
    display: flex;
    justify-content: space-between;
    border: 5px solid #3498db; 
    border-radius: 10px; 
    padding: 15px;
    margin-bottom: 15px;
    font-weight: bold; 
    background-color: var(--background-color-transparent);
    align-items: center;
    width: 80%; 
  }
`;

export { Wrapper };
