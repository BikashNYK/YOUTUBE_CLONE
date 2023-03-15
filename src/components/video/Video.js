import React, { useEffect, useState } from 'react';
import './_video.scss';
import { AiFillEye } from 'react-icons/ai';
import request from '../../api';
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom';
const Video = ({ video }) => {

  const { id,
    snippet:
    { channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { high },
    },
  } = video;

  const [views,setViews] = useState(null)
  const [duration,setDuration] = useState(null)
  const [channelIcon , setChannelIcon] = useState(null)
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const _views = numeral(views).format("0.a")
  const uploadDate = moment(publishedAt).fromNow()
  const videoId = id?.videoId || id



  useEffect(()=>{
    const get_video_details =async () => {
      
    const {data : {items}} =  await request ('/videos',{
        params : {
          part : 'contentDetails,statistics',
          id : videoId,
        }
      })
      // console.log(items);
      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)
    }
    get_video_details()
  },[videoId])
  
  useEffect(()=>{
    const get_channel_icon = async () => {
      
    const {data : {items} , } =  await request ('/channels',{
        params : {
          part : 'snippet',
          id : channelId,
        },
      })
      // console.log(items[0].snippet.thumbnails.default.url);
      setChannelIcon(items[0].snippet.thumbnails.default?.url)
    }
    get_channel_icon()
  },[channelId])
    // console.log(high?.url);
    

  return (
    <div className="video">
      <Link to={`/watch/${videoId}`} style={{ color: 'white', textDecoration: 'none' }}>
      <div className="video__top">
        <img src={high?.url} alt="" />
        <span>{_duration}</span>
      </div>
      <div className="video__title">
        {title}
      </div>
      <div className="video__details">
        <span><AiFillEye /> {_views} Views •</span>
        <span>&nbsp;{`${uploadDate}`}</span>
      </div>
      </Link>
      <div className="video__channelName">
        <img src={channelIcon} alt="" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Video;