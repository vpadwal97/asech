import React from "react";
import { Outlet } from "react-router-dom";
import MouseTracker from "./MouseTracker";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectswitchTheme, setswitchTheme } from "../../redux/asechSlice";

const Home = () => {
  const switchTheme = useSelector(selectswitchTheme);
  // const [switchTheme, setSwitchTheme ]=useState(false);
  const dispatch = useDispatch();
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

        <MouseTracker />
        <Outlet />
      </div>
    </>
  );
};

export default Home;
