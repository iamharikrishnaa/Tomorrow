import { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import { Avatar } from "@mui/material";
import Container from "./Container";
import { useRouter } from "next/router";
import baseUrl from "../../utils/baseUrl";

const FloatingButton = ({ isImagesChanged, setIsImagesChanged }) => {
  const [containerVisible, setContainerVisible] = useState(true);
  const [themeData, setThemeData] = useState(null);
  const { popup_picture } = themeData?.results || {};
  const [localLogo, setLocalLogo] = useState(themeData?.results);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/v1/chatbots/${id}/`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setThemeData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, isImagesChanged]);

  const toggleContainer = () => {
    setContainerVisible((prevVisible) => !prevVisible);
  };

  const handleClose = () => {
    setContainerVisible(false);
  };

  return (
    <div>
      <Container
        isOpen={containerVisible}
        onClose={handleClose}
        themeData={themeData}
      />
      <div className="floating-button">
        <Fab
          style={{ width: "60px", height: "60px", position: "relative" }}
          aria-label="add"
          onClick={toggleContainer}
        >
          <Avatar
            style={{ width: "60px", height: "60px" }}
            alt="FloatingAvatar"
            src={popup_picture}
          />
        </Fab>
      </div>
    </div>
  );
};

export default FloatingButton;
