import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useZorm } from "react-zorm";
import { baseUserSchema, BaseUserSchema } from "../../users/schemas/baseUserSchema";
import { z, ZodIssue } from 'zod';
import useAxios from "axios-hooks";
import { MdHourglassBottom, MdHourglassTop } from "react-icons/md";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { signIn } from 'next-auth/react';
import { passwordSchema } from "../../users/schemas/base/passwordSchema";

const texts = {
    title: "Criar conta",
    submit: "Enviar",
    passwordMatchError: "As senhas são diferentes",
    submitSuccess: "Conta criada com sucesso",
    submitFailure: "Houve um erro ao criar sua conta",
  };


function LoadingIndicator() {
    const [top, setTop] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => setTop(!top), 500);
        return () => clearTimeout(timeoutId);
    }, [top])

    return top ? <MdHourglassTop size="16px" color= "#2139e0" /> : <MdHourglassBottom size="16px" color= "#2139e0" />
}

const signupSchema = baseUserSchema.extend({
    password: passwordSchema,
    confirmPassword: z.string().min(0),
}).refine(({ password, confirmPassword }) => password === confirmPassword, { message: texts.passwordMatchError, path: ['confirmPassword'] } )

const SignupForm = () => {    

    const [{ data, loading }, execute] = useAxios<{user: {id: number}; errors: ZodIssue[] }, BaseUserSchema>({
        url: '/api/signup',
        method: 'POST'
    }, {
        manual: true
    });

    const { ref, fields, errors, validation } = useZorm("signup", signupSchema, {
        customIssues: data?.errors,
        async onValidSubmit(event) {            
            event.preventDefault();            
            const { data } = await execute({
                data: event.data,
            });

            if(data.user){
                toast(texts.submitSuccess);
                signIn('credentials', {
                    username: event.data.email,
                    password: event.data.password,
                })
            } else {
                toast(texts.submitFailure);
            }

        }
    });

    const disabled = validation?.success === false || loading;

    return <Container>
                <Title>{texts.title}</Title>
                <SignupFormContent noValidate ref={ref}>
                    <Input className={`input ${errors.name("error")}`} type="text"  id="name" placeholder="Nome" name={fields.name()} disabled={loading}></Input>
                    {errors.name((error) => (<ErrorMessage message={error.message}/>))}

                    <Input className={`input ${errors.email("error")}`} type="email"  id="email" placeholder="E-mail" name={fields.email()} disabled={loading}></Input>                    
                    {errors.email((error) => (<ErrorMessage message={error.message}/>))}

                    <Input className={`input ${errors.password("error")}`} type="password" id="password" placeholder="Senha" name={fields.password()} disabled={loading}></Input>
                    {errors.password((error) => (<ErrorMessage message={error.message}/>))}

                    <Input className={`input ${errors.password("error")}`} type="password" name={fields.confirmPassword()} id="confirmPassword" placeholder="Confirmar Senha" disabled={loading}></Input>
                    {errors.confirmPassword((error) => (<ErrorMessage message={error.message}/>))}

                    <Button disabled={disabled} type="submit"> {loading ? <LoadingIndicator /> : texts.submit}</Button>
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