import React from "react";
import { MdSearch } from 'react-icons/md';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLazyQuery, gql } from "@apollo/client";

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchNews, { data, loading }] = useLazyQuery(searchPostQuery);

    const news: SearchResult[] = data 
         ? data.news.data.map(({
            attributes: {
                title,
                slug,
            }
         }: any) => ({
            link: `/news/${slug}`,
            title,
         }))
         : [];


    useEffect(() => {
        searchNews({
            variables: {
                searchInput
            }
        })
    }, [searchInput]);

    return <MainSearchBar>
            <DivIcon>
                <MdSearch size="22px"></MdSearch>
            </DivIcon>
            
            <InputSearch type="search" placeholder="Pesquisar..." value={searchInput} onChange= {event => setSearchInput(event.target.value)}></InputSearch>
            {!loading && searchInput.length > 0 && <div className="search-bar-results">
                <SearchResults results={news} onClickResult= {result => { console.log(result)}}></SearchResults>
            </div>}
    </MainSearchBar>
}

export default SearchBar;

type SearchResult = {
    title: string,
    link: string
}

type SearchResultProps = {
    results: SearchResult[],
    onClickResult: ( searchResult: SearchResult) => void
}

function SearchResults ({ results, onClickResult }: SearchResultProps) {
    return <div className="search-results">
    
    {results.map((result) => <div className="result-item" key={result.link}>
    <a  href={result.link} onClick= {event => {
        event.preventDefault();
        onClickResult(result)
        }}>{result.title}</a>
    </div>)}
    <style jsx>
        {`
        a:hover {
            text-decoration: none;
        }
        .search-results  {
            z-index: 1001;
            background-color: #fff;
            position: absolute;
            top: calc(100% - 4px);
            left: 0;
            border: solid 1px #f0f0f0;
            width: 100%;
            box-sizing: border-box;
            padding-top: 4px;
        }

        .search-results,
        .result-item:last-child {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .result-item {
            padding: 12px;
            font-weight: bold;
        }

        .result-item:not(:last-child){
            border-bottom: solid 1px #f0f0f0;

        }

        .result-item:hover {
            background-color: #f0f0f0;
        }
        `}
    </style>

    </div>


}

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
    position: relative;
    z-index: 1002;
    
`

const DivIcon = styled.div`
    margin-right: 8px;
    display: flex;
    align-items: center;
`

const searchPostQuery = gql`
query SearchPosts ($searchInput: String!) {
  news (filters: {
    or: [{
      title: {
        containsi: $searchInput
      }
      description: {
        containsi: $searchInput
      }
    }]
  }, pagination: {
    limit: 6
  }, sort: ["updatedAt"]) {
    data {
      attributes {
        title,
        slugs
      }
    }
  }
}`