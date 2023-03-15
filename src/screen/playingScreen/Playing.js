import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRelatedVideos, getVideoById } from '../../actions/videos.action';
import Comments from '../../components/Commets/Comments';
import VideoMetaData from '../../components/VideoMetaData/VideoMetaData';
import VideoHorizontal from '../../components/VideoRightHorizontal/VideoHorizontal';
import './_playingScreen.scss'
const Playing = () => {
 const {id} = useParams();

 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(getVideoById(id))
  dispatch(getRelatedVideos(id))

 }, [dispatch,id])
 

  const { videos, loading:relatedVideoLoading } = useSelector(state => state.relatedVideos)

  const {video , loading} = useSelector((state)=>{
    return state.selectedVideoDetails
  })
  return (
    <Row>
      {/* left part of screen */}
      <Col lg={8}>
      <div className='watchScreen_Player'>
          <iframe src={`https://www.youtube.com/embed/${id}`} 
          frameBorder='0'
          title='MY Video'
          allowFullScreen
          width='100%'
          height='100%'
          ></iframe>
      </div>
        <VideoMetaData video={video} videoId = {id} />
        <Comments video={video} />
      </Col>
      {/* right part of screen */}
      <Col lg={4}>
      {!loading &&
       videos?.filter((e)=>{
       return e.snippet
       })
      .map((element)=>{
        return <VideoHorizontal video={element} key={element.id.videoId} />
      })}
      </Col>
    </Row>
  )
}

export default Playing