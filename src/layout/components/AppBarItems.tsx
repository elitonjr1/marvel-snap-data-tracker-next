import React from "react";
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg'
const AppBarItems = () => {
    return <AppBarItemsDiv>
        <a href="/">
            <CgProfileEdit size="22px"></CgProfileEdit>
        </a>
    </AppBarItemsDiv>
}

export default AppBarItems;

const AppBarItemsDiv = styled.div`

display: flex;
justify-content: flex-end;
align-items: center;
`

const CgProfileEdit = styled(CgProfile) `
    color: black;
`