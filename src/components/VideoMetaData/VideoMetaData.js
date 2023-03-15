import moment from 'moment/moment';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import './_VideoMetaData.scss';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelDetails } from '../../actions/channel.action';
import request from '../../api';
const VideoMetaData = ({video  , videoId}) => {
  
 
    const { channelId, channelTitle, description, title, publishedAt, thumbnails } = video?.snippet || {}
    const [channelIcon, setChannelIcon] = useState(null)
    const { viewCount, likeCount, commentCount  } = video?.statistics || {}
    const _views = numeral(viewCount).format("0.a");
    const likes = numeral(likeCount).format("0.a")
    const uploadDate = moment(publishedAt).fromNow();
    const dispatch = useDispatch();
    

// get channel details
    useEffect(()=>{
        dispatch(getChannelDetails(channelId))
    },[dispatch,channelId])

    // channel icon
    useEffect(() => {
        const get_channel_icon = async () => {

            const { data: { items }, } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                },
            });
            // console.log(items[0].snippet.thumbnails.default.url);
            setChannelIcon(items[0].snippet.thumbnails.default?.url);
        };
        get_channel_icon();
    }, [channelId])

    return (
        <div className="videoMetadata py-2">
            <div className="videoMetaTop">
                <h5>{title}</h5>
                <div className="statistics">
                    <div className='likeOrDislike'>
                        <span><MdThumbUp size={20} /> {likes}</span>
                        <span>
                            <span>| &nbsp;</span>
                            <MdThumbDown size={20} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="videoMetaData__channel">
                <div className='d-flex'>
                    <img src={channelIcon} alt="avatar" />

                    <div className='d-flex flex-column'>
                        <span>{channelTitle}</span>
                        <span>{numeral(1000000).format("0.a")} Subscribers</span>
                    </div>
                    <button >Subscribe</button>

                </div>
            </div>
            <div className="videoMeta__description">
                <span>{_views} Views {`${uploadDate}`}</span>
                <br />
                {description}
                {/* <button id="myBtn">Show more</button> */}
            </div>
        </div>
    );
};

export default VideoMetaData;