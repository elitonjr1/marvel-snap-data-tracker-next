import React from "react";
import styled from 'styled-components';

const Footer = () => {
    return <FooterDiv>
        <Item>
            <Link href="/NewsDetails">News</Link>
        </Item>

        <Item>
            <Link href="/Signup">Sign Up</Link>
        </Item>
        
    </FooterDiv>
}

export default Footer;


const FooterDiv = styled.div`
    padding: 20px 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Link = styled.a`
    color: #000;
    font-size: 12px;
`

const Item = styled.div`
    padding: 20px 0;
    text-align: center;
    margin: 0 15px;
`