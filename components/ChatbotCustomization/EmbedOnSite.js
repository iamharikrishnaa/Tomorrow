import { useRouter } from "next/router";
import React, { useState } from "react";

const Text = () => {
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState(`
      <link
        rel="stylesheet"
        href="http://192.168.1.44:8081/index.718dbbcd.css"
      />
  
      <script
        type="module"
        src="http://192.168.1.44:8081/index.b5caaee8.js"
        chatbotId="${id}"
        defer
      ></script>
  `);

  // Function to handle textarea change
  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Ensure maximum character limit
    if (inputValue.length <= 50000) {
      setText(inputValue);
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text:", error);
        alert("Failed to copy text. Please try again.");
      });
  };

  return (
    <div className="file-loader">
      <h6>
        <b>Embed On Site </b>
      </h6>
      <div className="code-area">
        <textarea
          placeholder=""
          disabled={true}
          value={text}
          className="textarea"
        ></textarea>
      </div>
      <button onClick={handleCopy}>Copy</button>
      {/* <div className="drag-drop-area">
              <input
                id="fileInput"
                type="text"
                style={{ display: 'none' }}
              />
            </div> */}
    </div>
  );
};

export default Text;
