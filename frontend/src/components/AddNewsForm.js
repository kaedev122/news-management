import React, { useState } from 'react';
import axios from 'axios';

const AddNewsForm = ({ onAddNews }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNews = async () => {
    try {
      const response = await axios.post('/api/news', { title, content });
      onAddNews(response.data);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding news: ", error);
    }
  };

  return (
    <div className="addPopup">
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddNews}>Add</button>
    </div>
  );
};

export default AddNewsForm;
