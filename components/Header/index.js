import { Component } from 'react';

import { FaBook, FaShoppingBag } from 'react-icons/fa';

import "./index.css"
class Header extends Component { 
   render() { 
      return (
          <nav className="header-container">
             <div className="header-content-container">
                <div className="logo-container">
                   <div className="logo">B</div>
                   BOOKSTORE
                </div>
                <ul className="nav-items-container">
                  <li className="icon-container">
                      <FaBook className="icon" />
                      <span className="icon-name">Book List</span>
                  </li>
                  <li className="icon-container">
                      <FaShoppingBag className="icon" />
                      <span className="icon-name">Cart</span>
                  </li>
              </ul>
          </div>
       </nav>
      )
  }
}

export default Header;