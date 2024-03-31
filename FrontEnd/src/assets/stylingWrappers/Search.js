import styled from "styled-components";

const Wrapper = styled.main`
/* display: flex; */
z-index: 2;
justify-content: space-between;
.browse{
    margin-top: 3%;

}
.MuiInputBase-root {
    width: 120%;
}
.browse-container {
  position: relative;
}

.filter-options {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
}


.options {
  cursor: pointer;
  padding: 8px;
  transition: background 0.3s ease; 
  width: 17%;
  background-color: var(--primary-400);
  

}
.options-list{
    display: flex;
  align-items: end;
  flex-direction: column;
}
.options:hover {
  background: #eee;
}
.filter-element {
  display: flex;
  align-items: start;
  justify-content: end;
  margin-top: -5%;
  padding-right: 3%;
}
.text{
    padding-top: 0.5%;
}
.text-case{
    font-family: var( --title-font);
    font-size: 30px;
    display: flex;
    align-items: start;
    padding: 3%;
}
`

export default Wrapper