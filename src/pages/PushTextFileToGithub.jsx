import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectGitCreds } from "../redux/asechSlice";
import HtmlEditor from "./HtmlEditor";
import FormTextarea from "../components/forms/FormTextarea";
import FormGroup from "../components/forms/FormGroup";

const PushTextFileToGithub = () => {
  const [inputText, setInputText] = useState("");
  const [fileName, setFileName] = useState("example");
  const [commitMessage, setCommitMessage] = useState("Added/Updated text file");
  const [fileSha, setFileSha] = useState(""); // SHA needed for updating
  const [loading, setLoading] = useState(false); // Loading state
  const gitCreds = useSelector(selectGitCreds);
  const [errorMessage, setErrorMessage] = useState("");
  // GitHub repo details from Redux store
  const { githubToken, repoOwner, repoName, branch } = gitCreds;
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`;

  // Fetch file SHA if it exists
  const checkIfFileExists = useCallback(async () => {
    let newErrorMessage = errorMessage;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
      });

      setFileSha(response.data.sha); // Store file's SHA for updating
      // Decode the base64 content and set it to inputText
      const decodedContent = atob(response.data.content);
      setInputText(decodedContent);
      console.log("File exists, SHA:", response.data.sha);
      newErrorMessage = {
        ...newErrorMessage,
        fileName: "File exists it will be updated",
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        let error = "File does not exist. It will be created.";
        console.log(error);
        newErrorMessage = {
          ...newErrorMessage,
          fileName: error,
        };
      } else {
        newErrorMessage = {
          ...newErrorMessage,
          fileName: error,
        };
        console.error("Error checking file existence:", error);
      }
    } finally {
      setErrorMessage(newErrorMessage);
    }
    setErrorMessage(newErrorMessage);
  }, [apiUrl, githubToken]);

  // Function to create or update the text file on GitHub
  const pushTextFileToGithub = async () => {
    // Validate inputs
    if (!fileName || !commitMessage) {
      alert("File name and commit message are required.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Create the content for the file (base64 encoded)
      const content = btoa(inputText); // Base64 encode the text content
      // Prepare the data to be sent to GitHub
      const data = {
        message: commitMessage,
        content: content,
        branch: branch,
      };

      // If the file already exists, include the SHA to update it
      if (fileSha) {
        data.sha = fileSha;
      }

      // Make the API request to create or update the file
      const response = await axios.put(apiUrl, data, {
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
      });

      console.log("File pushed to GitHub:", response.data);
      alert("File successfully pushed/updated on GitHub!");
    } catch (error) {
      let errorMessage = "Failed to push/update the file to GitHub.";
      if (error.response) {
        errorMessage += ` ${error.response.data.message}`;
      }
      console.error("Error pushing/updating file on GitHub", error);
      alert(errorMessage);
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Check if the file exists when the file name changes
  useEffect(() => {
    if (fileName) {
      checkIfFileExists();
    }
  }, [fileName, checkIfFileExists]);

  return (
    <div className="container-fluid">
      <h2>Create or Update .txt File on GitHub</h2>

      <div className="row">
        <div className="col-8">
          <HtmlEditor setInputText={setInputText} inputText={inputText} />
        </div>
        <div className="col">
          {/* Display the content */}
          <FormTextarea
            disabled
            conClassName="w-100 h-100"
            inputClassName="w-100 h-100 disabled form-control"
            value={inputText}
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
              label="File name (e.g., example.txt)"
              tooltipMessage="(e.g., example.txt)"
              errorMessage={errorMessage.fileName}
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
              disabled={loading} // Disable button while loading
            >
              {loading ? "Pushing..." : "Push to GitHub"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushTextFileToGithub;
