/* eslint-disable no-unused-vars */
import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recomend from '../../Components/Recomend/Recomend'
import { useParams } from 'react-router-dom'
const Video = () => {

    const {videoId, categoryId} = useParams();

    return (
        <div className='play-container'>
            <PlayVideo videoID={videoId} />
            <Recomend  categoryID={categoryId} />
        </div>
    )
}

export default Video
