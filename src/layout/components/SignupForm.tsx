import React from "react";
import styled from 'styled-components';

const SignupForm = () => {
    return <Container>
                <Title>Cadastre-se</Title>
                <SignupFormContent method="post" action="https://getform.io/f/68af9c99-1479-4b98-b033-bc458a71f75d">
                    <Input className="input" type="text" name="name" id="name" placeholder="Nome" required minLength={2} maxLength={50}></Input>
                    <Input className="input" type="email" name="email" id="email" placeholder="E-mail" required></Input>
                    <Input className="input" type="tel" name="tel" id="tel" placeholder="Telefone" pattern="\([0-9][0-9]\) 9?[0-9]{4}-[0-9]{4}"></Input>
                    <Input className="input" type="password" name="password" id="password" placeholder="Senha" required></Input>
                    <Button type="submit">Confirmar</Button>
                </SignupFormContent>
           </Container>
}

export default SignupForm;

const Title = styled.h1`

    text-align: center;
    font-size: 32px;
        
    @media only screen and (max-width: 600px) {
        text-align: center;
        font-size: 32px;
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;            
    align-items: center;

    @media only screen and (max-width: 600px) {
        margin: 12px;
    }
`

const SignupFormContent = styled.form`

    display: flex;
    flex-direction: column;        
    margin-top: 24px;
    width: 17%;

    @media only screen and (max-width: 600px) {
        display: flex;
        flex-direction: column;        
        margin-top: 24px;
    }
`

const Button = styled.button`

    background-color: purple;
    padding: 8px 16px;
    color: #fff;
    border: none;
    border-radius: 4px;     
    margin-top: 12px;    

    &:hover{
        opacity: 0.8;
        cursor: pointer;
    }


    @media only screen and (max-width: 600px) {
        background-color: purple;
        padding: 8px 16px;
        color: #fff;
        border: none;
        border-radius: 4px;     
        margin-top: 12px;
        &:hover{
            opacity: 0.8;
            cursor: pointer;
        }
    }

`

const Input = styled.input`

        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 8px 16px;        
        &:focus {
            border-color: purple;
            outline: none;
        }
        &:invalid{
        border-color: red;
    }
        &:not(:first-child){
            margin-top: 12px;
        }

        @media only screen and (max-width: 600px) {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 8px 16px;
            &:focus {
                border-color: purple;
                outline: none;
            }
            &:not(:first-child){
                margin-top: 12px;
            }
    }
`