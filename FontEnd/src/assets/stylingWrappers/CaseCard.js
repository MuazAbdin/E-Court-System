import styled from "styled-components";

const Wrapper = styled.main`
    display: grid;
    flex-direction: row;
    
.cards{
    padding-left: 3%;
    padding-right: 3%;
    display: grid;
    gap: 20px 20px;
    grid-template-columns: repeat(4, 1fr);
}
.create-new{
    display: flex;
    width: 100%;
    height: 100%;
    margin-left: 3%;
    
}
.create-new-case-text{
    font-family: var(--subtitle-font);
    margin-bottom: 8%;
    padding-top: 5%;
    font-size: 20px;
}
.MuiPaper-root{
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    padding-left: 2%;
    padding-right: 2%;
}
.new-case-btn{
    background-color: var(--primary-300);
    width: 100%;
    border-radius: 50%;
    margin-top: 10%;
}
.link-btn{
    text-decoration: underline;
    color: var(--primary-600);

}
.link-btn .MuiCardActions-root,
.link-btn .MuiButtonBase-root{
    font-family: var(--main-font);
    color: var(--primary-600);
}
.MuiCardActions-root{

}
`
export default Wrapper