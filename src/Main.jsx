import { Children } from "react";
import ListBox from "./Shared/Box";
import WatchedBox from "./WatchedBox/WatchedBox";

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

export default Main;
