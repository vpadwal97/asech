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
  const githubToken = gitCreds.githubToken;
  const repoOwner = gitCreds.repoOwner;
  const repoName = gitCreds.repoName;
  const branch = gitCreds.branch;
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${fileName}`;

  // Fetch file SHA if it exists
  const checkIfFileExists = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
      });
      setFileSha(response.data.sha);
      const decodedContent = atob(response.data.content);
      setInputText(decodedContent);
      setErrorMessage("File exists, it will be updated.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage("File does not exist. It will be created.");
      } else {
        setErrorMessage("Error checking file existence.");
        console.error("Error checking file existence:", error);
      }
    }
  }, [apiUrl, githubToken]);

  const pushTextFileToGithub = async () => {
    if (!fileName || !commitMessage) {
      alert("File name and commit message are required.");
      return;
    }

    setLoading(true);
    try {
      const content = btoa(inputText);
      const data = {
        message: commitMessage,
        content: content,
        branch: branch,
        ...(fileSha && { sha: fileSha }),
      };

      await axios.put(apiUrl, data, {
        headers: {
          Authorization: `token ${githubToken}`,
          "Content-Type": "application/json",
        },
      });

      alert("File successfully pushed/updated on GitHub!");
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "Failed to push/update the file to GitHub.";
      console.error("Error pushing/updating file on GitHub", error);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            <FormGroup
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              label="File name (e.g., example.txt)"
              tooltipMessage="(e.g., example.txt)"
              errorMessage={errorMessage}
            />
            <FormGroup
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Commit message"
            />
            <button
              className="btn btn-dark rounded-0"
              onClick={pushTextFileToGithub}
              disabled={loading}
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
