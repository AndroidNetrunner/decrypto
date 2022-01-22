import { useState } from 'react'
import styled, { css } from "styled-components"

function Login() {
    return (
        <Container>
            <Title>
                Decrypto
            </Title>
            <Form>
                <InputContainer>
                    <label htmlFor="nickname">닉네임</label>
                    <input id="nickname" />
                    <label htmlFor='room'>방 번호</label>
                    <input id='room'/>
                </InputContainer>
                <ButtonContainer>
                    <Button>방 만들기</Button>
                    <Button>참가하기</Button>
                </ButtonContainer>
            </Form>
        </Container>
    )
}
// 제목
// Input 2개
const Button = styled.button`
    background-color: purple;
    color: white;
    margin: 4px;
`;

const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
`;

const ButtonContainer = styled.div`
    dispaly:flex;

`;

const Form = styled.form`
    display:flex;
    flex-direction:column;
    justify-contents:center;
`;

const Title = styled.h1`

`;


const Container = styled.div`
    max-width:860px;
    margin:auto;
`
export default Login;
