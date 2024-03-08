import styled from "styled-components";

const Wrapper = styled.main`
flex-grow: 1;
display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
   
form{
    background-color: var(--background-color-transparent);
    height: 90%;
    width: 70%;
    padding: 2%;
    margin-top: 7%;
    margin-bottom: 5%;
    border-radius: 16px;
    padding-left: 4vw;
    transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 10px rgba(0, 0, 0, 0.2);
}
p{
    padding: 4vh;
    font-family: var(--subtitle-font);
}
button{
    height: 7lvh;
    width: 40%;
    font-family: var(--subtitle-font);
    font-size: 20px;
    background-color: var(--primary-400);
    border-radius: 18px;
    margin-top: 5%;
}
h2{
    font-family: var(--title-font);
    margin-bottom: 8%;
    padding-top: 5%;
    font-size: 50px;
}

.document-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-items: center;
    width: 100%;
}
.MuiInputBase-root {
    border-radius: 5px;
    transition: border-color 0.3s;
    margin-bottom: 3vh;
    margin-right: 5vh;
    width: 18vw;
}
#demo-error-radios{
    margin-right: 50%;
    height: 10%;
    margin-top: -50px;
}
.status{
    margin-top: -2%;
}
.description .MuiInputBase-root{
    width: 25vw;
}
.MuiFormGroup-root{
    margin-left: 21%;
    margin-bottom: 2%;
    padding-left: 2%;
}
button{
    height: 7lvh;
    width: 30%;
    font-family: var(--subtitle-font);
    font-size: 20px;
    background-color: var(--primary-300);
    margin-left: 65%;
}
.MuiButtonBase-root{
    background-color: transparent;
}
.court-container{
    display: flex;
    column-gap: 10%;
    padding-right: 10%;
}
.court-container .MuiInputBase-root {
    width: 15vw;
}
`
export default Wrapper