import React, { useEffect, useState } from "react";
import {postRequest,getRequest } from "../../utils/api";
import ChatbotItem from "./ChatbotItem";
import router, { useRouter } from "next/router";

const Home = ({ token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatbotId, setChatbotId] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const createNewChatbot = async () => {
    setIsLoading(true);
    try {
      const response = await postRequest("/v1/chatbots/", {}, token);
      if (response.status === "success") {
        alert("Chatbot created successfully");
        setChatbotId(response.results.chatbot_id);
      } else {
        // Handle other response statuses
        console.error("Error creating new chatbot. Response:", response);
        alert("Failed to create chatbot. Please try again.");
      }
    } catch (error) {
      // Network error or other unexpected errors
      console.error("Error creating new chatbot:", error);
      alert(
        "An error occurred while creating the chatbot. Please try again later."
      );
    }finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

useEffect(() => {
    // Navigate to the newly created chatbot once chatbotId is updated
    if (chatbotId) {
      router.push(`/sources/${chatbotId}`);
    }
  }, [chatbotId, router]);

  useEffect(() => {
    const fetchChatbots = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (token) {
          const response = await getRequest("/v1/chatbots", token);
          if (response.status === "success") {
            setData(response.results);
            console.log(response.results, "response");
          } else {
            setError("Error fetching chatbots");
          }
        }
      } catch (error) {
        setError("Error fetching chatbots");
      }

      setIsLoading(false);
    };

    fetchChatbots();
  }, [token]);

  return (
    <div className="home-container">
      <h1 className="heading">
        <b>Welcome To Our Chatbot</b>
      </h1>
      <p className="description">
        Welcome to our chatbot, your virtual assistant ready to help, inform,
        and engage with you on various topics!
      </p>
      <button onClick={createNewChatbot} className="create-button">
        Create New Chatbot
      </button>

      <div className="row" style={{ margin: "auto", width: '100%', textAlign: 'center' }}>
        {data && data.length > 0 ? (
          <div className="col-lg-2 col-md-6 col-sm-6"></div>
        ) : null}
        {isLoading ? (
          <p>Loading ...</p>
        ) : error ? (
          <p>{error}</p>
        ) : data && data.length > 0 ? (
          <div className="chatbot-list col-lg-8 col-md-6 col-sm-6">
            {data.map((chatbot) => (
              <ChatbotItem
                key={chatbot.chatbot_id}
                id={chatbot.chatbot_id}
                name={chatbot.bot_name}
                icon={chatbot.bot_picture}
              />
            ))}
          </div>
        ) : (
          <p>No chatbots available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
