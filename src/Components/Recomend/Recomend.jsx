/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './Recomend.css'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom';

const Recomend = ({categoryID}) => {

    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const recomendVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryID}&key=${API_KEY}`
        await fetch(recomendVideo_url).then(res => res.json()).then(data => setApiData(data.items))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='recomend'>
            {apiData.map((item, index) => {
                return (
                <Link to={`/video/${item.snippet.categoryID}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} Views</p>
                    </div>
                </Link>
                )
            })}
        </div>
    )
}

export default Recomend
