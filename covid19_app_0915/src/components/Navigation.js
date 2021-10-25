
import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';





function Navigation(){    
   
    
    return (
        <div className="nav" >   
            <botton className="nav_01"><Link to="/">Home</Link></botton>
            <botton className="nav_02"><Link to="/board">공지사항</Link></botton>
            <botton className="nav_03"><Link to="/Join">회원가입</Link></botton>
            <botton className="nav_04"><Link to="/day-board">DayBoard</Link></botton>
        </div>
    );
}

export default Navigation