import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import StoriesMenu from "../pages/StoriesMenu";
import Stories from "../pages/Stories";
import PushTextFileToGithub from "../pages/PushTextFileToGithub";
import HtmlEditor from "../pages/HtmlEditor";
import MyCalendar from "../pages/MyCalendar";
import LogoAnimation from "../pages/LogoAnimation";
import Carousels from "../pages/Carousels";


const Routing = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/calendar",
        element: <MyCalendar />,
      },
      {
        path: "/LogoAnimation",
        element: <LogoAnimation />,
      },
      {
        path: "/Carousels",
        element: <Carousels />,
      },
      {
        path: "/stories",
        element: <StoriesMenu />,
        children: [
          { path: "story/:id", element: <Stories /> }
        ],
      },
      {
        path: "/pushtoGit",
        element: <PushTextFileToGithub />,
      },
      {
        path: "/Editor",
        element: <HtmlEditor />,
      },
    ],
  },
]);

export default Routing;
