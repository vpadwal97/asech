import React, { useMemo } from "react";
import { Link, Outlet } from "react-router-dom";
import MouseTracker from "./MouseTracker";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectswitchTheme, setswitchTheme } from "../redux/asechSlice";
import Routing from "../routing/Routing";

const getPaths = (routes) => {
  const paths = routes.map((route) => route.path);
  routes.forEach((route) => {
    if (route.children) {
      paths.push(...getPaths(route.children));
    }
  });
  return paths;
};

const Home = () => {
  const switchTheme = useSelector(selectswitchTheme);
  const dispatch = useDispatch();
  const routes = useMemo(() => Routing.routes || [], []);
  // const [switchTheme, setSwitchTheme ]=useState(false);
  const apiUrl = process.env.REPO_OWNER;
  console.log("Current NODE_ENV:", process.env.NODE_ENV);
  console.log("REPO_OWNER", apiUrl);
  console.log("Routing", routes);

  const paths = useMemo(() => getPaths(routes), [routes]);

  return (
    <div data-bs-theme={switchTheme ? "dark" : "light"}>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>Switch to {switchTheme ? "Light" : "Dark"} Theme</Tooltip>
        }
      >
        <Form.Check // prettier-ignore
          type="switch"
          // label="switch to dark Theme"
          value={switchTheme}
          // onChange={() => {setSwitchTheme(!switchTheme)}}
          onChange={() => dispatch(setswitchTheme(!switchTheme))}
        />
      </OverlayTrigger>

      <h1>Available Links</h1>
      <ul>
        {paths.map((path, index) => (
          <li key={index}>
            <Link to={path}>{path}</Link>
          </li>
        ))}
      </ul>

      <MouseTracker />
      <Outlet />
    </div>
  );
};

export default Home;
