import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function News() {
    const[news,setNews]=useState([])
    useEffect(()=>{
getNews()
    },[])
    async function getNews(){
        let {data} = await axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=3ace82d5cb33437297ad7c7665c783e2
        `)
        setNews(data.articles)
        console.log(data.articles);

    }
  return (
    <>
     <div className="row">
        {news.map(
            (news) =>{
               return (  <div className="col-md-3">
                    <div className="news shadow-lg">
                        <img src={news.urlToImage} className='w-100' alt="" />
                        <p>{news.content}</p>
                    </div>

                </div>)
            }
        )}
        </div> 
    </>
  )
}
