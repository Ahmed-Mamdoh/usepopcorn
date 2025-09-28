import Search from "./Search";
import Logo from "./Logo";
import NumResults from "./NumResults";
import { Children } from "react";

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default NavBar;
