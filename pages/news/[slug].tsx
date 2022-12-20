import type { GetStaticPaths, GetStaticProps } from "next";
import News from "../../src/layout/components/News";
import { NewsProps } from "../../src/layout/components/News";
import { apolloClient, gql } from "../../src/apolloClient";
import NewsDetailsView from "../../src/layout/components/NewsDetailsView";
import styled from "styled-components";
import { NewsViewProps } from "../../src/layout/components/NewsDetailsView";

import { remark } from 'remark';
import html from 'remark-html';

export type NewProps = {
    news: NewsViewProps['items'];
}
export type NewPageQuery = {
    slug: string;
}


export default function NewPage( { news } : NewProps) {  
    
    return <NewsPage>        
        {news.map((item) => <NewsDetailsView  title={item.title} description= {item.description} publishDate= {item.publishDate} image= {item.image} />)}
        </NewsPage>
                
           
}

export const getStaticProps: GetStaticProps = async ({ params }) => 
{    
    const result = await apolloClient.query({
        query: gql`
        query{
  news(filters:{
    slug: {
      eq: "${params?.slug ?? ``}"
    }
  }) {
    data {
      attributes {
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

    const news : NewsProps['items'] = result.data.news.data.map(({ attributes : {title, description, publishDate, slug, image:{ data:{ attributes: { url }}}}} : any) => ({
        title: title,
        autor: 'Sykzera',
        description: description,
        postDate: publishDate,
        image: `https://webservices.jumpingcrab.com${url}`,
        index: '1',
        slug: `news/${slug}`
      }));
    

      return {
        props: {
            news
        }
      }
}

export const getStaticPaths: GetStaticPaths<NewPageQuery> = async () => {
    const result = await apolloClient.query({
        query: gql`
        query{            
            news {
                data {
                attributes {
                    slug
                }
                }
            }
            }`          
    });

    const { data: { news: { data: newsSlugs, } } } = result;

    const slugs : string[] = newsSlugs.map(({ attributes : { slug }} : any) => slug);    
    
    return {
        paths: slugs.map(slug => ({ params: { slug } })),
        fallback: false
    }
}

const NewsPage = styled.div``