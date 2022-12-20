import React from "react";
import AppBar from './AppBar';
import Footer from "./Footer";
import styled from "styled-components";



export type LayoutProps = {
    children: any;
}

const Layout = (props : LayoutProps) => {
    return <div className="layout">
        <nav>
            <AppBar/>
        </nav>
        <main>{props.children}</main>
        <footer>
            <Footer></Footer>
        </footer>
    </div>
}

export default Layout;

const Content = styled.main`
    max-width: 960px;
    margin: auto;
`