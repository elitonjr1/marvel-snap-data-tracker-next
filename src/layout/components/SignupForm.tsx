import React from "react";
import styled from 'styled-components';
import { useZorm } from "react-zorm";
import { userSchema, UserSchema } from "../../auth/schemas/userSchema";
import { z } from 'zod';
import useAxios from "axios-hooks";

const signupSchema = userSchema.extend({
    confirmPassword: z.string().min(0),
}).refine(({ password, confirmPassword }) => password === confirmPassword, { message: 'As senhas são diferentes.', path: ['confirmPassword'] } )

const SignupForm = () => {

    const [{}, execute] = useAxios<UserSchema, UserSchema>({
        url: '/api/signup',
        method: 'POST'
    }, {
        manual: true
    });

    const { ref, fields, errors, validation } = useZorm("signup", signupSchema, {
        onValidSubmit(event) {
            event.preventDefault();            
            execute({
                data: event.data,
            });

        }
    });

    const disabled = validation?.success === false;

    return <Container>
                <Title>Cadastre-se</Title>
                <SignupFormContent noValidate ref={ref}>
                    <Input className={`input ${errors.name("error")}`} type="text"  id="name" placeholder="Nome" name={fields.name()}></Input>
                    {errors.name((error) => (<ErrorMessage message={error.message}/>))}

                    <Input className={`input ${errors.email("error")}`} type="email"  id="email" placeholder="E-mail" name={fields.email()}></Input>                    
                    {errors.email((error) => (<ErrorMessage message={error.message}/>))}

                    <Input className={`input ${errors.password("error")}`} type="password" id="password" placeholder="Senha" name={fields.password()}></Input>
                    {errors.password((error) => (<ErrorMessage message={error.message}/>))}

                    <Input className={`input ${errors.password("error")}`} type="password" name={fields.confirmPassword()} id="password" placeholder="Confirmar Senha"></Input>
                    {errors.confirmPassword((error) => (<ErrorMessage message={error.message}/>))}

                    <Button disabled={disabled} type="submit">Criar Conta</Button>
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

function ErrorMessage({ message }: { message: string }) {
    return (
      <span className="error">
        {message}
        <style jsx>{`
          .error {
            color: #f11212;
            font-size: 10px;
          }          
        `}</style>
      </span>
    );
  }