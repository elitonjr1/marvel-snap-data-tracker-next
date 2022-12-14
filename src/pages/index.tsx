import Head from 'next/head'
import Image from 'next/image'
import MainParagraph from '../layout/components/MainParagraph'
import News, { NewsItemProps, PaginationProps } from '../layout/components/News'
import { NewsProps } from '../layout/components/News'
import Layout from '../layout/Layout'
import styles from '../styles/Home.module.css'
import { HeaderProps } from '../layout/components/MainParagraph'
import type { GetStaticProps } from 'next'
import axios from 'axios'
import {v4} from 'uuid';
import { apolloClient, gql } from '../apolloClient'
import { useSession } from 'next-auth/react';

export type ItemsProps = {
  news: NewsProps['items'];
  pagination: NewsProps['pagination'];
}

export default function Home({ news, pagination } : ItemsProps) {  
  const { data, status } = useSession();
  return <div>
              <header>
                <MainParagraph title='' description=''></MainParagraph>
              </header>
              <div className='container'>        
                <News items={news} pagination={pagination}/>
              </div>
          </div>
          
}


export const getStaticProps : GetStaticProps = async () => {
   
   const result = await apolloClient.query({
    query: gql`
    query{
      news (pagination: {
        pageSize: 3,
        page: 1
      }) {
        meta {
          pagination {        
            page        
            pageCount
          }
        }
        data {
          attributes{
            title
            description
            publishDate
            slug
            image {
              data {
                attributes {
                  url
                }
              }
            }
            
          }
        }
      }
    }`
   }); 
  

  const news : NewsProps['items'] = result.data.news.data.map(({ attributes : {title, publishDate, slug, image:{ data:{ attributes: { url }}}}} : any) => ({
    title: title,
    autor: 'Sykzera',
    postDate: publishDate,
    image: `https://webservices.jumpingcrab.com${url}`,
    index: '1',
    slug: `news/${slug}`
  }));

  const { page : currentPage, pageCount } = result.data.news.meta.pagination;

   return {
    props: {
      news,
      pagination: {
        pageCount,
        currentPage,
        hasNextPage: pageCount > currentPage,
        hasPreviousPage: false
      }
    }
  }
}