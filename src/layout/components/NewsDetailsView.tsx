import React from "react";
import styled from 'styled-components';


export type NewsViewProps = {    
    items: NewsViewsDetailsProps[]
}

export type NewsViewsDetailsProps = {
    title: string;
    description: string;
    publishDate: Date;
    image: string;
}

const NewsDetailsView = ({ title, description, publishDate, image } : NewsViewsDetailsProps) => {
    return <NewsViewsA>
        <ContentContainer>
            <ContentItem>
                <span>{title}</span>                
            </ContentItem>
        </ContentContainer>
        <ContentImage>
            <img src={image}></img>
        </ContentImage>
        <ContentContainer>            
            <ContentItem>
                <p>{description}</p>         
            </ContentItem>
            <ContentItem>
                <time dateTime={new Date(publishDate).toJSON()}>
                    {new Date(publishDate).toLocaleDateString('pt-br')}
                </time>         
            </ContentItem>
        </ContentContainer>
    </NewsViewsA>
}

export default NewsDetailsView;

const NewsView = styled.div`
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    img {
        width: 100%;
        height: 100%;
        flex: 2;
    }
`

const ContentImage = styled.div`
    background-color: purple;
`

const ContentContainer = styled.div`
    flex: 1;
`

const ContentItem = styled.div``

const NewsViewsA = styled(NewsView)`
    display: flex;
    width: 960px;
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`