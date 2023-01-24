import styled from 'styled-components'
import NewsItem from './NewsItem'
import axios from 'axios'
import { useEffect, useState } from 'react'


export default function NewsList({category}) {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true);
            try{
                const qurey = category === 'all' ? '' : `&category=${category}`
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${qurey}&apiKey=d0a5955f073f42a983c82c94c6454d3f`,
                );
                setArticles(response.data.articles);
            }catch(e){
                console.log(e);
            }
            setLoading(false)
        }
        fetchData();
    }, [category])
    //대기 중일 때
    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>
    }
    //articles 값이 유효할 때
    if(!articles){
        return null
    }

  return (
    <NewsListBlock>
        {articles.map(article => (
            <NewsItem key={article.url} article={article}/>
        ))}
    </NewsListBlock>
  )
}

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`

