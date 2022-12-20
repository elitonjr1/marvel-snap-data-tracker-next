import React from "react";
import styled from 'styled-components';
import { v4 } from "uuid";
import Image from 'next/image';
import Link from "next/link";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";


export type NewsProps = {
    items: NewsItemProps[];
    pagination?: PaginationProps
}

export type NewsItemProps = {
    title: string;    
    autor: string;
    postDate: string;
    image: string;
    index: number;
    slug: string;
}

export type PaginationProps = {
    pageCount: number,
    currentPage: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean

}

const News = ( {items, pagination} : NewsProps ) => {
    return <Feed>       
        <div><TitleHeader>News</TitleHeader> </div>
        <FeedList>        
            {items.map((item) => <Item key={v4()} {...item} />)}            
        </FeedList>
        {pagination && <Pagination {...pagination} />}
    </Feed>
}

export default News;

const Item = ({ title, autor, postDate, image, slug } : NewsItemProps) => {
    return <LinkA href={`/${slug}`} >
        <Img src={image} alt={title}></Img>
    </LinkA>
}

function Pagination({
    currentPage,
    hasNextPage,
    hasPreviousPage,
    pageCount,
  }: PaginationProps) {
    return (
      <div className="pagination">
        <div className="pagination-desktop">
          {Array.from(
            { length: Math.ceil(pageCount) },
            (_, index) => index + 1
          ).map((page) => {
            if (page === currentPage) {
              return (
                <span key={page} className="pagination-link current-page">
                  {page}
                </span>
              );
            }
  
            return (
              <LinkA
                href={page === 1 ? "/" : `/pages/${page}`}
                key={page}
                className="reset-anchor"
                title={`Ir para a página ${page}`}
              >
                <span className="pagination-link">{page}</span>
              </LinkA>
            );
          })}
        </div>
        <div className="pagination-mobile">
          {hasPreviousPage && (
            <LinkA
              href={
                currentPage - 1 === 1 ? "/" : `/pages/${currentPage - 1}`
              }
              className="reset-anchor"
              title="Voltar uma página"
            >
              <span className={"pagination-link"}>
                <MdArrowLeft size="32px" aria-label="Página anterior" />
              </span>
            </LinkA>
          )}
          {hasNextPage && (
            <LinkA
              href={`/pages/${currentPage + 1}`}
              className="reset-anchor"
              title="Avançar para a próxima página"
            >
              <span className={"pagination-link"}>
                <MdArrowRight size="32px" aria-label="Próxima página" />
              </span>
            </LinkA>
          )}
        </div>
        <style jsx>{`
          .pagination-desktop {
            display: none;
          }
          .pagination-mobile {
            display: flex;
          }
          @media (min-width: 600px) {
            .pagination-desktop {
              display: flex !important;
            }
            .pagination-mobile {
              display: none !important;
            }
          }
          .pagination-desktop,
          .pagination-mobile {
            justify-content: center;
            margin-top: 1em;
            margin-bot: 1em;
          }
          .pagination-link {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: red;
            margin: 1em;
            width: 36px;
            height: 36px;
            border-radius: 18px;
            background-color: #ccc;
            font-size: 12px;
          }
          .current-page {
            background-color: #003366;
            color: #fff;
          }
          .pagination-link:hover {
            opacity: 0.5;
          }
        `}</style>
      </div>
    );
  }

const Feed = styled.div`
    max-width: 960px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 100px 0;
    height: 300px;

    @media only screen and (max-width: 600px) {
        max-width: 960px;
        justify-content: inherit;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        padding: 32px 20px;
    }
`
const FeedList = styled.div`
    display: flex;
    gap: 8px;   

    a:first-of-type {
        width: 70%;
        height: 100%;
    }

    a:nth-child(n+2) {
        width: 30%;
        height: 50%;
    }

    @media only screen and (max-width: 600px) {
        display: grid;
        gap: 5px;
        grid-template-columns: repeat(1, 1fr);  

        a:first-of-type {
        width: 100%;
        height: 100%;
    }

    a:nth-child(n+2) {
        width: 100%;
        height: 100%;
    }
    }

`

const LinkA = styled(Link)`
    border: 1px solid purple;
    border-radius: 5px;
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    display: block;
`
const TitleHeader = styled.h2`
    word-wrap: break-word;
    font-family: 'Ultimatum Heavy Italic,Helvetica Neue,Arial,Sans-Serif';
    line-height: 1.2;
    word-break: break-word;
    font-size: calc(1.375rem + 1.5vw);    
`

