/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './PlayVideo.css'

import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'


const PlayVideo = () => {

    const {videoId} = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async () => {
        // Fetching Videos Data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]));    
    }

    const fetchOtherData = async () => {
        // Fetching Data Channel
        const channeData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=
        ${API_KEY}`
        await fetch(channeData_url).then(res => res.json()).then(data => setChannelData(data.items[0]));

        // Fetching Data Comment
        const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        await fetch(commentData_url).then(res => res.json()).then(data => setCommentData(data.items));
    }
    
    useEffect(() => {
        fetchVideoData();
    }, [videoId])

    useEffect(() => {
        fetchOtherData();
    }, [apiData]);

    return (
        <div className='play-video'>
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1 `} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <h3>{apiData ? apiData.snippet.title:""}</h3>
            <div className="play-video-info">
                <p>{value_converter(apiData ? apiData.statistics.viewCount : "" )} Views &bull; {moment(apiData ? apiData.snippet.publishedAt : "").fromNow()}</p>
                <div>
                    <span><img src={like} alt="" />{value_converter(apiData ? apiData.statistics.likeCount : "")}</span>
                    <span><img src={dislike} alt="" />{value_converter(apiData ? apiData.statistics.dislike : "")}</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{value_converter(channelData ? channelData.statistics.subscriberCount : "")} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="video-des">
                <p>{apiData ? apiData.snippet.description.slice(0,358)+"...": ""}</p>
                <hr />
                <h4>{value_converter(apiData ? apiData.statistics.commentCount : "")} Comments</h4>
                {commentData.map((item, index) => {
                    return (
                    <div key={index} className="comments">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div> 
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="com-action">
                                <img src={like} alt="" />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default PlayVideo
