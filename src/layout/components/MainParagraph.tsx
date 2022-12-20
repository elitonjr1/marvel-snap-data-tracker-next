import React, { useEffect } from "react";
import styled from 'styled-components';
import Link from "next/link";

export type HeaderProps = {
    title: string;
    description: string;
}



const MainParagraph = ({title, description} : HeaderProps) => {

    return <Header>
        
       <Title className="item">
            <h4>
                {title}
            </h4>
        </Title> 
       <Description className="item">
            <p>
                {description}
            </p>
        </Description>
    </Header>
}

export default MainParagraph;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`
const Title = styled.div`
    word-wrap: break-word;
    font-family: 'Ultimatum Heavy Italic,Helvetica Neue,Arial,Sans-Serif';
    line-height: 1.2;
    word-break: break-word;
    font-size: calc(1.375rem + 1.5vw);
    @media only screen and (max-width: 600px) {
        font-size: 20px;
    }
`
const Description = styled.div`
    align-items: center;
    @media only screen and (max-width: 600px) {
        font-size: 15px;
        justify-content: center;
        padding: 10px 25px;
    }
    
`