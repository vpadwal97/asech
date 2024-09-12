import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectGitCreds } from "../../redux/appSlice";
import HtmlEditor from "./HtmlEditor";
import FormTextarea from "../forms/FormTextarea";
import FormGroup from "../forms/FormGroup";

const PushTextFileToGithub = () => {
  const [inputText, setInputText] = useState("");
  const [fileName, setFileName] = useState("example");
  const [commitMessage, setCommitMessage] = useState("Added text file");
  const gitCreds = useSelector(selectGitCreds);

  // GitHub repo details
  const githubToken = gitCreds.githubToken; //"YOUR_PERSONAL_ACCESS_TOKEN"; // Replace with your GitHub token
  const repoOwner = gitCreds.repoOwner; //"YOUR_GITHUB_USERNAME"; // Replace with your GitHub username
  const repoName = gitCreds.repoName; //"YOUR_REPO_NAME"; // Replace with your repo name
  const branch = gitCreds.branch; //"main"; // The branch where you want to push the file

  // const filePath = fileName; // Path to the file in the repository

  // Function to create and push the text file to GitHub
  const pushTextFileToGithub = async () => {
    try {
      // Create the content for the file (base64 encoded)
      const content = btoa(inputText); // Base64 encode the text content

      // GitHub API URL to create/update a file
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`;

      // Prepare the data to be sent to GitHub
      const data = {
        message: commitMessage,
        content: content,
        branch: branch,
      };
      // Make the API request to create/update the file
      const response = await axios.put(apiUrl, data, {
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("File pushed to GitHub:", response.data);
      alert("File successfully pushed to GitHub!");
    } catch (error) {
      console.error("Error pushing file to GitHub", error);
      alert("Failed to push the file to GitHub. See console for details.");
    }
  };

  return (
    <div className="container-fluid">
      <h2>Create and Push .txt File to GitHub</h2>

      <div className="row">
        <div className="col-8">
          <HtmlEditor setInputText={setInputText} />
        </div>
        <div className="col">
          {/* Input for text content */}
          <FormTextarea
            disabled
            conClassName="w-100 h-100"
            inputClassName="w-100 h-100 disabld form-control"
            value={inputText}
            // onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text or HTML content here"
          />
        </div>
        <div className="col-12">
          <div className="d-flex flex-wrap my-3">
            {/* Input for the file name */}
            <FormGroup
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="File name (e.g., example.txt)"
            />

            {/* Input for the commit message */}
            <FormGroup
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Commit message"
            />

            {/* Button to push file to GitHub */}
            <button
              className="btn btn-dark rounded-0"
              onClick={pushTextFileToGithub}
            >
              Push to GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushTextFileToGithub;
