import request from "../api";
import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEOS_FAIL, SELECTED_VIDEOS_REQUEST, SELECTED_VIDEOS_SUCCESS } from "../reducer/actionType";

export const getPopularVideos = () => async (dispatch) => {
    
    try {

        dispatch({
            type: HOME_VIDEOS_REQUEST
        });

        const { data } = await request("/videos", {
            params: {
                part: 'snippet,contentDetails,statistics',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 28,
                pageToken: ''
            }
        });

        // console.log(response);
        // const {data} = response
        console.log(data.items);


        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: 'ALL'

            }
        });

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        });

    }
};


export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
    try {

        dispatch({
            type: HOME_VIDEOS_REQUEST
        });

        const { data } = await request("/search", {
            params: {
                part: 'snippet',
                maxResults: 20,
                pageToken: getState().homeVideoReducer.nextPageToken,
                q: keyword,
                type: 'video'
            }
        });

        // console.log(response);
        // const {data} = response
        console.log(data.items);


        dispatch({
            type: HOME_VIDEOS_SUCCESS,
            payload: {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: keyword
            }
        });

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: HOME_VIDEOS_FAIL,
            payload: error.message
        });

    }
};
export const getVideosBySearch = (keyword) => async (dispatch) => {
    try {

        dispatch({
            type: SEARCH_VIDEO_REQUEST
        });

        const { data } = await request("/search", {
            params: {
                part: 'snippet',
                maxResults: 20,
                q: keyword,
                type: 'video,channel'
            }
        });

        // console.log(response);
        // const {data} = response
        console.log(data.items);


        dispatch({
            type: SEARCH_VIDEO_SUCCESS,
            payload: data.items
        });

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: SEARCH_VIDEO_FAIL,
            payload: error.message
        });

    }
};

export const getVideoById = id =>async (dispatch) => {

    try {
        dispatch ({
            type : SELECTED_VIDEOS_REQUEST
        })

        const {data} = await request('/videos',{
            params: {
                part: 'snippet,statistics',
                id: id,
            },
        })
        dispatch({
            type : SELECTED_VIDEOS_SUCCESS,
            payload : data.items[0]
        })
    } catch (error) {
        dispatch({
            type : SELECTED_VIDEOS_FAIL,
            payload: error.message
        })
    }
    
}

export const getRelatedVideos = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: RELATED_VIDEO_REQUEST
        });

        const { data } = await request("/search", {
            params: {
                part: 'snippet',
                relatedToVideoId : id,
                maxResults: 30,
                type: 'video'
            }
        });

        // console.log(response);
        // const {data} = response
        console.log(data.items);


        dispatch({
            type: RELATED_VIDEO_SUCCESS,
            payload: data.items,
        });

    } catch (error) {
        // console.log(error.message);
        dispatch({
            type: RELATED_VIDEO_FAIL,
            payload: error.response.data.message
        });

    }
};