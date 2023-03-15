import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { channelDetailsReducer } from "./reducer/channelReducer";
import { commentListReducer } from "./reducer/comments.reducer";
import reducer from "./reducer/reducer";
import { homeVideoReducer, relatedVideoReducer, searchVideoReducer, selectedVideoReducer } from "./reducer/videoReducer";

const rootReducer = combineReducers({
    auth: reducer,
    homeVideoReducer: homeVideoReducer,
    commentList : commentListReducer,
    relatedVideos : relatedVideoReducer,
    searchVideos : searchVideoReducer,
    channelDetails : channelDetailsReducer,
    selectedVideoDetails : selectedVideoReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export default store
