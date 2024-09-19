import React, { useEffect } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import {
  selectGitCreds,
  selectStories,
  setStories,
} from "../../redux/asechSlice";
import { useDispatch, useSelector } from "react-redux";

const StoriesMenu = () => {
  // const [filess, setFiles] = useState();
  const files= useSelector(selectStories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gitCreds = useSelector(selectGitCreds);


  const fetchFiles = async () => {
    try {
      const repoOwner = gitCreds.repoOwner; //"vpadwal97"; // Example: 'facebook'
      const repoName = gitCreds.repoName; //"asech-thoughts"; // Example: 'react'
      const branch = gitCreds.branch; //"main"; // Branch where the files are stored
      // Fetch the contents of the repo
      const res = await axios.get(
        `https://api.github.com/repos/${repoOwner}/${repoName}/git/trees/${branch}?recursive=1`
      );

      // Filter files
      // const files = res.data.tree.filter((file) => file.path.endsWith(".json"));
      const files = res.data.tree.filter((file) => file.path);

      // Fetch content of each file
      const fileData = await Promise.all(
        files.map(async (file, index) => {
          const fileRes = await axios.get(file.url, {
            headers: {
              Accept: "application/vnd.github.v3.raw",
            },
          });
          return { id: index, name: file.path, data: fileRes.data };
        })
      );

      dispatch(setStories(fileData));
      // dispatch(setStories(null));
      // setFiles(fileData);
    } catch (error) {
      dispatch(setStories(null));
      console.error("Error fetching files", error);
    }
  };
  useEffect(() => {
    fetchFiles();
  },[]);

  const handleClick = (data, fname, i) => {
    // navigate(`story/${fname}`, { state: { story: data } });
    navigate(`story/${fname}-${i}`);
  };

  return (
    <div>
      <h2>List of Stories</h2>
      {files?.length > 0 ? (
        <div>
          {files?.map((file, index) => (
            <strong
              key={index}
              onClick={() => handleClick(file.data, file.name, index)}
              className="btn btn-link"
            >
              {file.name?.replaceAll("_", " ")}
              {/* <pre>{file.data || "Nothing...."}</pre> */}
            </strong>
          ))}
        </div>
      ) : (
        <p>No Stories found.</p>
      )}

      <Outlet />
    </div>
  );
};

export default StoriesMenu;
