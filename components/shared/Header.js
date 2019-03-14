import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import auth0 from "../../services/auth0";
import ActiveLink from "../ActiveLink";
import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const BsNavLink = props => {
  const { route, title, router, className } = props;
  return (
    <ActiveLink route={`${route}`} activeClassName="active" router={router}>
      <a className={`nav-link port-navbar-link ${className}`}>{title}</a>
    </ActiveLink>
  );
};

BsNavLink.defaultProps = {
  className: ""
};

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">
      Login
    </span>
  );
};

const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link port-navbar-link clickable"
    >
      Logout
    </span>
  );
};

const Header = props => {
  // console.log(props);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const { isAuthenticated, user, className, isSiteOwner } = props;

  const renderBlogMenu = () => {
    if (isSiteOwner) {
      return (
        <Dropdown
          className="port-dropdown-menu"
          nav
          isOpen={dropdownOpen}
          toggle={toggleDropdown}
        >
          <DropdownToggle
            className="port-dropdown-toggle port-navbar-link "
            caret
            nav
          >
            Blogs
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogs"
                title="Blogs"
                router={props.router}
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogs/new"
                title="Create a Blog"
                router={props.router}
              />
            </DropdownItem>
            <DropdownItem>
              <BsNavLink
                className="port-dropdown-item"
                route="/blogs/dashboard"
                title="Blogs Dashboard"
                router={props.router}
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <NavItem className="port-navbar-item">
        <BsNavLink route="/blogs" title="Blog" router={props.router} />;
      </NavItem>
    );
  };

  return (
    <div>
      <Navbar
        className={`port-navbar port-nav-base absolute ${className} ${
          isOpen ? "menu-open" : "menu-close"
        }`}
        color="transparent"
        light
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand" href="/">
          Dat Ngo
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/" title="Home" router={props.router} />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink route="/about" title="About" router={props.router} />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink
                route="/portfolios"
                title="Portfolio"
                router={props.router}
              />
            </NavItem>
            {renderBlogMenu()}
            <NavItem className="port-navbar-item">
              <BsNavLink route="/cv" title="Cv" router={props.router} />
            </NavItem>

            {isAuthenticated ? (
              <React.Fragment>
                <NavItem className="port-navbar-item">
                  <Logout />
                </NavItem>
                {/* <NavItem className="port-navbar-item">
                  <span className="nav-link port-navbar-link">{user.name}</span>
                </NavItem> */}
              </React.Fragment>
            ) : (
              <NavItem className="port-navbar-item">
                <Login />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
