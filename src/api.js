import axios from 'axios'
// console.log(process.env.REACT_APP_YT_API_KEY);

const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3/",
    params: {
        key: "AIzaSyA3y5mqX9dX2KVeua8HkdlhO2io2dH_Lmw"
    }
})

export default request