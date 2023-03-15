import React, { useEffect } from 'react'
import './_loginScreen.scss'
import { useSelector, useDispatch } from 'react-redux/es/exports';
import {login} from '../../actions/auth.action';
import { useNavigate } from 'react-router-dom';
const LoginScreen = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) =>{
    return state.auth.accessToken 
  });
  const navigate = useNavigate();
  const handleLogin = ()=>{

    dispatch(login())
  }

  useEffect(()=>{
    if(accessToken){
      navigate('/')
    }
  },[accessToken , navigate])
  return (
    <div className='login'>
        <div className="login__container">
              <img src="./yt.png" alt="" />
            <button onClick={handleLogin}>Login With google</button>
              <p>This project is made using Youtube Data API by <br />
            <span>Bikash Nayak</span></p>
        </div>
    </div>
  )
}

export default LoginScreen