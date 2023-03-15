import { HOME_VIDEOS_FAIL, HOME_VIDEOS_REQUEST, HOME_VIDEOS_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCH_VIDEO_FAIL, SEARCH_VIDEO_REQUEST, SEARCH_VIDEO_SUCCESS, SELECTED_VIDEOS_FAIL, SELECTED_VIDEOS_REQUEST, SELECTED_VIDEOS_SUCCESS } from "./actionType";

const initialState = {
    videos: [],
    nextPageToken: null,
    loading: false,
    activeCategory:'ALL'
};

export const homeVideoReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case HOME_VIDEOS_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case HOME_VIDEOS_SUCCESS: {
            // console.log("Payload in HOME_VIDEOS_SUCCESS case:", payload?.videos);
            return {
                ...state,
                videos: payload?.videos || [],
                loading: false,
                nextPageToken: payload.nextPageToken,
                activeCategory:payload.category,
            };
        }
        case HOME_VIDEOS_FAIL: {
            // console.log("Payload in HOME_VIDEOS_FAIL case:", payload);
            return {
                ...state,
                loading: false,
                error: payload?.message || "Unknown error occurred."
            };
        }


        default: {
            return state;
        }
    }
}


export const selectedVideoReducer = (
    state = {
        loading: true,
        video: null,
    },
    action
) => {
    const { payload, type } = action;
    switch (type) {
        case SELECTED_VIDEOS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SELECTED_VIDEOS_SUCCESS:
            return {
                ...state,
                video: payload,
                loading: false,
            };
        case SELECTED_VIDEOS_FAIL:
            return {
                ...state,
                video: null,
                loading: false,
                error: payload,
            };

        default:
            return state;
    }
}



export const relatedVideoReducer = (state = {
    loading: true,
    videos: [] ,
}, action) => {

    const { type, payload } = action;

    switch (type) {
        case RELATED_VIDEO_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case RELATED_VIDEO_SUCCESS: {
            // console.log("Payload in HOME_VIDEOS_SUCCESS case:", payload?.videos);
            return {
                ...state,
                videos: payload,
                loading: false,
            };
        }
        case RELATED_VIDEO_FAIL: {
            // console.log("Payload in HOME_VIDEOS_FAIL case:", payload);
            return {
                ...state,
                loading: false,
                error: payload?.message || "Unknown error occurred."
            };
        }


        default: {
            return state;
        }
    }
}

export const searchVideoReducer = (state = {
    loading: true,
    videos: [] ,
}, action) => {

    const { type, payload } = action;

    switch (type) {
        case SEARCH_VIDEO_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case SEARCH_VIDEO_SUCCESS: {
            // console.log("Payload in HOME_VIDEOS_SUCCESS case:", payload?.videos);
            return {
                ...state,
                videos: payload,
                loading: false,
            };
        }
        case SEARCH_VIDEO_FAIL: {
            // console.log("Payload in HOME_VIDEOS_FAIL case:", payload);
            return {
                ...state,
                loading: false,
                error: payload?.message || "Unknown error occurred."
            };
        }


        default: {
            return state;
        }
    }
}


