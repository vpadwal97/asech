
import React, { useState } from "react";
import FlagIcon from "../../assets/noIMG.png"

const ImageIcon = ({ ...props }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    //     props.onChange(event);
    // };
  return (
    <>
    <div className="">
            <label style={{ color: "var(--p-light-secondary-color)", fontSize: "20px" }}>
                {props.title}
            </label>
            <div className="image d-flex justify-content-center pt-4">
                <img className="imgpreview img-fluid"
                    src={selectedFile ? URL.createObjectURL(selectedFile) : props.value} style={{ height: "100px", width: "100px" }}
                    alt="Preview" onError={(e) => { e.target.src = FlagIcon; }} />
            </div>
        </div>
    </>
  )
}

export default ImageIcon