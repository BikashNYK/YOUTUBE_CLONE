import auth from "../firebase"
import {  signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { LOGIN_SUCCESS , LOGIN_FAIL, LOGIN_REQUEST, LOAD_PROFILE, LOG_OUT } from "../reducer/actionType";

export const login = () => async dispatch =>{
        try {

            dispatch ({
                type : LOGIN_REQUEST
            })

        const provider = new GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl');
       const res = await signInWithPopup(auth , provider)
            console.log(res);
            const accessToken = res.user.accessToken;
            const profile = {
                name: res.user.displayName,
                email: res.user.email,
                photo: res.user.photoURL
            }

            sessionStorage.setItem('yt-clone-access-token',accessToken)
            sessionStorage.setItem('yt-clone-user',JSON.stringify(profile))

            dispatch({
                type: LOGIN_SUCCESS,
                payload : accessToken
            })

            dispatch({
                type: LOAD_PROFILE,
                payload: profile
            })

        
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.message
        })
    }
    
}

export const logOut = () =>async dispatch=>{

    await signOut(auth)
    dispatch({
        type: LOG_OUT,
    })

    sessionStorage.removeItem('yt-clone-access-token')
    sessionStorage.removeItem('yt-clone-user')
}

