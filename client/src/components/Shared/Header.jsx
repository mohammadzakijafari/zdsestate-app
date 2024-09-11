import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSignal } from "use-signals";
import { authTokenSignal } from "../../store/store";
import { jwtDecode } from 'jwt-decode'

function Header() {
  const authTokenState = useSignal(authTokenSignal);
  const Navigate = useNavigate();

  const handleSignOut = () => {
    if (authTokenSignal.get()) {
      localStorage.removeItem("authToken");
      authTokenSignal.set(null);
      Navigate("/");
    }
  };

  // State to manage the visibility of the user menu
  const [menuVisible, setMenuVisible] = useState(false);

  // Function to toggle the user menu
  const toggleMenu = () => {
      setMenuVisible(!menuVisible);
  };

  // Getting Current User Info
  let token = localStorage.getItem("authToken");
  let decodedToken = jwtDecode(token);
  console.log(decodedToken.currentUser.fullName);
  
  return (
    <header className="bg-green-100 shadow-md flex">
      <div className="flex justify-between items-center mx-auto p-3 gap-20">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap">
            <span className="text-green-500">ZDS</span>
            <span className="text-green-700">ESTATE</span>
          </h1>
        </Link>
        <form className="bg-green-200 min-w-64 md:min-w-72 p-2 px-3 sm:p-2.5 sm:px-4 rounded-lg flex justify-between items-center ">
          <label htmlFor="search">
            <input
              className="bg-transparent focus:outline-none "
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
            />
          </label>
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 font-bold">
          <Link to="/">
            <li className="hidden sm:inline text-green-700 hover:underline ">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-green-700 hover:underline ">
              About
            </li>
          </Link>
          {authTokenState && (
            <Link to="/listings">
              <li className="hidden sm:inline text-green-700 hover:underline ">
                My Listings
              </li>
            </Link>
          )}

          {!authTokenState ? (
            <Link to="/sign-in">
              <li className=" text-green-700 hover:underline ">Sign in</li>
            </Link>
          ) : (
            <li
              onClick={handleSignOut}
              className="cursor-pointer text-green-700 hover:underline"
            >
              Sign out
            </li>
          )}
        </ul>

        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative">
                <div className="flex gap-5">
                  <div>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded={menuVisible}
                      aria-haspopup="true"
                      onClick={toggleMenu} >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                  </div>
                  <div className="">
                    <h1> {decodedToken.currentUser.fullName} </h1>
                  </div>    
                </div>

                <div id="user-menu" className={`${ menuVisible ? "" : "hidden" } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1">

                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0"> Your Profile </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1"> Edit Profile </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2"> Sign out </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
