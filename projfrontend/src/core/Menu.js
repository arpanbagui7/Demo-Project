import React, { Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper/index";

const activeTab = (history, path) => {
  if (history.location.pathname === path) return { color: "#2ecc72" };
  else return { color: "#ffffff" };
};

const Menu = ({ history, path }) => {
  return (
    <div>
      <ul className='nav nav-tabs bg-dark'>
        <li className='nav-item'>
          <Link className='nav-link' to='/' style={activeTab(history, "/")}>
            Home
          </Link>
        </li>
        {isAuthenticated() && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              to='/cart'
              style={activeTab(history, "/cart")}>
              Cart
            </Link>
          </li>
        )}
        {isAuthenticated() && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              to='/user/dashboard'
              style={activeTab(history, "/user/dashboard")}>
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/signup'
                style={activeTab(history, "/signup")}>
                Sign Up
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/signin'
                style={activeTab(history, "/signin")}>
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        <li
          className='nav-item'
          onClick={() => {
            signout(() => {
              history.push("/");
            });
          }}>
          <Link className='nav-link text-warning' to='/signout'>
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
