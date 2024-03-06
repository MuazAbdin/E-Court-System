import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold; 

`;

const CasesList = styled.div`
  width: 80%;
  margin-top: 20px;
  font-weight: bold; 

`;

const CaseItem = styled.div`
  border: 5px solid #3498db; 
  border-radius: 10px; 
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  background-color: var(--background-color-transparent);
  font-weight: bold; 
`;

const CreateButton = styled.button`
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
  font-weight: bold; 
`;

const EditButton = styled(CreateButton)` 
`;


const Title = styled.h1`
  font-family: Arial;
  font-weight: bold;
  color: var(--highlight-color); 
  margin-top: 25px; 
  font-weight: bold; 
`;

const CaseText = styled.span`
  font-weight: bold; 
`;

const CaseRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border: 5px solid #3498db; 
  border-radius: 10px; 
  padding: 15px;
  margin-bottom: 15px;
  font-weight: bold; 
  background-color: var(--background-color-transparent)

`;

export { Wrapper, CasesList, CaseItem, CaseRow, CreateButton, EditButton, Title, CaseText };
