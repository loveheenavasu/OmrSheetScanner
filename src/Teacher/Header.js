import React from 'react'
import "./css/Admin.css";
import './css/bootstrap.min.css';
import logo from "./logo.png";
export default function Header() {
  return (
    <header style={{height:"90px"}}>
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div className="navbar-header">

    <div style={{ display: "flex" }} className="header-logo" >
            
              <img src={logo} alt="Main Logo"/>
      </div>     
    <ul className="nav navbar-right top-nav" id="yw0">
    <>
                <li>
                  <a>Home</a>
                </li>
                </>
                </ul>
                
    </div>
      </nav>
      </header>
  )
}
