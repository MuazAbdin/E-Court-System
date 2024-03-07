import styled from "styled-components";

const Wrapper = styled.main`
flex-grow: 1;
display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
   
form{
    background-color: var(--background-color-transparent);
    height: 85%;
    width: 40%;
    padding: 2%;
    margin-top: 2%;
    margin-bottom: 2%;
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
    background-color: #f2eee3;
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

#case-dropdown-label{
    /* align-items: start;
    justify-content: start;
    justify-items: start; */
    margin-right: 43%;
    margin-top: 1%;
    margin-bottom: 1%;
}
.MuiButtonBase-root{
    background-color: transparent;
}
#case-dropdown{
    display: flex;
    justify-content: start;
    width: 100%;
}

.address-container,
.details-container{
    display: flex;
    column-gap: 5%;
    /* width: 30%; */
}
.address-container .MuiInputBase-root,
.details-container .MuiInputBase-root {
    width: 15vw;
}

.requirement-container .MuiInputBase-root{
    width: 25vw;
    /* height: 20lvh; */
}
#case-dropdown{
    width: 50vw;
}
.submit-btn{
    /* display: flex; */
    margin-left: 22lvw;
    width: 10vw;
    margin-top: 8%;
    margin-bottom: 2%;
}
`
export default Wrapper