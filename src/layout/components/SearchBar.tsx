import React from "react";
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';

const SearchBar = () => {
    return <MainSearchBar>
            <DivIcon>
                <MdSearch size="22px"></MdSearch>
            </DivIcon>
            
            <InputSearch type="search" placeholder="Pesquisar..."></InputSearch>
    </MainSearchBar>
}

export default SearchBar;

const InputSearch = styled.input`
    border: 0;
    outline: none;        
    width: 100%;
    background-color: transparent;
    
`

const MainSearchBar = styled.div`
    background-color: #f0f0f0;
    display: flex;
    padding: 5px 10px;
    border-radius: 6px;
    
`

const DivIcon = styled.div`
    margin-right: 8px;
    display: flex;
    align-items: center;
`