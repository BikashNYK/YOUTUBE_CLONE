import React from 'react'
import './_sidebar.scss'
import {MdSubscriptions , MdExitToApp , MdThumbUp , MdHistory , MdLibraryBooks , MdHome , MdSentimentDissatisfied} from "react-icons/md"
import { useDispatch } from 'react-redux/es/exports';
import { logOut } from '../../actions/auth.action';
import { Link } from 'react-router-dom';
const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch()
  const hanldleLogOut = ()=>{
    dispatch(logOut())
  }
  return (
    <nav className={sidebar ? "sidebar open" : "sidebar"} onClick={()=> handleToggleSidebar(false)}>
      <Link to={'/'} style={{color :'#b1bdb4' , textDecoration: 'none'}}>  
      <li>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      </Link>
      <li>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li>
        <MdThumbUp size={23} />
        <span>Liked Videos</span>
      </li>
      <hr />
      <li>
        <MdSentimentDissatisfied size={23} />
        <span>Dont Know</span>
      </li>
      <li onClick={hanldleLogOut}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>

    </nav>
  )
}

export default Sidebar