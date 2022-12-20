import React from "react";
import styled from 'styled-components';
import Logo from '../../static/mvsnaplogo.png';
import SearchBar from "./components/SearchBar";
import AppBarItems from "./components/AppBarItems";
import Link from "next/link";

const AppBar = (props:any) => {
    return <Main>
              <Content>
                <Row><a href="/"><LogoSnap src= "https://assets.snap.fan/files/site/snap-logo.93b7933eb47bb8103e26.webp" alt="Logo" /></a></Row>
                <Row>Cards</Row>
                <Row>Decks</Row>
                <Row>News</Row>
                <Row>Meta</Row>
                <Row><SearchBar></SearchBar></Row>
                <Row><AppBarItems></AppBarItems></Row>
              </Content>
            </Main>
}

export default AppBar;

const Main = styled.div`
    background-color: #fff;
    
    border-bottom: 1px solid #ccc;
    
`
const Content = styled.div`
    display: flex;
    align-items: center;    
    height: 64px;
    margin: auto;
    max-width: 960px;    
`

const Row = styled.div`
flex: 1;
`

const LogoSnap = styled.img`
width: 100px;
height: 60px;
margin-top: 5px;
`