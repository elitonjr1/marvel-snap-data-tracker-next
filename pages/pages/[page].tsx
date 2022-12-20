import type { GetStaticPaths, GetStaticProps } from "next";
import News from "../../src/layout/components/News";
import { NewsProps } from "../../src/layout/components/News";
import { apolloClient, gql } from "../../src/apolloClient";
import NewsDetailsView from "../../src/layout/components/NewsDetailsView";
import styled from "styled-components";

export type NewPageProps = {
    news: NewsProps['items'];
    pagination: NewsProps['pagination'];
}

export type NewPageQuery = {
    new: string;
}


export default function PostPage( { news, pagination } : NewPageProps) {  
    return <News items={news} pagination={pagination}></News>
                
           
}

export const getStaticProps: GetStaticProps<NewPageProps, NewPageQuery> = async ({ params }) => 
{
    const result = await apolloClient.query({
        query: gql`
        query{
            news (pagination: {
                pageSize: 3,
                page: ${params?.new ?? 2}
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
    })

    
    const news : NewsProps['items'] = result.data.news.data.map(({ attributes : {title, slug, image:{ data:{ attributes: { url }}}}} : any) => ({
        title,
        autor: '',
        postDate: '',
        image: `https://webservices.jumpingcrab.com${url}`,
        index: '',
        slug: `/news/${slug}`        
      }));
      
     
      const { page : currentPage, pageCount } = result.data.news.meta.pagination;
    

      return {
        props: {
          news,
          pagination: {
            pageCount,
            currentPage,
            hasNextPage: pageCount > currentPage,
            hasPreviousPage: currentPage > 1
          }
        }
      }
}

export const getStaticPaths: GetStaticPaths<NewPageQuery> = async () => {
    const result = await apolloClient.query({
        query: gql`
        query{
            news (pagination: {
              pageSize: 3,
              page: 1
            }) {
              meta {
                pagination {        
                    pageCount
                }
              }   
            }
          }`          
    });

    const { data: { news: { meta: { pagination: { pageCount } } } } } = result;

    const newsPage : string[] = Array.from({ length: pageCount }, (_, index) => (index + 1).toString());

    return {
        paths: newsPage.map(page => ({ params: { page } })),
        fallback: false
    }
}

const NewsPage = styled.div``