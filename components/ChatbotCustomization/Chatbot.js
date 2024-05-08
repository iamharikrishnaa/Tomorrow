import React, { useState, useRef, useEffect } from "react";
import ChatCustomization from "./ChatCustomization";
import { useRouter } from "next/router";

const Chatbot = ({ setIsImagesChanged }) => {
  const [botData, setBotData] = useState({});
   const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter();
  console.log(router, "router");
  const { id } = router.query;
  console.log(id, "ff");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const response = await fetch(
          `${apiUrl}/v1/chatbots/${id}/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setBotData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      {botData && (
        <ChatCustomization
          setIsImagesChanged={setIsImagesChanged}
          botData={botData}
        />
      )}
    </>
  );
};

export default Chatbot;
