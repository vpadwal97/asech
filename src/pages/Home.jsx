import React from "react";
import { Link, Outlet } from "react-router-dom";
import MouseTracker from "./MouseTracker";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectswitchTheme, setswitchTheme } from "../redux/asechSlice";
import Routing from "../routing/Routing";

const Home = () => {
  const switchTheme = useSelector(selectswitchTheme);
  // const [switchTheme, setSwitchTheme ]=useState(false);
  const apiUrl = process.env.REPO_OWNER;
  console.log("Current NODE_ENV:", process.env.NODE_ENV);

console.log("REPO_OWNER",apiUrl);
  const dispatch = useDispatch();


  const routes = Routing.routes;

  const getPaths = (routes) => {
    const paths = routes.map(route => route.path);
    routes.forEach(route => {
      if (route.children) {
        paths.push(...getPaths(route.children));
      }
    });
    return paths;
  };

  const paths = React.useMemo(() => getPaths(routes), [routes]);

  return (
    <>
      <div data-bs-theme={switchTheme ? "dark" : "light"}>
        <OverlayTrigger  placement={"bottom"}
          overlay={<Tooltip>switch to dark Theme</Tooltip>}
        >
          <Form.Check // prettier-ignore
            type="switch"
            // label="switch to dark Theme"
            value={switchTheme}
            // onChange={() => {setSwitchTheme(!switchTheme)}}
            onChange={() => {
              dispatch(setswitchTheme(!switchTheme));
            }}
          />
        </OverlayTrigger>
        {console.log("Routing",Routing.routes)}
        <div>
            <h1>Available Links</h1>
            <ul>
                {paths.map((path, index) => (
                    <li key={index}>
                        <Link to={path}>{path}</Link>
                    </li>
                ))}
            </ul>
        </div>

        <MouseTracker />
        <Outlet />
      </div>
    </>
  );
};

export default Home;
