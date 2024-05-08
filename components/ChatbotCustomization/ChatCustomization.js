import React, { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { useRouter } from "next/router";

const ChatCustomization = ({ setIsImagesChanged, botData }) => {
  const [name, setName] = useState(botData?.results?.bot_name);
  const [isNameEditable, setIsNameEditable] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isMessageEditable, setIsMessageEditable] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");
  const [chatMessageColor, setChatMessageColor] = useState("#000000"); // Initial color state for ColorPicker 1
  const [userMessageColor, setUserMessageColor] = useState("#000000"); // Initial color state for ColorPicker 2
  const [chatbotIcon, setChatbotIcon] = useState("");
  const [chatbotLogo, setChatbotLogo] = useState("");
  const [iconFile, setIconFile] = useState("");
  const [logoFile, setLogoFile] = useState("");
  const [isUploadingIcon, setIsUploadingIcon] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    if (botData && botData.results) {
      const {
        bot_name,
        bot_welcome_message,
        bot_chat_color,
        user_chat_color,
        bot_picture,
        popup_picture,
      } = botData.results;
      setName(bot_name);
      setWelcomeMessage(bot_welcome_message);
      setChatMessageColor(bot_chat_color);
      setUserMessageColor(user_chat_color);
      setChatbotIcon(bot_picture);
      setChatbotLogo(popup_picture);
    }
  }, [botData]);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setToken(authToken);
  });
  const handleIconUpload = (event) => {
    setIsUploadingIcon(true);
    const file = event.target.files[0];
    if (file) {
      setIconFile(file);
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width === img.height) {
            setChatbotIcon(reader.result);
            setIsImagesChanged(true);
            localStorage.setItem("chatbot_icon", reader.result);
          } else {
            alert(
              "Image must be square (height and width should be same, kindly crop to upload)"
            );
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only images are allowed");
    }
    setIsUploadingIcon(false);
  };

  const handleLogoUpload = (event) => {
    setIsUploadingLogo(true);
    const file = event.target.files[0];
    if (file) {
      setLogoFile(file);
    }
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width === img.height) {
            setChatbotLogo(reader.result);
            setIsImagesChanged(true);
            localStorage.setItem("chatbot_logo", reader.result);
          } else {
            alert(
              "Image must be square (height and width should be same, kindly crop to upload)"
            );
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Only images are allowed");
    }
    setIsUploadingLogo(false);
  };

  // Function to handle color change for ColorPicker 1
  const handleColorChange1 = (selectedColor) => {
    setChatMessageColor(selectedColor.hex);
  };

  // Function to handle color change for ColorPicker 2
  const handleColorChange2 = (selectedColor) => {
    setUserMessageColor(selectedColor.hex);
  };

  // Function to handle edit button click
  const handleEditNameClick = () => {
    if (!isNameEditable) {
      // Save the current name when entering edit mode
      setEditedName(name);
    } else {
      // Update name only when saving
      setName(editedName);
    }
    setIsNameEditable(!isNameEditable);
  };

  // Function to handle input change
  const handleNameInputChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEditMessageClick = () => {
    if (isMessageEditable) {
      setWelcomeMessage(editedMessage);
    }
    setIsMessageEditable(!isMessageEditable);
  };

  // Function to handle input change
  const handleMessageInputChange = (event) => {
    setEditedMessage(event.target.value);
  };

  const handlePatchRequest = () => {
    const formData = new FormData();
    formData.append("icon", iconFile);
    formData.append("logo", logoFile);
    const formDataObject = {};
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }
    formData.append("bot_name", editedName);
    formData.append("bot_welcome_message", editedMessage);
    formData.append("bot_chat_color", chatMessageColor);
    formData.append("user_chat_color", userMessageColor);
    formData.append("bot_picture", formDataObject.icon);
    formData.append("popup_picture", formDataObject.logo);

    fetch(`${apiUrl}/v1/chatbots/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData,
    })
      .then((data) => {
        // Update state with response data
        setData(data);
        setName(data.bot_name);
        setWelcomeMessage(data.bot_welcome_message);
        setChatMessageColor(data.bot_chat_color);
        setUserMessageColor(data.user_chat_color);
        setChatbotIcon(data.bot_picture);
        setChatbotLogo(data.popup_picture);
        setIsImagesChanged(true);
      })
      .catch((error) => {
        console.error("Error updating chatbot customization:", error);
      });
  };

  return (
    <>
    <div className="chat-customization">
      {/* Chatbot icon */}
      <div className="chatbot-icon">
        <img
          src={chatbotIcon}
          style={{ borderRadius: "50%" }}
          alt="Chatbot Icon"
        />
      </div>

      <button
        className="upload-icon-button"
        onClick={() => document.getElementById("icon-upload").click()}
      >
        {isUploadingIcon ? "Uploading..." : "Upload Icon"}
      </button>
      <input
        id="icon-upload"
        type="file"
        accept="image/*"
        onChange={handleIconUpload}
        style={{ display: "none" }}
      />

      {/* CustomizeName div */}
      <div className="customize-name">
        {/* Label */}
        <div className="label">
          <b>Name</b>
        </div>

        {/* Name input field and edit button */}
        <div className="name-edit">
          <input
            type="text"
            value={isNameEditable ? editedName : name}
            disabled={!isNameEditable}
            onChange={handleNameInputChange}
          />
          <button className="chatbot-edit-btn" onClick={handleEditNameClick}>
            {isNameEditable ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      <div className="customize-message">
        {/* Label */}
        <div className="label">
          <b>Welcome Message</b>
        </div>

        {/* Name input field and edit button */}
        <div className="message-edit">
          <input
            type="text"
            value={isMessageEditable ? editedMessage : welcomeMessage}
            disabled={!isMessageEditable}
            onChange={handleMessageInputChange}
          />
          <button className="chatbot-edit-btn" onClick={handleEditMessageClick}>
            {isMessageEditable ? "Save" : "Edit"}
          </button>
        </div>
      </div>

      <div className="chatbot-logo">
        <img
          src={chatbotLogo}
          style={{ borderRadius: "50%" }}
          alt="Chatbot Logo"
        />
      </div>

      {/* Upload icon button */}
      <button
        className="upload-logo-button"
        onClick={() => document.getElementById("logo-upload").click()}
      >
        {isUploadingLogo ? "Uploading" : "Upload Logo"}
      </button>
      <input
        id="logo-upload"
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        style={{ display: "none" }}
      />

      <div className="customize-chatbot-message-color">
        <ColorPicker
          initialColor={chatMessageColor}
          labelText="Chatbot Message Color"
          onColorChange={handleColorChange1}
        />
        <ColorPicker
          initialColor={userMessageColor}
          labelText="User Message Color"
          onColorChange={handleColorChange2}
        />
        <button onClick={handlePatchRequest} className="chatbot-edit-btn">
          Save
        </button>
      </div>
    </div>
    </>
  );
};

export default ChatCustomization;
