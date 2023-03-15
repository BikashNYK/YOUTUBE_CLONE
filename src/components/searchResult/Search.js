import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideosBySearch } from '../../actions/videos.action';
import { Container } from 'react-bootstrap';
import VideoHorizontal from '../VideoRightHorizontal/VideoHorizontal';


const Search = () => {
  const {query} = useParams();
  // console.log(query);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosBySearch(query))
  }, [dispatch,query])

  const {videos,loading} = useSelector((state)=>{
    return (
      state.searchVideos
    )
  })
  
  return (
    <Container>
      {!loading ? (videos.map((e)=>{
        return <VideoHorizontal video={e} key={e.id.videoId} Search />
      })) : <h1>loading...</h1> }
    </Container>
  )
}

export default Search