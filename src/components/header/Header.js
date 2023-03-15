import React, { useState } from 'react';
import './_header.scss';
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
const Header = ({ handleToggleSidebar }) => {

 const data = sessionStorage.getItem('yt-clone-user')
 const user = JSON.parse(data)
 const [input, setinput] = useState('')
 const navigate = useNavigate()

 const handleSubmit=(e)=>{
  e.preventDefault();
  navigate(`/search/${input}`)
  setinput('')
 }
 
 
  return (
    <div className='border border-dark header' >

      <FaBars className='header__menu' size={26} onClick={() => { handleToggleSidebar(); }} />
      
      <Link to='/'>
        <img src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg" alt="" className='header__logo'/>
      </Link>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Search' value={input} onChange={(e)=>{setinput(e.target.value)}} />
        <button type='submit'>
          <AiOutlineSearch size={22}/>
        </button>
      </form>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={user?.photo} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;