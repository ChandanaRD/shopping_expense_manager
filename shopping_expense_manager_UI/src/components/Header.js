import React from 'react';
import '../styles/Header.css';
import '../styles/common.css';

const Header = ()=>{
    return(<div className='Header'>
        <button className='icon-button'><i className='bars icon'></i></button>
        <div className='header-text'>Blue Note</div>
        <button className='icon-button'>
        <i className='icon sun outline'></i>
        </button>
        
    </div>)
}

export default Header;