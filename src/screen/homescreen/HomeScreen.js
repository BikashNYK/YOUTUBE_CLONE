import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryBar from '../../components/categoryBar/CategoryBar';
import Video from '../../components/video/Video';
import './_homeScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularVideos } from '../../actions/videos.action';

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const { videos } = useSelector((state) => {
    return state.homeVideoReducer;
  });

  return (
    <Container>
      <CategoryBar />
      <Row>
        {videos.map((e) => (
          <Col lg={4} md={3} key={e.id}>
              <div>
                <Video video={e} key={e.id} />
              </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
