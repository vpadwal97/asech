import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectStories } from "../../redux/asechSlice";
import SafeHtmlRenderer from "./SafeHtmlRenderer";

const Stories = () => {
  const location = useLocation();
  let story = location.pathname?.split("-")[1] || null;
  let storyName =
    location.pathname
      ?.split("/stories/story/")[1]
      .split("-")[0]
      .replaceAll("_", " ") || null;
  // let story = location.state?.story;
  const files = useSelector(selectStories);

  return (
    <div className="">
      <section className="p-lg-5 p-md-4 px-3 py-4 d-flex justify-content-center align-items-center">
        <div className="rounded-3 content">
          <h1 className="px-lg-5 px-4 py-2 title fw-semibold position-sticky top-0 w-100 mt-4 mb-5 text-center">
            {storyName}
          </h1>
          <div className="px-lg-5 px-4 pb-lg-5 pb-4">
            {files && story && files?.length > story ? (
              // <pre>{files[story].data}</pre>
              <SafeHtmlRenderer htmlContent={files[story].data} />
            ) : (
              "There are no such stories Found"
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stories;
