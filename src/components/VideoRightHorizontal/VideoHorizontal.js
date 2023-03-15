import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AiFillEye } from 'react-icons/ai';
import request from '../../api';
import './_videohorizontal.scss';
import numeral from 'numeral';
import './_videohorizontal.scss';
import { useNavigate } from 'react-router-dom';

const VideoHorizontal = ({ video, Search }) => {

  const { id,
    snippet: {
      channelId,
      channelTitle,
      title,
      description,
      publishedAt,
      thumbnails: { medium },
    } } = video;

  const [views, setViews] = useState(null);
  const _views = numeral(views).format("0.a");
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const uploadDate = moment(publishedAt).fromNow();

  const isVideo = id.kind === 'youtube#video';

  const navigate = useNavigate();

  const thumbnail = !isVideo && 'videoHorizontal__thumbnail__channel'

  useEffect(() => {
    const get_video_details = async () => {

      const { data: { items } } = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: id.videoId,
        }
      });
      // console.log(items);
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    get_video_details();
  }, [id]);

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
  }, [channelId]);
  // console.log(high?.url);


  const handleClick = () => {
    isVideo ? 
    navigate(`/watch/${id.videoId}`)
    :
      navigate(`/channel/${id.channelId}`)
  };


  return (
    <Row className='py-2 m-1 videoHorizontal align-items-center' onClick={handleClick}>
      <Col xs={6} md={Search ? 4 : 6} className='videoHorizontal__left'>
        <img src={medium?.url} alt="" className={`videoHorizontal__thumbnail ${thumbnail}`} />
        {isVideo && 
          <span className='videoHorizontal__duration'>{_duration}</span>
        }
      </Col>
      <Col xs={6} md={Search ? 8 : 6} className='p-0 videoHorizontal__right'>
        <p className='mb-1 videoHorizontal__title'>
          {title}
        </p>

        {isVideo && <div>
          <AiFillEye /> {_views} Views •&nbsp;{uploadDate}
        </div>}


        {/* {isVideo &&
          <p className='mt-1'>{description}</p>} */}

        <div className='my-1 videoHorizontal__channel d-flex align-items-center'>
          {isVideo && <img src={channelIcon} alt="" />}
          <p className='mb-0'> {channelTitle} </p>
        </div>
      </Col>
    </Row>
  );
};

export default VideoHorizontal;