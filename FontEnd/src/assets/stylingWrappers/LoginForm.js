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
    border-radius: 16px;
    padding-left: 4vw;
    transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 2%;
 

}
.MuiInputBase-root {
    border-radius: 5px;
    transition: border-color 0.3s;
    margin-bottom: 3vh;
    margin-right: 5vh;
    width: 25vw;
}
.account{
    display: flex;
      flex-direction: column;
      justify-content: center;
    align-items: center;
    justify-items: center;
    
      width: 100%;
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
}
.social-container .social{
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

.or{
    font-family: var(--main-font);
    color: gray;
    margin-bottom: 2%;
    position: relative;
  text-align: center;
}
.or .line-before,
.or .line-after {
  content: '';
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
.signUpLink{
    text-decoration: underline;
    cursor: pointer;
}

.remember-me{
    font-family: var(--subtitle-font);
  align-items: start;
  align-content: start;
  justify-content: start;
  margin-right: 45%;
  padding: 2%;
}
.remember{
    padding: 5%;
}
`

export default Wrapper