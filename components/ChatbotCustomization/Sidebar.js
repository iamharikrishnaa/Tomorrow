import React, {useState,useEffect} from 'react';
import router, { useRouter } from 'next/router';

const Sidebar = ({ onItemClick }) => {
  const [activeItem, setActiveItem] = useState('chatbot');
  const [ids,setId] = useState(null);
   const router = useRouter();
  const { id } = router.query;

useEffect(()=>{
 const chatbot_id = localStorage.getItem('chatbot_id')
 setId(chatbot_id);
},[id])
console.log(ids, 'ids')
   const handleItemClick = (itemNumber) => {
    onItemClick(itemNumber);
    setActiveItem(itemNumber);
    console.log(itemNumber, 'djfhx')
    if (itemNumber === 'sources'){  
      router.replace(`/sources/${id}`)
    }
  }

  return (
    <div className="sidebar">
      {/* Project Div */}
      <div className="project">
        {/* Section Div */}
        <div className="section">
          {/* Items */}
          <div className={`item ${activeItem === 'chatbot' ? 'active' : ''}`} onClick={() => handleItemClick('chatbot')}><img src='/images/icons/files.png' style={{paddingRight: "20px"}}></img>Settings</div>
          <div className={`item ${activeItem === 'history' ? 'active' : ''}`} onClick={() => handleItemClick('history')}><img src='/images/icons/text.png' style={{paddingRight: "20px"}}></img>Chat History</div>
          <div className={`item ${activeItem === 'embed' ? 'active' : ''}`} onClick={() => handleItemClick('embed')}><img src='/images/icons/website.png' style={{paddingRight: "20px"}}></img>Embed On Site</div>
          <div className={`item ${activeItem === 'source' ? 'active' : ''}`} onClick={() => handleItemClick('sources')}><img src='/images/icons/database.png' style={{paddingRight: "20px"}}></img>Back to Sources</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;