import { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaShoppingBag } from 'react-icons/fa';

import "./index.css"
class Header extends Component { 
   render() { 
      return (
          <nav className="header-container">
             <div className="header-content-container">
                <Link to = "/" className = "nav-link">
                <div className="logo-container">
                   <div className="logo">B</div>
                   BOOKSTORE
                </div>
                    </Link>"
                <ul className="nav-items-container">
                 <Link to = "/books" className = "nav-link">
                  <li className="icon-container">
                      <FaBook className="icon" />
                      <span className="icon-name">Book List</span>
                  </li>
                  </Link>

                    <Link to = "/cart" className = "nav-link">
                  <li className="icon-container">
                      <FaShoppingBag className="icon" />
                      <span className="icon-name">Cart</span>
                  </li>
                    </Link>
              </ul>
          </div>
       </nav>
      )
  }
}

export default Header;