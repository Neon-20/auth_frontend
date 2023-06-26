import React, { useState } from 'react';
import getstarted from "./images/gettingstartedicon.svg";
import application from "./images/applicationicon.svg";
import forwardicon from "./images/forwardicon.svg";
import authenticate from "./images/authenticationicon.svg";
import forward from "./images/forwardarrow.svg";
import backward from "./images/backwardarrow.svg";
import security from "./images/security.svg";
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
      <div className='nav-wrap'>
        <ul>
          {/* navbar element 1  */}
          <li>
            <Link className='linknav' href="/dashboard/page4">
              {/* <Link href="/" className='nav-element'> */}
              <span className='navitem-imgwrap'>
                <Image src={getstarted} alt='getting_started' />
              </span>
              <span className='navitem-text'>
                Getting Started
              </span>
              {/* </Link> */}
            </Link>
          </li>

          {/* navbar element 2nd */}
          <li>
            <button className="drodown-btn" onClick={toggleDropdown}>
              <Link href="/" className='nav-element'>
                <span className='navitem-imgwrap'>
                  <Image src={application} alt='getting_started' />
                </span>
                <span className='navitem-text'>
                  Application Steps
                </span>
                <span className='navitem-imgwrap forward ms-5'>
                  <Image src={forwardicon} alt='getting_started' />
                </span>

              </Link>
            </button>
            {/* dropdown */}
            <ul className={`dropdown-menuu ${isDropdownOpen ? "show1" : ""}`}>
              <li>
                {/* <Link className='linknav' href="/dashboard/page2"> */}
                <Link className='nav-element' href='#'>

                  <span className='navitem-text collapsabletext'>
                    Step 1
                  </span>
                  {/* </Link> */}
                </Link>
              </li>
              <li>
                <Link className='linknav' href="/dashboard/page3">
                  {/* <Link className='nav-element' href='#'> */}

                  <span className='navitem-text collapsabletext'>
                    Step 2
                  </span>
                  {/* </Link> */}
                </Link>
              </li>

            </ul>
            {/* dropdown */}
          </li>


          {/* navbar element 3  */}
          <li><Link className='linknav' href="">
            {/* <Link className='nav-element' href='#'> */}
            <span className='navitem-imgwrap'>
              <Image src={authenticate} alt='getting_started' />
            </span>
            <span className='navitem-text'>
              Authentication
            </span>
            {/* </Link> */}
          </Link>
          </li>
          {/* navbar element next element  */}


          {/* navbar element 1  */}
          <li>
            <Link className='linknav' href="/dashboard/page5">
              {/* <Link href="/" className='nav-element'> */}
              <span className='navitem-imgwrap'>
                <Image src={security} alt='getting_started' />
              </span>
              <span className='navitem-text'>
                Passwordless
              </span>
              {/* </Link> */}
            </Link>
          </li>
          {/* navbar element 1  */}
          <li>
            <Link className='linknav' href="/dashboard/page6">
              {/* <Link href="/" className='nav-element'> */}
              <span className='navitem-imgwrap'>
                <Image src={authenticate} alt='getting_started' />
              </span>
              <span className='navitem-text'>
                Organizations
              </span>
              {/* </Link> */}
            </Link>
          </li>
          {/* navbar element 7  */}
          <li>
            <Link className='linknav' href="/dashboard/page7">
              {/* <Link href="/" className='nav-element'> */}
              <span className='navitem-imgwrap'>
                <Image src={getstarted} alt='getting_started' />
              </span>
              <span className='navitem-text'>
                Email Provider
              </span>
            </Link>
            {/* </Link> */}
          </li>
        </ul>
      </div>


      <div className='bottombtn p-2'>
        <button className="downbtn" onClick={toggleSidebar}>
          <div className='d-flex'>
            <span className={`forwardarr ${isSidebarOpen ? "hide" : ""}`}><Image alt='forward' src={forward} /> </span>
            <span className={`backward ${isSidebarOpen ? "" : "hide"}`}><Image alt='backward' src={backward} /> </span>
          </div>
        </button>
      </div>
    </nav>

  )
}

export default Navbar