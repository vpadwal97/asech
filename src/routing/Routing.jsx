import { createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/Home";
import StoriesMenu from "../components/pages/StoriesMenu";
import Stories from "../components/pages/Stories";
import PushTextFileToGithub from "../components/pages/PushTextFileToGithub";
import HtmlEditor from "../components/pages/HtmlEditor";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
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
