import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "./actionType";

const initialeState = {
    accessToken: sessionStorage.getItem("yt-clone-access-token") ? sessionStorage.getItem("yt-clone-access-token") : null,
    user: sessionStorage.getItem("yt-clone-user") ? JSON.parse(sessionStorage.getItem("yt-clone-user")) : null,
    loading: false
}


const reducer = (state = initialeState , action)=>{

    const {type , payload} = action

    switch (type) {
        case LOGIN_REQUEST:{
            return {
                ...state,
                loading:true
            }
        }

        case LOGIN_SUCCESS:{
            return {
                ...state,
                accessToken: payload,
                loading : false,
            }
        }
        case LOGIN_FAIL:{
            return {
                ...state,
                accessToken: null,
                error: payload,
            }
        }
        case LOAD_PROFILE:{
            return {
                ...state,
                user: payload,
            }
        }

        case LOG_OUT : {
            return {
                ...state,
                accessToken: null,
                user : null
            }
        }
        default : {
            return state
        }
    }
}

export default reducer